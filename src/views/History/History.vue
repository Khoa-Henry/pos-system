<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <v-container class="container" fluid>
    <v-row no-gutters class="containerRow">
      <v-col>
        <RouterLink to="/">
          <v-icon icon="mdi-chevron-left" class="icon"> </v-icon>
        </RouterLink>
      </v-col> </v-row
  ></v-container>
</template>

<style scoped>
.container {
  height: 100%;
}
.containerRow {
  margin: 0;
}
.icon {
  font-size: 3rem;
  width: 20px;
}
</style>
