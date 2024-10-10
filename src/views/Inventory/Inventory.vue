<script setup>
import CurrencyField from "@/Components/CurrencyField.vue";
import PageLayout from "@/Components/PageLayout.vue";
import { computed, ref } from "vue";
import { useDisplay } from "vuetify";
import CategorySelection from "../../Components/CategorySelection.vue";
import ItemSelection from "../../Components/ItemSelection.vue";
import { useInventoryListStore } from "../../store/inventoryList";

const generateId = Math.floor(Math.random() * 90000) + 10000;

const { width } = useDisplay();
const inventoryStore = useInventoryListStore();

const currentCategory = ref("All");
const displayForm = ref(false);
const displayDelete = ref(false);
const name = ref("");
const qty = ref();
const id = ref("");
const price = ref();
const category = ref("");

const changePageLayout = computed(() => {
  return width.value < 960;
});

const onItemSelection = (item) => {
  displayForm.value = true;
  displayDelete.value = item ? true : false;
  // set to ref for adding or editing
  name.value = item?.itemName || "";
  qty.value = item?.quantity || 0;
  price.value = item?.pricePerUnit.toString() || "";
  id.value = item?.itemId || generateId.toString();

  const findCategory = inventoryStore.value.find((category) =>
    category.items.some(
      (i) => i.itemName === item?.itemName && i.itemId === item?.itemId
    )
  );
  category.value = findCategory?.categoryName || "";
};

const addOrDeleteItem = (isAdd) => {
  const itemObj = {
    itemId: id.value,
    itemName: name.value,
    quantity: qty.value,
    pricePerUnit: price.value,
  };
  if (isAdd) {
    inventoryStore.addItem(itemObj, category.value);
  } else {
    inventoryStore.deleteItem(itemObj, category.value);
  }

  displayForm.value = false;
};

const onSubmit = () => {
  addOrDeleteItem(true);
};

const onDeleteItem = () => {
  // TODO: new a confirm modal or something here
  addOrDeleteItem(false);
};
</script>

<template>
  <PageLayout :displayIcon="changePageLayout">
    <template #iconHeader>
      <v-btn height="48" v-if="changePageLayout">Edit: {{ name }}</v-btn>
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
      @onItemSelection="onItemSelection"
    />
    <v-col md="4" cols="12" v-if="!changePageLayout" class="fullHeight">
      <v-container fluid class="pb-1 px-2 fullHeight">
        <v-sheet height="100%" elevation="4" rounded class="yHeight">
          <!-- hide when item is not selected -->
          <!-- TODO: this is gonna be its own component, the form -->
          <v-form
            @submit.prevent="onSubmit()"
            class="yHeight"
            v-if="displayForm"
          >
            <div style="flex: 1; overflow: auto; padding: 4px 8px 8px 8px">
              <v-row no-gutters>
                <v-col cols="12">
                  <v-btn
                    @click="displayForm = false"
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
                    label="Item name"
                    v-model="name"
                  />
                </v-col>
                <v-col cols="12" md="6" class="pa-2">
                  <v-text-field
                    v-model="id"
                    readonly
                    color="primary"
                    label="Item ID"
                  />
                </v-col>
                <v-col cols="12" md="6" class="pa-2">
                  <v-select
                    v-model="category"
                    label="Category"
                    :items="
                      inventoryStore.value.map(
                        (category) => category.categoryName
                      )
                    "
                  />
                </v-col>
                <v-col cols="12" md="6" class="pa-2">
                  <CurrencyField
                    v-model:modelValue="price"
                    label="Price per unit"
                  />
                </v-col>
                <v-col cols="12" md="6" class="pa-2">
                  <v-text-field
                    v-model="qty"
                    color="primary"
                    label="Quantity"
                    type="number"
                  />
                </v-col>
              </v-row>
            </div>

            <v-row
              no-gutters
              justify="center"
              style="flex: 0 0 auto; padding: 0px 4px 16px 4px"
            >
              <v-col cols="6" class="pa-1">
                <v-btn
                  color="error"
                  block
                  @click="onDeleteItem"
                  v-if="displayDelete"
                  >Delete</v-btn
                >
              </v-col>
              <v-col cols="6" class="pa-1">
                <v-btn color="primary" block type="submit">Save</v-btn>
              </v-col>
            </v-row>
          </v-form>
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
  display: flex; /* Use flexbox */
  flex-direction: column;
  height: 100%;
}
</style>
