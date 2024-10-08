<script setup>
import { computed, ref } from "vue";
import CustomItemModal from "./CustomItemModal.vue";

// Define props
const props = defineProps({
  currentCategory: { type: String, required: true },
  isEditing: { type: Boolean, default: false },
  inventoryStore: { type: Array, required: true },
});

// Define emits
const emit = defineEmits([
  "update:currentCategory",
  "onItemSelection",
  "addCustomItem",
]);

// State variables
const searchText = ref("");
const customItemDialog = ref(false);

// Constants
const ALL_CATEGORY = "All";

// Computed property for display items
const displayItems = computed(() => {
  const searchQuery = searchText.value.trim().toLowerCase();

  if (searchQuery) {
    emit("update:currentCategory", ALL_CATEGORY); // Emit category reset on search
    return props.inventoryStore.flatMap((category) =>
      category.items.filter((item) =>
        item.itemName.toLowerCase().includes(searchQuery)
      )
    );
  } else {
    if (props.currentCategory === ALL_CATEGORY) {
      return props.inventoryStore.flatMap((category) => category.items);
    } else {
      const selectedCategory = props.inventoryStore.find(
        (category) => category.categoryName === props.currentCategory
      );
      return selectedCategory ? selectedCategory.items : [];
    }
  }
});

// Emit the addition of a custom item
const addCustomItem = (item, count) => {
  emit("addCustomItem", item, count);
};
</script>

<template>
  <CustomItemModal
    v-model:dialog="customItemDialog"
    @addCustomItem="addCustomItem"
  />

  <v-col cols="7" md="5" lg="6" class="fullHeight sectionCol">
    <v-container fluid class="px-0 pb-0 fullHeight">
      <v-row no-gutters class="yHeight">
        <!-- Search Field -->
        <v-col cols="12" class="px-2 pb-2" style="flex: 0 0 auto">
          <v-text-field
            label="Search"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            color="primary"
            hide-details
            single-line
            clearable
            dense
            v-model="searchText"
          />
        </v-col>

        <!-- Items Section -->
        <v-col cols="12" class="sectionCol">
          <v-container fluid class="noPadding">
            <v-row no-gutters>
              <!-- Custom Item Button -->
              <v-col cols="12" md="6" lg="4" class="pa-2">
                <v-btn
                  v-if="!props.isEditing"
                  variant="outlined"
                  block
                  height="67"
                  class="text-none"
                  color="primary"
                  @click="customItemDialog = true"
                >
                  Custom Item
                </v-btn>
                <v-btn
                  v-if="props.isEditing"
                  variant="tonal"
                  block
                  height="67"
                  class="text-none"
                  color="primary"
                  @click="emit('onItemSelection')"
                >
                  +
                </v-btn>
              </v-col>

              <!-- Item List -->
              <v-col
                v-for="item in displayItems"
                :key="item.itemId"
                cols="12"
                md="6"
                lg="4"
                class="pa-2"
              >
                <v-btn
                  :variant="props.isEditing ? 'tonal' : 'outlined'"
                  block
                  class="text-none"
                  height="auto"
                  :disabled="!props.isEditing && item.quantity <= 0"
                  @click="emit('onItemSelection', item)"
                >
                  <v-container class="px-0" style="max-width: 352px">
                    <v-row no-gutters>
                      <v-col cols="12">{{ item.itemName }}</v-col>
                      <v-col cols="12">
                        <v-divider class="border-opacity-100"></v-divider>
                      </v-col>
                      <v-col cols="6" style="text-align: left">
                        QTY: {{ item.quantity }}
                      </v-col>
                      <v-col cols="6" style="text-align: right">
                        ${{ item.pricePerUnit }}
                      </v-col>
                    </v-row>
                  </v-container>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </v-col>
</template>

<style scoped lang="scss">
.fullHeight {
  height: 100%;
}

.yHeight {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.sectionCol {
  flex: 1;
  overflow: auto;
}

.noPadding {
  padding: 0;
}
</style>
