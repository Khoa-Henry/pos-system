<script setup>
import { useInventoryListStore } from "../../store/inventoryList";
import { ref, computed } from "vue";
import { useSelectedItemsStore } from "@/store/selectedItems";

const currentCategory = ref("All");

const inventoryStore = useInventoryListStore();
const selectedItemsStore = useSelectedItemsStore();

const onCategorySelection = (categoryName) => {
  currentCategory.value = categoryName;
};

const displayItems = computed(() => {
  if (currentCategory.value === "All") {
    return inventoryStore.value.flatMap((category) => category.items);
  } else {
    const selectedCategory = inventoryStore.value.find(
      (category) => category.categoryName === currentCategory.value
    );
    return selectedCategory ? selectedCategory.items : [];
  }
});
</script>

<template>
  <v-container class="container" fluid>
    <v-row no-gutters class="containerRow">
      <v-col>
        <v-btn @click="$router.push('/')" icon variant="text" color="primary">
          <v-icon icon="mdi-chevron-left" class="icon"> </v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-row no-gutters class="fullHeight">
      <v-col
        cols="5"
        md="3"
        lg="2"
        class="categoryCol"
        style="padding: 6px 6px 0px 6px"
      >
        <div class="outlineContainer">
          <v-container fluid class="pb-0">
            <v-row no-gutters>
              <v-col cols="12" class="pb-4">
                <v-btn
                  :variant="currentCategory === 'All' ? 'elevated' : 'outlined'"
                  block
                  class="text-none"
                  :color="currentCategory === 'All' ? 'primary' : ''"
                  @click="onCategorySelection('All')"
                >
                  <div>See all</div>
                </v-btn>
              </v-col>
              <v-col
                cols="12"
                v-for="category in inventoryStore.value"
                class="pb-4"
              >
                <v-btn
                  :variant="
                    currentCategory === category.categoryName
                      ? 'elevated'
                      : 'outlined'
                  "
                  :color="
                    currentCategory === category.categoryName ? 'primary' : ''
                  "
                  block
                  class="text-none"
                  @click="onCategorySelection(category.categoryName)"
                >
                  {{ category.categoryName }}
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-col>
      <v-col
        cols="7"
        md="5"
        lg="6"
        class="itemCol"
        style="padding: 6px 6px 0px 6px"
      >
        <div class="outlineContainer">
          <v-container fluid class="px-2 pb-2">
            <v-row no-gutters>
              <v-col cols="12" class="px-2 pb-2">
                <v-text-field
                  label="Search"
                  prepend-inner-icon="mdi-magnify"
                  variant="outlined"
                  hide-details
                  single-line
                  clearable
                  dense
                >
                </v-text-field>
              </v-col>

              <v-col cols="12" md="6" lg="4" class="pa-2">
                <v-btn variant="outlined" block height="67" class="text-none">
                  Custom Item
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
                  variant="outlined"
                  block
                  class="text-none"
                  height="auto"
                  :disabled="item.quantity <= 0"
                  @click="selectedItemsStore.addSelectItem(item)"
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
        </div>
      </v-col>
      <v-col
        cols="12"
        md="4"
        lg="4"
        class="checkoutCol"
        style="padding: 6px 6px 0px 6px"
      >
        <div class="outlineContainer">
          <v-container style="height: 82.9%; overflow: auto">
            <v-row v-for="item in selectedItemsStore.items">
              <v-col cols="12">
                <v-container fluid class="pa-0">
                  <v-row no-gutters>
                    <v-col cols="auto">{{ item.value.itemName }} </v-col>
                    <v-col cols="true" align-self="center" class="px-1">
                      <v-divider class="border-opacity-100"></v-divider>
                    </v-col>
                    <v-col cols="auto">
                      {{ item.value.pricePerUnit }} ({{ item.count }})
                    </v-col>
                    <v-col cols="auto" align-self="center">
                      <v-btn
                        icon="mdi-delete"
                        variant="text"
                        height="24"
                      ></v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
            </v-row>
          </v-container>

          <v-container>
            <v-row>
              <v-col cols="12"
                >Total: ${{ selectedItemsStore.totalPrice.toFixed(2) }}</v-col
              >
              <v-col cols="12">
                <v-divider class="border-opacity-100"></v-divider>
              </v-col>
              <v-col cols="12">
                <v-btn
                  block
                  color="primary"
                  @click="selectedItemsStore.clearSelectedItems()"
                  >Continue to payment</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.container {
  height: 100vh;
}
.containerRow {
  margin: 0;
  height: 5.4%;
}

.fullHeight {
  height: 94.6%;
  margin: 0;
  /* overflow: auto; */
}
.icon {
  font-size: 3rem;
  width: 20px;
}

.categoryCol {
  /* when screen is 900 less, set height to 40% */
  height: 100%;
}
.itemCol {
  /* same as categoryCol */
  height: 100%;
}
.checkoutCol {
  /* set to be 60%? */
  height: 100%;
}
.outlineContainer {
  border-radius: 8px;
  border: 2px solid lightgray;
  height: 100%;
  overflow: auto;
}
</style>
