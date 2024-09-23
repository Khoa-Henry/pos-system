<script setup>
import { useSelectedItemsStore } from "@/store/selectedItems";

const props = defineProps(["dialog", "paymentDialog"]);
const emit = defineEmits(["update:dialog", "update:paymentDialog"]);
const selectedItemsStore = useSelectedItemsStore();
const closeDialog = () => {
  emit("update:dialog", false);
};

const onPayment = () => {
  emit("update:paymentDialog", true);
};
</script>

<template>
  <v-dialog
    v-model="props.dialog"
    transition="dialog-bottom-transition"
    fullscreen
    style="height: 100%"
  >
    <v-card style="height: 100%">
      <v-toolbar>
        <v-btn icon="mdi-close" @click="closeDialog"></v-btn>

        <v-toolbar-title
          >Your Cart ({{ selectedItemsStore.totalItem }})</v-toolbar-title
        >
      </v-toolbar>

      <v-container fluid class="pb-0" style="overflow: auto; height: 100%">
        <v-row v-for="item in selectedItemsStore.items">
          <v-col cols="12">
            <v-container fluid class="pa-0">
              <v-row no-gutters>
                <v-col cols="auto"
                  >{{ item.value.itemName }} ({{ item.count }})
                </v-col>
                <v-col cols="true" align-self="center" class="px-1">
                  <v-divider class="border-opacity-100"></v-divider>
                </v-col>
                <v-col cols="auto">
                  {{
                    Math.abs(item.value.pricePerUnit).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })
                  }}
                </v-col>
                <v-col cols="auto" align-self="center">
                  <v-btn
                    icon="mdi-delete"
                    variant="text"
                    height="24"
                    color="error"
                    style="margin-right: -24px"
                    @click="selectedItemsStore.deleteSelectedItem(item)"
                  ></v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-container>

      <v-container fluid>
        <v-row>
          <v-col cols="12 py-2">
            Total:
            {{
              Math.abs(selectedItemsStore.totalPrice).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })
            }}
          </v-col>
          <v-col cols="12 py-2">
            <v-divider class="border-opacity-100"></v-divider>
          </v-col>
          <v-col cols="12 py-2 text-center">
            <v-btn
              color="primary"
              @click="
                () => {
                  onPayment();
                  closeDialog();
                }
              "
              >Continue to payment</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>
