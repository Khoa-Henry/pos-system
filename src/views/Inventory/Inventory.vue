<script setup>
import EditCategoryForm from "@/Components/EditCategoryForm.vue";
import PageLayout from "@/Components/PageLayout.vue";
import { useUserStore } from "@/store/user";
import { computed, ref } from "vue";
import { useDisplay } from "vuetify";
import CategorySelection from "../../Components/CategorySelection.vue";
import EditItemForm from "../../Components/EditItemForm.vue";
import ItemSelection from "../../Components/ItemSelection.vue";
import { useInventoryListStore } from "../../store/inventoryList";

const { width } = useDisplay();
const inventoryStore = useInventoryListStore();
const userStore = useUserStore();

const currentCategory = ref("All");
const selectedItem = ref({});
const displayItemForm = ref(false);
const displayCategoryForm = ref(false);
const dialog = ref(false);
const validationMessage = ref("");

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
      id: item?.itemId || "",
      price: item?.pricePerUnit?.toString() || "",
      category: foundCategory?.categoryName || "",
    };

    dialog.value = selectedItem.value?.name ? false : true;
  } else {
    displayItemForm.value = false;
    displayCategoryForm.value = true;

    selectedItem.value = {
      name: item?.categoryName || "",
      id: item?.categoryId || "",
      items: item?.items || [],
    };

    dialog.value = selectedItem.value?.name ? false : true;
  }
};

const onCategorySubmit = (newCategory) => {
  const isExistingCategory = inventoryStore.value.some(
    (category) => category.categoryName === newCategory.categoryName
  );

  if (!newCategory.categoryId && isExistingCategory) {
    validationMessage.value = "Existing Category Name";
    return;
  }

  inventoryStore.storeAddCategory(newCategory);
  currentCategory.value = newCategory.categoryName;
  validationMessage.value = "";
  dialog.value = false;
  selectedItem.value = {
    name: newCategory?.categoryName || "",
    id: newCategory?.categoryId || "",
    items: newCategory?.items || [],
  };
};

const onCategoryDelete = (newCategory) => {
  inventoryStore.storeDeleteCategory(newCategory);
  dialog.value = false;
  selectedItem.value = {};
};

const onItemDelete = (itemId, categoryName) => {
  inventoryStore.storeDeleteItem(itemId, categoryName);
  dialog.value = false;
  selectedItem.value = {};
};

const onItemSubmit = (newItem, categoryName) => {
  inventoryStore.storeAddItem(newItem, categoryName);
  dialog.value = false;
  selectedItem.value = {
    name: newItem?.itemName || "",
    qty: (newItem?.quantity === 0 ? "0" : newItem?.quantity) || "",
    id: newItem?.itemId || "",
    price: newItem?.pricePerUnit?.toString() || "",
    category: categoryName || "",
  };
};
</script>

<template>
  <PageLayout :displayIcon="changePageLayout">
    <template #iconHeader>
      <v-btn
        height="48"
        v-if="changePageLayout"
        :disabled="!editLabel"
        @click="
          () => {
            dialog = true;

            // display the type of form
            if (selectedItem?.price) {
              displayItemForm = true;
              displayCategoryForm = false;
            } else {
              displayItemForm = false;
              displayCategoryForm = true;
            }
          }
        "
      >
        Edit: {{ editLabel }}
      </v-btn>
    </template>

    <div v-if="changePageLayout">
      <v-dialog
        v-model="dialog"
        transition="dialog-bottom-transition"
        fullscreen
      >
        <v-card>
          <v-toolbar>
            <v-btn icon="mdi-close" @click="dialog = false"></v-btn>
          </v-toolbar>

          <br />
          <EditItemForm
            v-model:displayForm="displayItemForm"
            :categoryList="categoryList"
            :selectedItem="selectedItem"
            @handleSubmit="onItemSubmit"
            @handleDelete="onItemDelete"
            :displayX="false"
            :userRole="userStore.role"
          />
          <EditCategoryForm
            v-model:displayForm="displayCategoryForm"
            :selectedCategory="selectedItem"
            @handleSubmit="onCategorySubmit"
            @handleDelete="onCategoryDelete"
            v-model:currentCategory="currentCategory"
            :displayX="false"
            :validationMessage="validationMessage"
            :userRole="userStore.role"
          />
        </v-card>
      </v-dialog>
    </div>

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
            @handleSubmit="onItemSubmit"
            @handleDelete="onItemDelete"
            :userRole="userStore.role"
          />
          <EditCategoryForm
            v-model:displayForm="displayCategoryForm"
            :selectedCategory="selectedItem"
            @handleSubmit="onCategorySubmit"
            @handleDelete="onCategoryDelete"
            v-model:currentCategory="currentCategory"
            :validationMessage="validationMessage"
            :userRole="userStore.role"
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
