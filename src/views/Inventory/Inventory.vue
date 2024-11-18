<script setup>
import EditCategoryForm from "@/Components/EditCategoryForm.vue";
import PageLayout from "@/Components/PageLayout.vue";
import { computed, ref } from "vue";
import { useDisplay } from "vuetify";
import CategorySelection from "../../Components/CategorySelection.vue";
import EditItemForm from "../../Components/EditItemForm.vue";
import ItemSelection from "../../Components/ItemSelection.vue";
import { useInventoryListStore } from "../../store/inventoryList";

const generateNewId = () => Math.floor(Math.random() * 90000) + 10000;

const { width } = useDisplay();
const inventoryStore = useInventoryListStore();

const currentCategory = ref("All");
const selectedItem = ref({});
const displayItemForm = ref(false);
const displayCategoryForm = ref(false);

const changePageLayout = computed(() => width.value < 960);
const editLabel = computed(() => selectedItem.value?.name);

const categoryList = computed(() =>
  inventoryStore.value.map((cat) => cat.categoryName)
);

const handleSelection = (item, isItem) => {
  // check for the type that is being pass in either item or category
  if (isItem) {
    const foundCategory = inventoryStore.value.find((cat) =>
      cat.items.some(
        (i) => i.itemName === item?.itemName && i.itemId === item?.itemId
      )
    );

    displayItemForm.value = true;
    displayCategoryForm.value = false;

    selectedItem.value = {
      name: item?.itemName || "",
      qty: (item?.quantity === 0 ? "0" : item?.quantity) || "",
      id: item?.itemId || generateNewId(),
      price: item?.pricePerUnit?.toString() || "",
      category: foundCategory?.categoryName || "",
    };
  } else {
    displayItemForm.value = false;
    displayCategoryForm.value = true;

    selectedItem.value = {
      name: item?.categoryName || "",
      id: item?.categoryId || generateNewId(),
      items: item?.items || [],
    };
  }
};
</script>

<template>
  <PageLayout :displayIcon="changePageLayout">
    <template #iconHeader>
      <v-btn
        height="48"
        v-if="changePageLayout"
        :disabled="!editLabel"
        @click="() => {}"
      >
        Edit: {{ editLabel }}
      </v-btn>
    </template>

    <CategorySelection
      v-model:currentCategory="currentCategory"
      :categoryList="inventoryStore.value"
      :isEditing="true"
      @onCategorySelection="handleSelection"
    />
    <ItemSelection
      v-model:currentCategory="currentCategory"
      :inventoryStore="inventoryStore.value"
      :isEditing="true"
      @onItemSelection="handleSelection"
    />

    <v-col md="4" cols="12" v-if="!changePageLayout" class="fullHeight">
      <v-container fluid class="pb-1 px-2 fullHeight">
        <v-sheet height="100%" elevation="4" rounded class="yHeight">
          <EditItemForm
            v-model:displayForm="displayItemForm"
            :categoryList="categoryList"
            :selectedItem="selectedItem"
            @handleSubmit="inventoryStore.storeAddItem"
            @handleDelete="inventoryStore.storeDeleteItem"
          />
          <EditCategoryForm
            v-model:displayForm="displayCategoryForm"
            :selectedCategory="selectedItem"
            @handleSubmit="inventoryStore.storeAddCategory"
            @handleDelete="inventoryStore.storeDeleteCategory"
            v-model:currentCategory="currentCategory"
          />
        </v-sheet>
      </v-container>
    </v-col>
  </PageLayout>
</template>

<style scoped>
.fullHeight {
  height: 100%;
  margin: 0;
}
.yHeight {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
