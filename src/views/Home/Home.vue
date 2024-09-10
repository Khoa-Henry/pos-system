<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <v-container class="container">
    <v-row align-content="center" class="containerRow">
      <v-col cols="12" class="col"><h1>Circle...</h1></v-col>
      <v-col cols="6" md="4" class="col">
        <RouterLink to="/checkout">
          <v-icon size="x-large" class="icon" icon="mdi-table"></v-icon>
          <br />Checkout
        </RouterLink>
      </v-col>
      <v-col cols="6" md="4" class="col"
        ><RouterLink to="history">
          <v-icon
            size="x-large"
            class="icon"
            icon="mdi-chart-areaspline"
          ></v-icon>
          <br />
          History</RouterLink
        >
      </v-col>
      <v-col cols="6" md="4" class="col">
        <RouterLink>
          <v-icon class="icon" icon="mdi-folder"></v-icon>
          <br />PlaceHolder
        </RouterLink>
      </v-col>
      <v-col cols="6" md="4" class="col">
        <RouterLink>
          <v-icon class="icon" icon="mdi-folder"></v-icon>
          <br />PlaceHolder
        </RouterLink>
      </v-col>
      <v-col cols="6" md="4" class="col">
        <RouterLink>
          <v-icon class="icon" icon="mdi-folder"></v-icon>
          <br />PlaceHolder
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
  height: 100vh;
  margin: 0;
}
.col {
  text-align: center;
}
.icon {
  font-size: 4rem;
}
a {
  text-decoration: none;
}
.title {
  padding-bottom: 45px;
}
</style>
