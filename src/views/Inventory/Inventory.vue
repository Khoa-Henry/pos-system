<script setup>
import EditItemForm from "@/Components/EditItemForm.vue";
import PageLayout from "@/Components/PageLayout.vue";
import { computed, ref } from "vue";
import { useDisplay } from "vuetify";
import CategorySelection from "../../Components/CategorySelection.vue";
import ItemSelection from "../../Components/ItemSelection.vue";
import { useInventoryListStore } from "../../store/inventoryList";

const generateNewId = () => Math.floor(Math.random() * 90000) + 10000;

const { width } = useDisplay();
const inventoryStore = useInventoryListStore();

const currentCategory = ref("All");
const selectedItem = ref({});
const displayItemForm = ref(false);
// const displayCategoryForm

const changePageLayout = computed(() => width.value < 960);
const editLabel = computed(() => selectedItem.value?.name);

const categoryList = inventoryStore.value.map((cat) => cat.categoryName);

const handleItemSelection = (item) => {
  const foundCategory = inventoryStore.value.find((cat) =>
    cat.items.some(
      (i) => i.itemName === item?.itemName && i.itemId === item?.itemId
    )
  );

  displayItemForm.value = true;

  selectedItem.value = {
    name: item?.itemName || "",
    qty: (item?.quantity === 0 ? "0" : item?.quantity) || "",
    id: item?.itemId || generateNewId(),
    price: item?.pricePerUnit?.toString() || "",
    category: foundCategory?.categoryName || "",
  };
};
</script>

<template>
  <PageLayout :displayIcon="changePageLayout">
    <template #iconHeader>
      <v-btn height="48" v-if="changePageLayout" :disabled="!editLabel"
        >Edit: {{ editLabel }}</v-btn
      >
    </template>

    <CategorySelection
      v-model:currentCategory="currentCategory"
      :categoryList="inventoryStore.value"
      :isEditing="true"
    />
    <ItemSelection
      v-model:currentCategory="currentCategory"
      :inventoryStore="inventoryStore.value"
      :isEditing="true"
      @onItemSelection="handleItemSelection"
    />

    <v-col md="4" cols="12" v-if="!changePageLayout" class="fullHeight">
      <v-container fluid class="pb-1 px-2 fullHeight">
        <v-sheet height="100%" elevation="4" rounded class="yHeight">
          <EditItemForm
            :categoryList="categoryList"
            :selectedItem="selectedItem"
            v-model:displayForm="displayItemForm"
            @handleSubmit="inventoryStore.addItem"
            @handleDelete="inventoryStore.deleteItem"
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
