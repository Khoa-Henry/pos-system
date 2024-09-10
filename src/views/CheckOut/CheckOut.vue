<script setup>
import { RouterLink } from "vue-router";
import { useInventoryListStore } from "../../store/inventoryList";

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

    <v-row no-gutters class="containerRow">
      <v-col cols="6" md="3" lg="2">
        {{ data.$state.inventorySystem[0].categoryName }}
        {{ data.inventorySystem[0].categoryName }}
      </v-col>
      <v-col cols="6" md="5" lg="5">items</v-col>
      <v-col cols="12" md="4" lg="5">checkout</v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.container {
  padding-bottom: 0;
  padding-top: 12px;
  height: 100vh;
  overflow: hidden;
}
.containerRow {
  margin: 0;
}
.icon {
  font-size: 3rem;
  width: 20px;
}
</style>
