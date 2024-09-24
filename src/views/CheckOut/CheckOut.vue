<script setup>
import { useSelectedItemsStore } from "@/store/selectedItems";
import { computed, ref } from "vue";
import { useDisplay } from "vuetify";
import CategorySelection from "../../Components/CategorySelection.vue";
import ItemSelection from "../../Components/ItemSelection.vue";
import { useInventoryListStore } from "../../store/inventoryList";
import MobileCheckoutSection from "./component/MobileCheckoutSection.vue";
import PaymentSelection from "./component/PaymentSelection.vue";

const { width } = useDisplay();
const currentCategory = ref("All");
const paymentDialog = ref(false);
const checkoutDialog = ref(false);

const inventoryStore = useInventoryListStore();
const selectedItemsStore = useSelectedItemsStore();

const onItemRemove = (item) => {
  // remove item to list
  selectedItemsStore.deleteSelectedItem(item);

  // Restore the item's quantity back to the store
  const updatedItem = { ...item.value, quantity: item.value.quantity + 1 };
  inventoryStore.editItem(updatedItem);
};

const onPayment = () => {
  paymentDialog.value = true;
};
const changePageLayout = computed(() => {
  return width.value < 960;
});
</script>

<template>
  <PaymentSelection v-model:dialog="paymentDialog" />

  <v-container class="container px-2" fluid>
    <div class="yHeight">
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

      <v-row no-gutters class="sectionCol">
        <CategorySelection v-model:currentCategory="currentCategory" />
        <ItemSelection v-model:currentCategory="currentCategory" />
        <v-col v-if="!changePageLayout" cols="4" class="fullHeight">
          <div class="yHeight">
            <v-container
              fluid
              class="pb-1 px-2"
              style="flex: 1; overflow: auto"
            >
              <v-sheet
                height="100%"
                elevation="4"
                rounded
                style="overflow: auto"
              >
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

            <v-container fluid class="pb-0 px-2 pt-2" style="flex: 0 0 auto">
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
    </div>
  </v-container>
</template>

<style scoped lang="scss">
.container {
  height: 100vh;
}
.containerRow {
  margin: 0;
  flex: 0 0 auto;
}

.fullHeight {
  height: 100%;
  margin: 0;
}
.icon {
  font-size: 3rem;
}
.yHeight {
  display: flex; /* Use flexbox */
  flex-direction: column;
  height: 100%;
}
.sectionCol {
  height: 100%;
  overflow: auto;
}
</style>
