<script setup></script>

<template>
  <v-container fluid class="container px-2">
    <v-row no-gutters>
      <v-col class="pt-1">
        <v-btn @click="$router.push('/')" color="primary" variant="text" icon>
          <v-icon icon="mdi-chevron-left" class="icon"></v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <!-- map here?  -->
      <v-col> testing </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.container {
  height: 100vh;
}
.icon {
  font-size: 3rem;
}
</style>
