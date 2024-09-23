<script setup>
import { useSelectedItemsStore } from "@/store/selectedItems";
import { v4 as uuidv4 } from "uuid";
import { ref } from "vue";

const props = defineProps(["dialog"]);
const emit = defineEmits(["update:dialog"]);
const selectedItemsStore = useSelectedItemsStore();
const itemName = ref("");
const price = ref();
const qty = ref(0);

const rules = [(v) => !!v || "Required"];

const closeDialog = () => {
  emit("update:dialog", false);
};

const formatCurrency = () => {
  if (price.value) {
    const value = parseFloat(price.value);
    price.value = (Math.round(value * 100) / 100).toFixed(2);
  }
};
const test = () => {
  if (price.value && qty.value && itemName.value) {
    // convert into numbers
    const itemObj = {
      itemId: uuidv4(),
      itemName: itemName.value,
      pricePerUnit: Number(price.value),
    };
    selectedItemsStore.addCustomItem(itemObj, Number(qty.value));

    closeDialog();
    itemName.value = "";
    price.value = null;
    qty.value = 0;
  }
};
</script>

<template>
  <v-dialog v-model="props.dialog" persistent max-width="700">
    <v-card width="100%">
      <v-toolbar>
        <v-btn icon="mdi-close" @click="closeDialog"> </v-btn>
        <v-toolbar-title>Custom Item</v-toolbar-title>
      </v-toolbar>

      <v-container fluid>
        <v-form @submit.prevent>
          <v-row>
            <v-col cols="12" sm="6"
              ><v-text-field
                v-model="itemName"
                color="primary"
                label="Item name"
                :rules="rules"
              ></v-text-field
            ></v-col>
            <v-col cols="12" sm="6"
              ><v-text-field
                label="Price per unit"
                prefix="$"
                placeholder="0.00"
                v-model="price"
                type="number"
                :rules="rules"
                @blur="formatCurrency"
              ></v-text-field
            ></v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="qty"
                color="primary"
                label="Quantity"
                type="number"
                :rules="rules"
              ></v-text-field>
            </v-col>
            <v-col cols="12" style="padding: 0"></v-col>
            <v-col cols="12" md="6" style="padding: 0"></v-col>
            <v-col cols="12" md="6">
              <v-btn color="primary" type="submit" block @click="test"
                >Submit</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-card>
  </v-dialog>
</template>
