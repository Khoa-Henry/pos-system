<script setup>
import { RouterLink } from "vue-router";
import { useInventoryListStore } from "../../store/inventoryList";
// import { useSelectedItemsStore } from "@/store/selectedItems";

const store = useInventoryListStore();
const allItems = store.value.flatMap((category) => category.items);
</script>

<template>
  <v-container class="container" fluid>
    <v-row no-gutters class="containerRow">
      <v-col>
        <RouterLink to="/">
          <v-icon icon="mdi-chevron-left" class="icon"> </v-icon>
        </RouterLink>
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
          <v-container fluid>
            <v-row no-gutters>
              <v-col cols="12" class="pb-4">
                <v-btn variant="outlined" block class="text-none">
                  See all
                </v-btn>
              </v-col>
              <v-col cols="12" v-for="category in store.value" class="pb-4">
                <v-btn variant="outlined" block class="text-none">
                  {{ category.categoryName }}
                </v-btn>
              </v-col>
              <v-col class="pb-4">
                <v-btn variant="outlined" block>+</v-btn>
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

              <v-col
                cols="12"
                md="6"
                lg="4"
                v-for="item in allItems"
                class="pa-2"
              >
                <v-btn variant="outlined" block class="text-none" height="auto">
                  <v-container fluid>
                    <v-row no-gutters>
                      <v-col cols="12">
                        {{ item.itemName }}
                      </v-col>
                      <v-col cols="12">
                        <v-divider class="border-opacity-100"></v-divider>
                      </v-col>
                      <v-col cols="6"> QTY: {{ item.quantity }} </v-col>
                      <v-col cols="6"> ${{ item.pricePerUnit }} </v-col>
                    </v-row>
                  </v-container>
                </v-btn>
              </v-col>

              <v-col cols="12" md="6" lg="4" class="pa-2">
                <v-btn variant="outlined" block height="67">+</v-btn>
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
          <v-container style="height: 82.9%">
            <v-row><v-col>name----- price</v-col></v-row>
          </v-container>

          <v-container>
            <v-row>
              <v-col cols="12">Total: 0.00</v-col>
              <v-col cols="12"
                ><v-divider class="border-opacity-100"></v-divider
              ></v-col>
              <v-col cols="12">
                <v-btn block color="#551a8b">Continue to payment</v-btn></v-col
              >
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
