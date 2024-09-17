<script>
export default {
  props: {
    dialog: Boolean,
  },
  emits: ["update:dialog"],
  computed: {
    internalDialog() {
      return this.dialog;
    },
  },
  methods: {
    close() {
      this.dialog.emits;
    },
  },
};
</script>

<template>
  <v-dialog
    v-model="internalDialog"
    transition="dialog-bottom-transition"
    fullscreen
    style="height: 100%"
  >
    <v-card style="height: 100%">
      <v-toolbar>
        <v-btn icon="mdi-close" @click="close()"></v-btn>

        <v-toolbar-title>Payment Selection</v-toolbar-title>
      </v-toolbar>
    </v-card>
  </v-dialog>
</template>
