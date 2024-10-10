<script setup>
import { ref, watch } from "vue";
import CurrencyField from "./CurrencyField.vue";

const generateNewId = () => Math.floor(Math.random() * 90000) + 10000;

// Define props
const props = defineProps({
  categoryList: {
    type: Array,
    required: true,
  },
  selectedItem: {
    type: Object,
    required: true,
  },
  displayForm: {
    type: Boolean,
    required: true,
  },
});

// Define emits
const emit = defineEmits([
  "handleSubmit",
  "handleDelete",
  "update:displayForm",
]);

const displayDelete = ref(false);
const formFields = ref({
  name: "",
  qty: "",
  id: generateNewId(),
  price: "",
  category: "",
});

watch(() => {
  displayDelete.value = !!props.selectedItem?.name;

  // keep the ref up to date with what the props is
  formFields.value = {
    name: props.selectedItem?.name,
    qty: props.selectedItem?.qty,
    id: props.selectedItem?.id,
    price: props.selectedItem?.price,
    category: props.selectedItem?.category,
  };
});

const addOrDeleteItem = (isAdding) => {
  const itemObj = {
    itemId: formFields.value.id,
    itemName: formFields.value.name,
    quantity: formFields.value.qty,
    pricePerUnit: formFields.value.price,
  };

  if (isAdding) {
    emit("handleSubmit", itemObj, formFields.value.category);
  } else {
    emit("handleDelete", itemObj, formFields.value.category);
  }

  // close form
  emit("update:displayForm", false);
};

const onSubmit = () => {
  addOrDeleteItem(true);
};

const onDelete = () => {
  addOrDeleteItem(false);
};
</script>

<template>
  <v-form @submit.prevent="onSubmit" v-if="displayForm" class="yHeight">
    <div class="form-content">
      <v-row no-gutters>
        <v-col cols="12">
          <v-btn
            @click="emit('update:displayForm', false)"
            color="primary"
            variant="text"
            icon
          >
            <v-icon icon="mdi-close"></v-icon>
          </v-btn>
        </v-col>

        <v-col cols="12" md="6" class="pa-2">
          <v-text-field
            color="primary"
            label="Item name"
            v-model="formFields.name"
          />
        </v-col>
        <v-col cols="12" md="6" class="pa-2">
          <v-text-field
            v-model="formFields.id"
            readonly
            color="primary"
            label="Item ID"
          />
        </v-col>
        <v-col cols="12" md="6" class="pa-2">
          <v-select
            v-model="formFields.category"
            label="Category"
            :items="categoryList"
          />
        </v-col>
        <v-col cols="12" md="6" class="pa-2">
          <CurrencyField
            v-model:modelValue="formFields.price"
            label="Price per unit"
          />
        </v-col>
        <v-col cols="12" md="6" class="pa-2">
          <v-text-field
            v-model="formFields.qty"
            color="primary"
            label="Quantity"
            type="number"
          />
        </v-col>
      </v-row>
    </div>

    <v-row no-gutters justify="center" class="action-buttons">
      <v-col cols="6" class="pa-1">
        <v-btn color="error" v-if="displayDelete" @click="onDelete" block>
          Delete
        </v-btn>
      </v-col>
      <v-col cols="6" class="pa-1">
        <v-btn color="primary" block type="submit">Save</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<style scoped>
.yHeight {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.form-content {
  flex: 1;
  overflow: auto;
  padding: 4px 8px 8px 8px;
}
.action-buttons {
  flex: 0 0 auto;
  padding: 0px 4px 16px 4px;
}
</style>
