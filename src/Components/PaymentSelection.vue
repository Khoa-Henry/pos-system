<script setup>
// Define props and emit events
const props = defineProps(["dialog", "totalPrice"]);
const emit = defineEmits(["onPaymentSelection", "cancelDialog"]);

// Handle payment method selection
const onMethodSelection = (type) => {
  // Creation of the order should be here
  emit("onPaymentSelection", type);
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
        <v-btn icon="mdi-close" @click="emit('cancelDialog')"> </v-btn>
        <v-toolbar-title>Payment Portal</v-toolbar-title>
      </v-toolbar>

      <v-container>
        <v-row justify="center">
          <!-- Total price display -->
          <v-col cols="12" class="text-center">
            <h1>
              {{
                Math.abs(props.totalPrice).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })
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
                    @click="onMethodSelection('cash')"
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
                    @click="onMethodSelection('card')"
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
