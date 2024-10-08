<script setup>
import { v4 as uuidv4 } from "uuid";
import { computed, ref } from "vue";
import CurrencyField from "./CurrencyField.vue";

const props = defineProps({
  dialog: { type: Boolean, required: true },
});
const emit = defineEmits(["update:dialog", "addCustomItem"]);
const itemName = ref("");
const price = ref(null);
const qty = ref(0);
const formRef = ref(null); // Reference for v-form validation

// Validation rules
const requiredRule = [(v) => !!v || "Required"];
const positiveNumberRule = [(v) => v >= 0 || "Please enter a positive number."];

// Combined rules
const combinedRules = computed(() => requiredRule.concat(positiveNumberRule));

// Close dialog and reset fields
const closeDialog = () => {
  emit("update:dialog", false);
  itemName.value = "";
  price.value = null;
  qty.value = 0;
};

// Handle form submission
const onSubmit = async () => {
  const isValid = await formRef.value.validate();

  if (isValid.valid) {
    const itemObj = {
      itemId: uuidv4(),
      itemName: itemName.value,
      pricePerUnit: Number(price.value),
    };
    await emit("addCustomItem", itemObj, Number(qty.value));
    closeDialog();
  }
};
</script>

<template>
  <v-dialog v-model="props.dialog" persistent max-width="700">
    <v-card width="100%">
      <v-toolbar>
        <v-btn icon="mdi-close" @click="closeDialog"></v-btn>
        <v-toolbar-title>Custom Item</v-toolbar-title>
      </v-toolbar>

      <v-container fluid>
        <v-form ref="formRef" @submit.prevent="onSubmit">
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                required
                v-model="itemName"
                color="primary"
                label="Item name"
                :rules="requiredRule"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <CurrencyField
                v-model:modelValue="price"
                :rules="combinedRules"
                label="Price per unit"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="qty"
                min="0"
                step="1"
                required
                placeholder="0"
                color="primary"
                label="Quantity"
                type="number"
                :rules="combinedRules"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-btn color="primary" class="mt-5" type="submit" block>
                Submit
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-card>
  </v-dialog>
</template>
