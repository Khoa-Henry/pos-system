<script setup>
import CheckoutList from "@/Components/CheckoutList.vue";
import PageLayout from "@/Components/PageLayout.vue";
import { db } from "@/firebase";
import { Order } from "@/Models/Order";
import { useSelectedItemsStore } from "@/store/selectedItems";
import { useUserStore } from "@/store/user";
import { addDoc, collection } from "firebase/firestore";
import { computed, ref } from "vue";
import { useDisplay } from "vuetify";
import CategorySelection from "../../Components/CategorySelection.vue";
import ItemSelection from "../../Components/ItemSelection.vue";
import MobileCheckoutSection from "../../Components/MobileCheckoutSection.vue";
import PaymentSelection from "../../Components/PaymentSelection.vue";
import { useInventoryListStore } from "../../store/inventoryList";

const { width } = useDisplay();
const currentCategory = ref("All");
const paymentDialog = ref(false);
const checkoutDialog = ref(false);

const changePageLayout = computed(() => {
  return width.value < 960;
});

const inventoryStore = useInventoryListStore();
const selectedItemsStore = useSelectedItemsStore();
const userStore = useUserStore();

// Remove item from the selected items
const onItemRemove = (item) => {
  const category = inventoryStore.value.find(
    (cat) => cat.categoryName === item.categoryName
  );
  const inventoryItemIndex = category.findItemIndexById(item.itemId);
  category.items[inventoryItemIndex].quantity++;

  if (item.count === 1) {
    category.items[inventoryItemIndex].isDirty = false;
  }
  selectedItemsStore.storeDeleteSelectedItem(item);
};

// Add item to the selected items
const onItemSelection = (item) => {
  item.quantity--;
  item.isDirty = true;
  selectedItemsStore.storeAddSelectItem(item);
};

// Open payment dialog
const toPayment = () => {
  paymentDialog.value = true;
};

// Open checkout dialog
const openCheckoutDialog = () => {
  if (selectedItemsStore.totalItem !== 0) {
    checkoutDialog.value = true;
  }
};

const syncDirtyItems = () => {
  inventoryStore.syncDirtyItems();
};

// Set up a timer to sync dirty items every 5 minutes (300000 ms)
setInterval(syncDirtyItems, 300000);

const onPaymentSubmit = async (type) => {
  try {
    // create the order object and save it to a data base
    const order = new Order(
      "",
      selectedItemsStore.items.map((item) => item),
      new Date(),
      type,
      userStore.role,
      selectedItemsStore.totalPrice
    );

    const ordersCollectionRef = collection(db, "Orders").withConverter(
      Order.converter
    );

    await addDoc(ordersCollectionRef, order.toFirestore());
    selectedItemsStore.storeClearSelectedItems();
    syncDirtyItems();
  } catch (e) {
    console.error(`Purchase failed:`, e);
  }
  paymentDialog.value = false;
};
</script>

<template>
  <PageLayout :displayIcon="changePageLayout" @onIconClick="syncDirtyItems">
    <template #iconHeader>
      <v-btn
        variant="text"
        icon
        color="primary"
        :disabled="selectedItemsStore.totalItem === 0"
        @click="openCheckoutDialog"
      >
        <v-badge color="error" :content="selectedItemsStore.totalItem">
          <v-icon icon="mdi-cart" size="x-large"></v-icon>
        </v-badge>
      </v-btn>
    </template>

    <PaymentSelection
      @onPaymentSelection="onPaymentSubmit"
      @cancelDialog="paymentDialog = false"
      :totalPrice="selectedItemsStore.totalPrice"
      :dialog="paymentDialog"
    />
    <MobileCheckoutSection
      v-model:dialog="checkoutDialog"
      v-model:paymentDialog="paymentDialog"
      v-if="changePageLayout"
    />
    <v-row no-gutters class="sectionCol">
      <CategorySelection
        v-model:currentCategory="currentCategory"
        :categoryList="inventoryStore.value"
      />
      <ItemSelection
        v-model:currentCategory="currentCategory"
        :inventoryStore="inventoryStore.value"
        @onItemSelection="onItemSelection"
        @addCustomItem="selectedItemsStore.storeAddCustomItem"
      />
      <v-col v-if="!changePageLayout" cols="4" class="fullHeight">
        <div class="yHeight">
          <v-container fluid class="pb-1 px-2" style="flex: 1; overflow: auto">
            <v-sheet height="100%" elevation="4" rounded style="overflow: auto">
              <CheckoutList
                :list="selectedItemsStore.items"
                @onItemRemove="onItemRemove"
              />
            </v-sheet>
          </v-container>

          <v-container fluid class="pb-0 px-2 pt-2" style="flex: 0 0 auto">
            <v-row no-gutters>
              <v-col cols="12 py-2 px-0">
                Total:
                {{
                  Math.abs(selectedItemsStore.totalPrice).toLocaleString(
                    "en-US",
                    {
                      style: "currency",
                      currency: "USD",
                    }
                  )
                }}
              </v-col>
              <v-col cols="12 py-2 px-0">
                <v-divider class="border-opacity-100"></v-divider>
              </v-col>
              <v-col cols="12 py-2 px-0">
                <v-btn
                  block
                  color="primary"
                  @click="toPayment()"
                  :disabled="selectedItemsStore.totalItem === 0"
                >
                  Continue to payment
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-col>
    </v-row>
  </PageLayout>
</template>

<style scoped lang="scss">
.fullHeight {
  height: 100%;
  margin: 0;
}

.icon {
  font-size: 3rem;
}

.yHeight {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.sectionCol {
  height: 100%;
  overflow: auto;
}
</style>
