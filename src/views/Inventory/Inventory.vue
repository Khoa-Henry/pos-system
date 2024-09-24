<script setup>
import { ref } from "vue";
import CategorySelection from "../../Components/CategorySelection.vue";
import ItemSelection from "../../Components/ItemSelection.vue";

const currentCategory = ref("All");
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
          :isEditing="true"
        />
        <ItemSelection
          v-model:currentCategory="currentCategory"
          :isEditing="true"
        />
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
