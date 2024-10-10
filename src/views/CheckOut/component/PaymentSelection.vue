<script setup>
import { useSelectedItemsStore } from "@/store/selectedItems";

// Define props and emit events
const props = defineProps(["dialog"]);
const emit = defineEmits(["update:dialog"]);
const selectedItemsStore = useSelectedItemsStore();

// Close the payment dialog
const closeDialog = () => {
  emit("update:dialog", false);
};

// Handle payment method selection
const onMethodSelection = () => {
  closeDialog();
  selectedItemsStore.clearSelectedItems(); // Clear selected items after payment
};
</script>

<template>
  <v-dialog
    v-model="props.dialog"
    transition="dialog-bottom-transition"
    fullscreen
  >
    <v-card style="height: 100%">
      <v-toolbar>
        <v-btn icon="mdi-close" @click="closeDialog"> </v-btn>
        <v-toolbar-title>Payment Portal</v-toolbar-title>
      </v-toolbar>

      <v-container>
        <v-row justify="center">
          <!-- Total price display -->
          <v-col cols="12" class="text-center">
            <h1>
              {{
                Math.abs(selectedItemsStore.totalPrice).toLocaleString(
                  "en-US",
                  {
                    style: "currency",
                    currency: "USD",
                  }
                )
              }}
            </h1>
          </v-col>

          <!-- Payment method options -->
          <v-col cols="12" class="text-center pb-0">
            Choose Option Below to Pay
          </v-col>

          <v-col cols="12" md="8" class="pt-0">
            <v-container>
              <v-row no-gutters>
                <v-divider :thickness="2"></v-divider>

                <!-- Cash payment button -->
                <v-col cols="12" class="py-2">
                  <v-btn
                    variant="text"
                    append-icon="mdi-chevron-right"
                    block
                    class="d-flex justify-space-between"
                    @click="onMethodSelection"
                  >
                    Cash
                  </v-btn>
                </v-col>

                <v-divider :thickness="2"></v-divider>

                <!-- Card payment button -->
                <v-col cols="12" class="py-2">
                  <v-btn
                    variant="text"
                    append-icon="mdi-chevron-right"
                    block
                    class="d-flex justify-space-between"
                    @click="onMethodSelection"
                  >
                    Card
                  </v-btn>
                </v-col>

                <v-divider :thickness="2"></v-divider>

                <!-- Manual card entry button (disabled) -->
                <v-col cols="12" class="py-2">
                  <v-btn
                    variant="text"
                    append-icon="mdi-chevron-right"
                    block
                    class="d-flex justify-space-between"
                    :disabled="true"
                  >
                    Manual Card Entry
                  </v-btn>
                </v-col>

                <v-divider :thickness="2"></v-divider>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>
