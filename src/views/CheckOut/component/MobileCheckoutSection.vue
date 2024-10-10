<script setup>
import CheckoutList from "@/Components/CheckoutList.vue";
import { useSelectedItemsStore } from "@/store/selectedItems";

const props = defineProps({
  dialog: { type: Boolean, required: true },
});
const emit = defineEmits(["update:dialog", "update:paymentDialog"]);
const selectedItemsStore = useSelectedItemsStore();

const onPayment = () => {
  emit("update:paymentDialog", true);
  emit("update:dialog", false);
};
</script>

<template>
  <v-dialog
    v-model="props.dialog"
    transition="dialog-bottom-transition"
    fullscreen
  >
    <v-card class="full-height">
      <v-toolbar>
        <v-btn icon="mdi-close" @click="emit('update:dialog', false)" />

        <v-toolbar-title
          >Your Cart ({{ selectedItemsStore.totalItem }})</v-toolbar-title
        >
      </v-toolbar>

      <v-container fluid class="pb-0 full-height overflow-scroll">
        <CheckoutList
          :list="selectedItemsStore.items"
          @onItemRemove="selectedItemsStore.deleteSelectedItem"
        />
      </v-container>

      <v-container fluid>
        <v-row no-gutters>
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
            <v-btn color="primary" @click="onPayment"
              >Continue to payment</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.full-height {
  height: 100%;
}

.overflow-scroll {
  overflow: auto;
}
</style>
