<script setup>
const { displayIcon } = defineProps({
  displayIcon: { type: Boolean, required: true },
});
</script>

<template>
  <v-container class="container px-2" fluid>
    <div class="yHeight">
      <v-row no-gutters class="containerRow">
        <v-col class="pt-1">
          <v-btn @click="$router.push('/')" color="primary" variant="text" icon>
            <v-icon icon="mdi-chevron-left" class="icon"></v-icon>
          </v-btn>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto" class="pt-1 pr-4" v-if="displayIcon">
          <slot name="iconHeader"></slot>
        </v-col>
      </v-row>

      <v-row no-gutters class="sectionCol">
        <!-- Children -->
        <slot></slot>
      </v-row>
    </div>
  </v-container>
</template>

<style scoped>
.container {
  height: 100vh;
}
.yHeight {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.containerRow {
  margin: 0;
  flex: 0 0 auto;
}
.sectionCol {
  height: 100%;
  overflow: auto;
}
.icon {
  font-size: 3rem;
}
</style>
