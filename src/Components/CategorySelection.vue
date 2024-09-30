<script setup>
// Define the prop
const {
  currentCategory,
  isEditing = false,
  categoryList,
} = defineProps({
  currentCategory: { type: String, required: true },
  isEditing: { type: Boolean },
  categoryList: { type: Array, required: true },
});

// Define emits to notify parent of updates
const emit = defineEmits(["update:currentCategory"]);

// Method to emit updated value
const onCategorySelection = (categoryName) => {
  emit("update:currentCategory", categoryName); // Emit the new value

  if (isEditing) {
    // display item on the side or modal when in mobile

    if (currentCategory !== "All") {
      // display editing
    } else {
      // do nothing
    }
  }
};
</script>

<template>
  <v-col cols="5" md="3" lg="2" class="sectionCol" style="padding: 0px">
    <v-container fluid class="px-2 pb-0">
      <v-row no-gutters>
        <v-col cols="12">
          <v-btn
            :variant="currentCategory === 'All' ? 'elevated' : undefined"
            block
            class="text-none"
            :color="currentCategory === 'All' ? 'primary' : undefined"
            @click="onCategorySelection('All')"
            height="50"
          >
            <div>See all</div>
          </v-btn>
        </v-col>
        <v-col cols="12" v-for="category in categoryList" :key="category.id">
          <v-btn
            :variant="
              isEditing
                ? currentCategory === category.categoryName
                  ? 'tonal'
                  : undefined
                : currentCategory === category.categoryName
                ? 'elevated'
                : undefined
            "
            :color="
              isEditing
                ? undefined
                : currentCategory === category.categoryName
                ? 'primary'
                : undefined
            "
            block
            class="text-none"
            @click="onCategorySelection(category.categoryName)"
            height="50"
          >
            {{ category.categoryName }}
          </v-btn>
        </v-col>
        <v-col cols="12">
          <v-btn
            v-if="isEditing"
            block
            class="text-none"
            height="50"
            variant="tonal"
            color="primary"
          >
            <div>+</div>
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
