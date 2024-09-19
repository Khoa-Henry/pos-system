<script setup></script>

<template>
  <v-container class="container px-2" fluid>
    <v-row no-gutters class="containerRow">
      <v-col class="pt-1" cols="auto">
        <v-btn @click="$router.push('/')" color="primary" variant="text" icon>
          <v-icon icon="mdi-chevron-left" class="icon"></v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.container {
  height: 100%;
}
.containerRow {
  margin: 0;
  height: 6%;
}
.icon {
  font-size: 3rem;
  width: 20px;
}
</style>
