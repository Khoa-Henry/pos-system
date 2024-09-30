<script setup>
import { ref } from "vue";
import CategorySelection from "../../Components/CategorySelection.vue";
import ItemSelection from "../../Components/ItemSelection.vue";
import { useInventoryListStore } from "../../store/inventoryList";

const inventoryStore = useInventoryListStore();

const currentCategory = ref("All");
const displayFields = ref(false);

const displayEditing = ref(false);
const name = ref("");
const qty = ref("");
const price = ref();
const category = "";

const onItemSelection = (item) => {
  console.log(item);
  displayFields.value = true;
  // set to ref for adding or editing
};

const onAddNewItem = () => {
  displayFields.value = true;
};
</script>

<template>
  <v-container fluid class="container px-2">
    <div class="yHeight">
      <v-row no-gutters class="containerRow">
        <v-col class="pt-1">
          <v-btn @click="$router.push('/')" color="primary" variant="text" icon>
            <v-icon icon="mdi-chevron-left" class="icon"></v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-row no-gutters class="sectionCol">
        <CategorySelection
          v-model:currentCategory="currentCategory"
          :categoryList="inventoryStore.value"
          :isEditing="true"
        />
        <ItemSelection
          v-model:currentCategory="currentCategory"
          :inventoryStore="inventoryStore.value"
          @onItemSelection="onItemSelection"
          :isEditing="true"
          @onAddNewItem="onAddNewItem"
        />
        <v-col cols="4" class="fullHeight">
          <v-container fluid class="pb-1 px-2 fullHeight">
            <v-sheet height="100%" elevation="4" rounded class="yHeight">
              <!-- hide when item is not selected -->
              <v-form @submit.prevent="" class="yHeight" v-if="displayFields">
                <div style="flex: 1; overflow: auto; padding: 16px 8px 8px 8px">
                  <v-row no-gutters>
                    <v-col cols="12">
                      <v-btn
                        @click="displayFields = false"
                        color="primary"
                        variant="text"
                        icon
                      >
                        <v-icon icon="mdi-close"></v-icon>
                      </v-btn>
                    </v-col>
                    <v-col cols="12" md="6" class="pa-2">
                      <v-text-field color="primary" label="Item name" />
                    </v-col>
                    <v-col cols="12" md="6" class="pa-2">
                      <v-text-field
                        model-value="123545"
                        readonly
                        color="primary"
                        label="Item ID"
                        type="number"
                      />
                    </v-col>
                    <v-col cols="12" md="6" class="pa-2">
                      <v-select
                        label="Category"
                        :items="[
                          'California',
                          'Colorado',
                          'Florida',
                          'Georgia',
                          'Texas',
                          'Wyoming',
                        ]"
                      />
                    </v-col>
                    <v-col cols="12" md="6" class="pa-2">
                      <v-text-field
                        label="Price per unit"
                        prefix="$"
                        placeholder="0.00"
                        type="number"
                      />
                    </v-col>
                    <v-col cols="12" md="6" class="pa-2">
                      <v-text-field
                        placeholder="0"
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
                  style="flex: 0 0 auto; padding: 8px 8px 16px 8px"
                >
                  <v-col cols="6">
                    <v-btn color="primary" block>Save</v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-sheet>
          </v-container>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<style scoped>
.container {
  height: 100vh;
}
.containerRow {
  margin: 0;
  flex: 0 0 auto;
}

.fullHeight {
  height: 100%;
  margin: 0;
}
.icon {
  font-size: 3rem;
}
.yHeight {
  display: flex; /* Use flexbox */
  flex-direction: column;
  height: 100%;
}
.sectionCol {
  height: 100%;
  overflow: auto;
}
</style>
