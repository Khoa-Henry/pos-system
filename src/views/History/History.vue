<script setup>
import PageLayout from "@/Components/PageLayout.vue";
import { ref } from "vue";

const open = ref(["Users"]);
const admins = ref([
  ["Management", "mdi-account-multiple-outline"],
  ["Settings", "mdi-cog-outline"],
]);
</script>

<template>
  <page-layout>
    <v-container fluid>
      <v-row no-gutters justify="center">
        <v-col cols="3">
          <v-date-input label="Date input" variant="underlined"></v-date-input>
        </v-col>

        <v-col cols="12">
          <v-list v-model:opened="open">
            <v-list-group value="Admin">
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" title="Admin"></v-list-item>
              </template>

              <v-list-item
                v-for="([title, icon], i) in admins"
                :key="i"
                :title="title"
                :value="title"
                style="padding-left: 0px"
              ></v-list-item>
            </v-list-group>
          </v-list>
        </v-col>
        <v-col cols="12"> item </v-col>
        <v-col cols="12"> item </v-col>
        <v-col cols="12"> item </v-col>
        <v-col cols="12"> item </v-col>
        <v-col cols="12"> item </v-col>
        <v-col cols="12"> item </v-col>
        <v-col cols="12"> item </v-col>
        <v-col cols="12"> item </v-col>
        <v-col cols="12"> item </v-col>
        <v-col cols="12"> item </v-col>
        <v-col cols="12"> item </v-col>
        <v-col cols="12"> item </v-col>
        <v-col cols="12"> item </v-col>
        <v-col cols="12"> item </v-col>
        <v-col cols="12"> item </v-col>
        <v-col cols="12"> item </v-col>
        <v-col cols="12"> item </v-col>
        <v-col cols="12"> item </v-col>
        <v-col cols="12"> item </v-col>
        <v-col cols="12"> item </v-col>

        <v-col cols="12"> item </v-col>
        <v-col cols="12"> item </v-col>
        <v-col cols="12"> item </v-col>
        <v-col cols="12"> item </v-col>
        <v-col cols="12"> item </v-col>
      </v-row>
    </v-container>
  </page-layout>
</template>

<style scoped></style>
