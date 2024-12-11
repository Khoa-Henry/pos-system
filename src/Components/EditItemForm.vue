<script setup>
import { CategoryItem } from "@/Models/Item";
import { ref, watch } from "vue";
import CurrencyField from "./CurrencyField.vue";

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
  displayX: {
    type: Boolean,
    default: true,
  },
  userRole: {
    type: String,
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
  id: null,
  price: "",
  category: "",
});

// Watch for changes in selectedItem and update formFields accordingly
watch(
  () => props.selectedItem,
  (newValue) => {
    displayDelete.value = !!newValue?.name;
    formFields.value = {
      name: newValue?.name,
      qty: newValue?.qty,
      id: newValue?.id,
      price: newValue?.price,
      category: newValue?.category,
    };
  },
  { immediate: true } // Update immediately on component mount
);

console.log(props.userRole);

// Method to handle adding or deleting items
const addOrDeleteItem = (isAdding) => {
  const newItem = new CategoryItem(
    formFields.value.name,
    formFields.value.id,
    formFields.value.qty,
    formFields.value.price
  );

  if (isAdding) {
    emit("handleSubmit", newItem, formFields.value.category);
  } else {
    emit("handleDelete", newItem.itemId, formFields.value.category);
  }

  // Close form
  emit("update:displayForm", false);
};

// Methods for form submission and deletion
const onSubmit = () => {
  addOrDeleteItem(true);
};

const onDelete = () => {
  addOrDeleteItem(false);
};
</script>

<template>
  <v-form @submit.prevent="onSubmit" v-if="props.displayForm" class="yHeight">
    <div class="form-content">
      <v-row no-gutters>
        <v-col cols="12" v-if="props.displayX">
          <v-btn
            @click="emit('update:displayForm', false)"
            color="primary"
            variant="text"
            icon
          >
            <v-icon icon="mdi-close"></v-icon>
          </v-btn>
        </v-col>

        <v-col cols="12" class="pa-2">
          <v-text-field
            color="primary"
            label="Item name"
            v-model="formFields.name"
            required
          />
        </v-col>
        <v-col cols="12" class="pa-2">
          <v-select
            v-model="formFields.category"
            label="Category"
            :items="props.categoryList"
            item-title="state"
            item-value="abbr"
            required
          />
        </v-col>
        <v-col cols="12" md="6" class="pa-2">
          <CurrencyField
            v-model:modelValue="formFields.price"
            label="Price per unit"
            required
          />
        </v-col>
        <v-col cols="12" md="6" class="pa-2">
          <v-text-field
            v-model="formFields.qty"
            color="primary"
            label="Quantity"
            type="number"
            required
          />
        </v-col>
      </v-row>
    </div>

    <v-row no-gutters justify="center" class="action-buttons">
      <v-col cols="6" class="pa-1">
        <v-btn
          color="error"
          v-if="userRole === 'Admin' && displayDelete"
          @click="onDelete"
          block
        >
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
