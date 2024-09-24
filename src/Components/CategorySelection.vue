<script setup>
import { defineEmits, defineProps } from "vue";
import { useInventoryListStore } from "../store/inventoryList";

const inventoryStore = useInventoryListStore();

// Define the prop
const { currentCategory } = defineProps(["currentCategory"]);
// Define emits to notify parent of updates
const emit = defineEmits(["update:currentCategory"]);

// Method to emit updated value
const onCategorySelection = (categoryName) => {
  emit("update:currentCategory", categoryName); // Emit the new value
};
</script>

<template>
  <v-col cols="5" md="3" lg="2" class="sectionCol" style="padding: 0px">
    <v-container fluid class="px-2 pb-0">
      <v-row no-gutters>
        <v-col cols="12">
          <v-btn
            :variant="currentCategory === 'All' ? 'elevated' : ''"
            block
            class="text-none"
            :color="currentCategory === 'All' ? 'primary' : ''"
            @click="onCategorySelection('All')"
            height="50"
          >
            <div>See all</div>
          </v-btn>
        </v-col>
        <v-col
          cols="12"
          v-for="category in inventoryStore.value"
          :key="category.id"
        >
          <v-btn
            :variant="
              currentCategory === category.categoryName ? 'elevated' : ''
            "
            :color="currentCategory === category.categoryName ? 'primary' : ''"
            block
            class="text-none"
            @click="onCategorySelection(category.categoryName)"
            height="50"
          >
            {{ category.categoryName }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-col>
</template>

<style scoped lang="scss">
.sectionCol {
  height: 100%;
  overflow: auto;
}
</style>
