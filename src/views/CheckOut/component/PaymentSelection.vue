<script setup>
const props = defineProps(["dialog"]);
const emit = defineEmits(["update:dialog"]);

const closeDialog = () => {
  emit("update:dialog", false);
};
</script>

<template>
  <v-dialog
    v-model="props.dialog"
    transition="dialog-bottom-transition"
    fullscreen
    style="height: 100%"
  >
    <v-card style="height: 100%">
      <v-toolbar>
        <v-btn icon="mdi-close" @click="closeDialog"> </v-btn>

        <v-toolbar-title>Payment Selection</v-toolbar-title>
      </v-toolbar>
    </v-card>
  </v-dialog>
</template>
