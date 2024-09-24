<script setup>
import { computed, defineEmits, defineProps, ref } from "vue";
import { useInventoryListStore } from "../store/inventoryList";
import { useSelectedItemsStore } from "../store/selectedItems";
import ItemModal from "./ItemModal.vue";

const inventoryStore = useInventoryListStore();
const selectedItemsStore = useSelectedItemsStore();

// Define the prop
const { currentCategory, isEditing = false } = defineProps([
  "currentCategory",
  "isEditing",
]);
// Define emits to notify parent of updates
const emit = defineEmits(["update:currentCategory"]);
const searchText = ref("");
const customItemDialog = ref(false);

const displayItems = computed(() => {
  const searchQuery = searchText.value?.trim().toLowerCase();

  if (searchQuery) {
    emit("update:currentCategory", "All");
    // do the search
    return inventoryStore.value.flatMap((category) =>
      category.items.filter((item) =>
        item.itemName.toLowerCase().includes(searchQuery)
      )
    );
  } else {
    if (currentCategory === "All") {
      return inventoryStore.value.flatMap((category) => category.items);
    } else {
      const selectedCategory = inventoryStore.value.find(
        (category) => category.categoryName === currentCategory
      );
      return selectedCategory ? selectedCategory.items : [];
    }
  }
});

// when isEditable, different function fires
const onItemSelection = (item) => {
  // add item to list
  selectedItemsStore.addSelectItem(item);

  // Decrease the item's quantity
  const updatedItem = { ...item, quantity: item.quantity - 1 };
  inventoryStore.editItem(updatedItem);
};

const onEditItem = (item) => {
  // display item on the side
};
</script>

<template>
  <ItemModal v-model:dialog="customItemDialog" />

  <v-col cols="7" md="5" lg="6" style="padding: 0px; height: 100%">
    <v-container fluid class="px-0 pb-0 fullHeight">
      <v-row no-gutters class="yHeight">
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
          >
          </v-text-field>
        </v-col>

        <v-col cols="12" class="sectionCol">
          <v-container fluid class="noPadding">
            <v-row no-gutters>
              <v-col cols="12" md="6" lg="4" class="pa-2">
                <v-btn
                  variant="outlined"
                  block
                  height="67"
                  class="text-none"
                  color="primary"
                  @click="customItemDialog = true"
                  v-if="!isEditing"
                >
                  Custom Item
                </v-btn>
                <v-btn
                  variant="tonal"
                  block
                  height="67"
                  class="text-none"
                  color="primary"
                  v-if="isEditing"
                >
                  +
                </v-btn>
              </v-col>

              <v-col
                cols="12"
                md="6"
                lg="4"
                v-for="item in displayItems"
                class="pa-2"
              >
                <v-btn
                  :variant="isEditing ? 'tonal' : 'outlined'"
                  block
                  class="text-none"
                  height="auto"
                  :disabled="isEditing ? false : item.quantity <= 0"
                  @click="isEditing ? () => {} : onItemSelection(item)"
                >
                  <v-container class="px-0" style="max-width: 352px">
                    <v-row no-gutters>
                      <v-col cols="12">
                        {{ item.itemName }}
                      </v-col>
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
.icon {
  font-size: 3rem;
}

.fullHeight {
  height: 100%;
}

.yHeight {
  display: flex; /* Use flexbox */
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
