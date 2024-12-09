<script setup>
import { ref, watch } from "vue";
import CurrencyField from "./CurrencyField.vue";
import CheckoutList from "./CheckoutList.vue";

// Define props
const props = defineProps({
  selectedOrder: {
    type: Object,
    required: true,
  },
  dialog: { type: Boolean, required: true },
});

// Define emits
const emit = defineEmits(["handleSubmit", "handleDelete", "update:dialog"]);

const formFields = ref({});
const dateObject = ref();

watch(() => {
  formFields.value = props.selectedOrder;

  const total = formFields.value.total?.toFixed(2);
  formFields.value.total = parseFloat(total);

  const milliseconds = formFields.value.date?.seconds * 1000;
  const nanosecondsInMilliseconds = Math.floor(
    formFields.value.date?.nanoseconds / 1_000_000
  );
  dateObject.value = new Date(milliseconds + nanosecondsInMilliseconds);
});

const paymentType = [
  { state: "Cash", abbr: "cash" },
  { state: "Card", abbr: "card" },
];
</script>

<template>
  <v-dialog
    v-model="props.dialog"
    fullscreen
    transition="dialog-bottom-transition"
    persistent
  >
    <v-card width="100%">
      <v-toolbar>
        <v-btn icon="mdi-close" @click="emit('update:dialog', false)"></v-btn>
        <v-toolbar-title>Order: {{ formFields.orderId }}</v-toolbar-title>
      </v-toolbar>

      <v-card-text>
        <v-container fluid class="formContainer">
          <v-form ref="formRef" @submit.prevent="">
            <v-row>
              <v-col cols="12" sm="6">
                <v-date-input
                  label="Date"
                  v-model="dateObject"
                  disabled
                ></v-date-input>
              </v-col>
              <v-col cols="12" sm="6">
                <CurrencyField
                  v-model:modelValue="formFields.total"
                  disabled
                  label="Total"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  label="Payment Type"
                  v-model="formFields.paymentType"
                  :items="paymentType"
                  item-title="state"
                  item-value="abbr"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  label="Issuer"
                  v-model="formFields.issuer"
                  :items="['Employee', 'Admin']"
                ></v-select>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
        <br />
        <h3>Items:</h3>
        <CheckoutList :list="formFields.items" readOnly />
      </v-card-text>

      <v-card-actions>
        <v-btn
          color="error"
          class="mb-3"
          @click="
            emit('handleDelete', formFields);
            emit('update:dialog', false);
          "
        >
          Delete
        </v-btn>
        <v-btn
          color="primary"
          type="submit"
          class="mb-3 mr-3"
          @click="
            emit('handleSubmit', formFields);
            emit('update:dialog', false);
          "
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.formContainer {
  padding: 20px 0 0 0;
}
</style>
