<script setup>
import { RouterLink } from "vue-router";
import { useInventoryListStore } from "../../store/inventoryList";
// import { useSelectedItemsStore } from "@/store/selectedItems";

const data = useInventoryListStore();
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

    <v-row no-gutters class="containerRow fullHeight">
      <v-col
        cols="5"
        md="3"
        lg="2"
        class="categoryCol"
        style="padding: 6px 6px 0px 6px"
      >
        <div class="outlineContainer">
          <div class="spacing" style="padding-top: 10px">
            <v-btn variant="outlined" block>See all</v-btn>
          </div>
          <div v-for="category in data.value" class="spacing">
            <v-btn variant="outlined" block>{{ category.categoryName }}</v-btn>
          </div>
          <div class="spacing" style="padding-bottom: 8px">
            <v-btn variant="outlined" block>+</v-btn>
          </div>
        </div>
      </v-col>
      <v-col
        cols="7"
        md="5"
        lg="6"
        class="itemCol"
        style="padding: 6px 6px 0px 6px"
      >
        <v-row no-gutters class="outlineContainer spacing">
          <v-col cols="12" class="spacing" style="padding-top: 10px">
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

          <v-col cols="12" v-for="category in data.value" class="spacing">
            <div v-for="item in category.items">
              <v-btn variant="outlined" block style="font-size: 12px">
                {{ item.itemName }}
              </v-btn>
            </div>
          </v-col>

          <v-col cols="4" class="spacing" style="padding-bottom: 8px">
            <v-btn variant="outlined" block>+</v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        md="4"
        lg="4"
        class="checkoutCol"
        style="padding: 6px 6px 0px 6px"
      >
        <div class="outlineContainer">checkout</div>
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
}
.icon {
  font-size: 3rem;
  width: 20px;
}

.categoryCol {
  /* when screen is 900 less, set height to 40% */
  height: 100%;
  overflow: auto;
}
.itemCol {
  /* same as categoryCol */
  height: 100%;
  overflow: auto;
}
.checkoutCol {
  /* set to be 60%? */
  height: 100%;
  overflow: auto;
}
.outlineContainer {
  border-radius: 8px;
  border: 2px solid white;
  height: 100%;
}
.spacing {
  padding: 5px 10px;
}
</style>
