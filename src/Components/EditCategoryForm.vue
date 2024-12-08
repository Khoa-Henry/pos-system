<script setup>
import { ref, watch } from "vue";
import { Category } from "../Models/Category";

// Define props
const props = defineProps({
  selectedCategory: {
    type: Object,
    required: true,
  },
  displayForm: {
    type: Boolean,
    required: true,
  },
  currentCategory: { type: String, required: true },
  displayX: {
    type: Boolean,
    default: true,
  },
  validationMessage: { type: String, default: "" },
});

// Define emits
const emit = defineEmits([
  "handleSubmit",
  "handleDelete",
  "update:displayForm",
  "update:currentCategory",
]);

const displayDelete = ref(false);
const formFields = ref({
  name: "",
  items: [],
});

// Watch for changes in selectedCategory and update formFields accordingly
watch(
  () => props.selectedCategory,
  (newValue) => {
    displayDelete.value = !!newValue?.name;
    formFields.value = {
      name: newValue?.name,
      id: newValue?.id,
      items: newValue?.items,
    };
  },
  { immediate: true } // Update immediately on component mount
);

// Method to handle adding or deleting category
const addOrDeleteCategory = (isAdding) => {
  const newCategory = new Category(formFields.value.name, formFields.value.id);

  if (isAdding) {
    emit("handleSubmit", newCategory);
  } else {
    emit("handleDelete", newCategory);
  }

  // Close form
  emit("update:displayForm", false);
};

// Methods for form submission and deletion
const onSubmit = () => {
  addOrDeleteCategory(true);
};

const onDelete = () => {
  addOrDeleteCategory(false);
};
</script>

<template>
  <v-form @submit.prevent="onSubmit" v-if="props.displayForm" class="yHeight">
    <div class="form-content">
      <v-row no-gutters>
        <v-col cols="12" v-if="displayX">
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
            label="Category name"
            v-model="formFields.name"
            required
            :error-messages="validationMessage"
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
