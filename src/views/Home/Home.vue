<script setup>
import { RouterLink } from "vue-router";
// import { useInventoryListStore } from "../../store/inventoryList";

// useInventoryListStore();
</script>

<template>
  <v-container class="container">
    <v-row align-content="center" class="containerRow">
      <v-col cols="12" class="col"><h1>Welcome to Circle</h1></v-col>
      <v-col cols="6" md="4" class="col">
        <RouterLink to="/checkout">
          <v-icon
            size="x-large"
            class="icon"
            color="primary"
            icon="mdi-table"
          ></v-icon>
          <br />Checkout
        </RouterLink>
      </v-col>

      <v-col cols="6" md="4" class="col">
        <RouterLink to="/">
          <v-icon
            class="icon"
            color="primary"
            icon="mdi-chart-areaspline"
          ></v-icon>
          <br />Reports
        </RouterLink>
      </v-col>

      <v-col cols="6" md="4" class="col">
        <RouterLink to="history">
          <v-icon
            size="x-large"
            class="icon"
            color="primary"
            icon="mdi-history"
          >
          </v-icon>
          <br />
          History
        </RouterLink>
      </v-col>

      <v-col cols="6" md="4" class="col">
        <RouterLink to="/">
          <v-icon class="icon" color="primary" icon="mdi-folder"></v-icon>
          <br />PlaceHolder
        </RouterLink>
      </v-col>
      <v-col cols="6" md="4" class="col">
        <RouterLink to="/">
          <v-icon class="icon" color="primary" icon="mdi-cogs"></v-icon>
          <br />Setting
        </RouterLink>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.container {
  padding-top: 0;
  padding-bottom: 0;
}
.containerRow {
  height: 90vh;
  margin: 0;
  overflow: hidden;
}
.col {
  text-align: center;
}
.icon {
  font-size: 4rem;
}
a {
  text-decoration: none;
  /* theme overrides */
  color: var(--primary);
}
/* override nav link */
/* a:hover {
  color: #000;
} */
.title {
  padding-bottom: 45px;
}
</style>
