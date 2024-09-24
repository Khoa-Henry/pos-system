<script setup>
import { useSelectedItemsStore } from "@/store/selectedItems";
import { computed, ref } from "vue";
import { useDisplay } from "vuetify";
import { useInventoryListStore } from "../../store/inventoryList";
import CustomItemModal from "./component/CustomItemModal.vue";
import MobileCheckoutSection from "./component/MobileCheckoutSection.vue";
import PaymentSelection from "./component/PaymentSelection.vue";

const { width } = useDisplay();
const currentCategory = ref("All");
const paymentDialog = ref(false);
const checkoutDialog = ref(false);
const customItemDialog = ref(false);

const searchText = ref("");

const inventoryStore = useInventoryListStore();
const selectedItemsStore = useSelectedItemsStore();

const onCategorySelection = (categoryName) => {
  currentCategory.value = categoryName;
};

const onPayment = () => {
  paymentDialog.value = true;
};
const changePageLayout = computed(() => {
  return width.value < 960;
});

const displayItems = computed(() => {
  const searchQuery = searchText.value?.trim().toLowerCase();

  if (searchQuery) {
    currentCategory.value = "All";
    // do the search
    return inventoryStore.value.flatMap((category) =>
      category.items.filter((item) =>
        item.itemName.toLowerCase().includes(searchQuery)
      )
    );
  } else {
    if (currentCategory.value === "All") {
      return inventoryStore.value.flatMap((category) => category.items);
    } else {
      const selectedCategory = inventoryStore.value.find(
        (category) => category.categoryName === currentCategory.value
      );
      return selectedCategory ? selectedCategory.items : [];
    }
  }
});

const onItemSelection = (item) => {
  // add item to list
  selectedItemsStore.addSelectItem(item);

  // Decrease the item's quantity
  const updatedItem = { ...item, quantity: item.quantity - 1 };
  inventoryStore.editItem(updatedItem);
};

const onItemRemove = (item) => {
  // remove item to list
  selectedItemsStore.deleteSelectedItem(item);

  // Restore the item's quantity back to the store
  const updatedItem = { ...item.value, quantity: item.value.quantity + 1 };
  inventoryStore.editItem(updatedItem);
};
</script>

<template>
  <PaymentSelection v-model:dialog="paymentDialog" />
  <CustomItemModal v-model:dialog="customItemDialog" />

  <v-container class="container px-2" fluid>
    <v-row no-gutters class="containerRow">
      <v-col class="pt-1" cols="auto">
        <v-btn @click="$router.push('/')" color="primary" variant="text" icon>
          <v-icon icon="mdi-chevron-left" class="icon"></v-icon>
        </v-btn>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="auto" class="pt-1" v-if="changePageLayout">
        <v-btn
          variant="text"
          icon
          color="primary"
          :disabled="selectedItemsStore.totalItem === 0"
          @click="
            () => {
              if (selectedItemsStore.totalItem !== 0) {
                checkoutDialog = true;
              }
            }
          "
        >
          <v-badge color="error" :content="selectedItemsStore.totalItem">
            <v-icon icon="mdi-cart" size="x-large"></v-icon>
          </v-badge>
        </v-btn>
        <MobileCheckoutSection
          v-model:dialog="checkoutDialog"
          v-model:paymentDialog="paymentDialog"
        />
      </v-col>
    </v-row>

    <v-row no-gutters class="fullHeight">
      <v-col cols="5" md="3" lg="2" class="sectionCol" style="padding: 0px">
        <!-- <div class="outlineContainer"> -->
        <v-container fluid class="px-2 pb-0">
          <v-row no-gutters>
            <v-col cols="12">
              <v-btn
                :variant="currentCategory === 'All' ? 'elevated' : ''"
                block
                class="text-none"
                :color="currentCategory === 'All' ? 'primary' : ''"
                @click="onCategorySelection('All')"
                height="50"
              >
                <div>See all</div>
              </v-btn>
            </v-col>
            <v-col cols="12" v-for="category in inventoryStore.value">
              <v-btn
                :variant="
                  currentCategory === category.categoryName ? 'elevated' : ''
                "
                :color="
                  currentCategory === category.categoryName ? 'primary' : ''
                "
                block
                class="text-none"
                @click="onCategorySelection(category.categoryName)"
                height="50"
              >
                {{ category.categoryName }}
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
        <!-- </div> -->
      </v-col>
      <v-col cols="7" md="5" lg="6" class="sectionCol" style="padding: 0px">
        <!-- <div class="outlineContainer"> -->
        <v-container fluid class="px-0 pb-0" style="height: 100%">
          <v-row no-gutters>
            <v-col cols="12" class="px-2 pb-2">
              <v-text-field
                label="Search"
                prepend-inner-icon="mdi-magnify"
                variant="outlined"
                color="primary"
                hide-details
                single-line
                clearable
                dense
                v-model="searchText"
              >
              </v-text-field>
            </v-col>

            <v-col cols="12" md="6" lg="4" class="pa-2">
              <v-btn
                variant="outlined"
                block
                height="67"
                class="text-none"
                color="primary"
                @click="customItemDialog = true"
              >
                Custom Item
              </v-btn>
            </v-col>

            <v-col
              cols="12"
              md="6"
              lg="4"
              v-for="item in displayItems"
              class="pa-2"
            >
              <v-btn
                variant="outlined"
                color=""
                block
                class="text-none"
                height="auto"
                :disabled="item.quantity <= 0"
                @click="onItemSelection(item)"
              >
                <v-container class="px-0" style="max-width: 352px">
                  <v-row no-gutters>
                    <v-col cols="12">
                      {{ item.itemName }}
                    </v-col>
                    <v-col cols="12">
                      <v-divider class="border-opacity-100"></v-divider>
                    </v-col>
                    <v-col cols="6" style="text-align: left">
                      QTY: {{ item.quantity }}
                    </v-col>
                    <v-col cols="6" style="text-align: right">
                      ${{ item.pricePerUnit }}
                    </v-col>
                  </v-row>
                </v-container>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
        <!-- </div> -->
      </v-col>
      <v-col v-if="!changePageLayout" cols="4" class="sectionCol">
        <div class="fullHeight">
          <v-container
            fluid
            class="pb-1 px-2 pt-2"
            style="height: 88%; overflow: auto"
          >
            <v-sheet height="100%" elevation="4" rounded>
              <v-row v-for="item in selectedItemsStore.items" no-gutters>
                <v-col cols="12" class="px-2 py-2">
                  <v-container fluid class="pa-0">
                    <v-row no-gutters>
                      <v-col cols="auto"
                        >{{ item.value.itemName }} ({{ item.count }})</v-col
                      >
                      <v-col cols="true" align-self="center" class="px-1">
                        <v-divider class="border-opacity-100"></v-divider>
                      </v-col>
                      <v-col cols="auto">
                        {{
                          Math.abs(item.value.pricePerUnit).toLocaleString(
                            "en-US",
                            {
                              style: "currency",
                              currency: "USD",
                            }
                          )
                        }}
                      </v-col>
                      <v-col cols="auto" align-self="center">
                        <v-btn
                          icon="mdi-delete"
                          variant="text"
                          height="24"
                          style="margin-right: -24px"
                          @click="onItemRemove(item)"
                          color="error"
                        >
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-col>
              </v-row>
            </v-sheet>
          </v-container>

          <v-container fluid class="pb-0 px-2 pt-2">
            <v-row no-gutters>
              <v-col cols="12 py-2 px-0"
                >Total:
                {{
                  Math.abs(selectedItemsStore.totalPrice).toLocaleString(
                    "en-US",
                    {
                      style: "currency",
                      currency: "USD",
                    }
                  )
                }}</v-col
              >
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
  </v-container>
</template>

<style scoped lang="scss">
@import "../../scss/variables.scss";
.container {
  height: 100vh;
}
.containerRow {
  margin: 0;
  height: 6%;
}

.fullHeight {
  height: 94%;
  margin: 0;
}
.icon {
  font-size: 3rem;
}

.sectionCol {
  height: 100%;
  overflow: auto;
}
</style>
