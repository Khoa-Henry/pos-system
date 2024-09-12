<script setup>
import { ref, computed } from "vue";
import { useSelectedItemsStore } from "@/store/selectedItems";

const dialog = ref(false);
const selectedItemsStore = useSelectedItemsStore();
</script>

<template>
  <v-dialog
    v-model="dialog"
    transition="dialog-bottom-transition"
    fullscreen
    style="height: 100%"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        append-icon="mdi-cart"
        variant="elevated"
        color="primary"
        v-bind="activatorProps"
        >Checkout</v-btn
      >
    </template>

    <v-card style="height: 100%">
      <v-toolbar>
        <v-btn icon="mdi-close" @click="dialog = false"></v-btn>

        <v-toolbar-title>Your Cart</v-toolbar-title>
      </v-toolbar>

      <v-container fluid class="pb-0" style="overflow: auto; height: 100%">
        <v-row v-for="item in selectedItemsStore.items">
          <v-col cols="12">
            <v-container fluid class="pa-0">
              <v-row no-gutters>
                <v-col cols="auto">{{ item.value.itemName }} </v-col>
                <v-col cols="true" align-self="center" class="px-1">
                  <v-divider class="border-opacity-100"></v-divider>
                </v-col>
                <v-col cols="auto">
                  {{ item.value.pricePerUnit }} ({{ item.count }})
                </v-col>
                <v-col cols="auto" align-self="center">
                  <v-btn
                    icon="mdi-delete"
                    variant="text"
                    height="24"
                    style="margin-right: -24px"
                  ></v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-container>

      <v-container fluid>
        <v-row>
          <v-col cols="12 py-2"
            >Total: ${{ selectedItemsStore.totalPrice.toFixed(2) }}</v-col
          >
          <v-col cols="12 py-2">
            <v-divider class="border-opacity-100"></v-divider>
          </v-col>
          <v-col cols="12 py-2 text-center">
            <v-btn
              color="primary"
              @click="selectedItemsStore.clearSelectedItems()"
              >Continue to payment</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>
