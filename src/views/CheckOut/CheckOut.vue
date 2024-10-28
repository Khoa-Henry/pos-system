<script setup>
import CheckoutList from "@/components/CheckoutList.vue";
import PageLayout from "@/components/PageLayout.vue";
import { useSelectedItemsStore } from "@/store/selectedItems";
import { computed, ref } from "vue";
import { useDisplay } from "vuetify";
import CategorySelection from "../../components/CategorySelection.vue";
import ItemSelection from "../../components/ItemSelection.vue";
import { useInventoryListStore } from "../../store/inventoryList";
import MobileCheckoutSection from "./component/MobileCheckoutSection.vue";
import PaymentSelection from "./component/PaymentSelection.vue";

const { width } = useDisplay();
const currentCategory = ref("All");
const paymentDialog = ref(false);
const checkoutDialog = ref(false);

const changePageLayout = computed(() => {
  return width.value < 960;
});

const inventoryStore = useInventoryListStore();
const selectedItemsStore = useSelectedItemsStore();

// Update item quantity in the inventory
const updateItemQuantity = (item, adjustment) => {
  const updatedItem = { ...item, quantity: item.quantity + adjustment };
  inventoryStore.updateItem(updatedItem);
};

// Remove item from the selected items
const onItemRemove = (item) => {
  selectedItemsStore.deleteSelectedItem(item);
  updateItemQuantity(item.value, 1); // Restore the item's quantity
};

// Add item to the selected items
const onItemSelection = (item) => {
  selectedItemsStore.addSelectItem(item);
  updateItemQuantity(item, -1); // Decrease the item's quantity
};

// Open payment dialog
const onPayment = () => {
  paymentDialog.value = true;
};

// Open checkout dialog
const openCheckoutDialog = () => {
  if (selectedItemsStore.totalItem !== 0) {
    checkoutDialog.value = true;
  }
};
</script>

<template>
  <PageLayout :displayIcon="changePageLayout">
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

    <PaymentSelection v-model:dialog="paymentDialog" />
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
        @addCustomItem="selectedItemsStore.addCustomItem"
      />
      <!-- addCustomItem is a multiple level emit example-->

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
                  @click="onPayment()"
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
