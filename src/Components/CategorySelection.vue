<script setup>
import { computed } from "vue";

// Define the props
const props = defineProps({
  currentCategory: { type: String, required: true },
  isEditing: { type: Boolean, default: false },
  categoryList: { type: Array, required: true },
});

// Define emits to notify parent of updates
const emit = defineEmits(["update:currentCategory", "onCategorySelection"]);

// Method to emit updated value
const onSelection = (category) => {
  emit("update:currentCategory", category.categoryName); // Emit the new value
  if (category.categoryName !== "All") {
    emit("onCategorySelection", category, false);
  }
};

// Computed properties for button styling logic
const isAllSelected = computed(() => props.currentCategory === "All");
const getVariant = (categoryName) => {
  if (props.isEditing) {
    return props.currentCategory === categoryName ? "elevated" : undefined;
  }
  return props.currentCategory === categoryName ? "elevated" : "text";
};
const getColor = (categoryName) => {
  return props.currentCategory === categoryName ? "primary" : undefined;
};
</script>

<template>
  <v-col cols="5" md="3" lg="2" class="sectionCol">
    <v-container fluid class="px-2 pb-0">
      <v-row no-gutters>
        <v-col cols="12">
          <v-btn
            :variant="getVariant('All')"
            block
            class="text-none"
            :color="isAllSelected ? 'primary' : undefined"
            @click="onSelection({ categoryName: 'All' })"
            height="50"
          >
            <div>See all</div>
          </v-btn>
        </v-col>
        <v-col
          cols="12"
          v-for="category in props.categoryList"
          :key="category.id"
        >
          <v-btn
            :variant="getVariant(category.categoryName)"
            block
            class="text-none"
            :color="getColor(category.categoryName)"
            @click="onSelection(category)"
            height="50"
          >
            {{ category.categoryName }}
          </v-btn>
        </v-col>
        <v-col cols="12">
          <v-btn
            v-if="props.isEditing"
            block
            class="text-none"
            height="50"
            variant="tonal"
            color="primary"
            @click="emit('onCategorySelection', undefined, false)"
          >
            <div>+</div>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-col>
</template>

<style scoped>
.sectionCol {
  height: 100%;
  overflow: auto;
}
</style>
