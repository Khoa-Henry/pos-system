<script setup>
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import { useUserStore } from "./store/user";

const userStore = useUserStore();

onMounted(() => {
  userStore.initializeAuth();
});
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
