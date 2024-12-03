<script setup>
import { watch } from "vue";
import { RouterView } from "vue-router";
import { useInventoryListStore } from "./store/inventoryList";
import { useUserStore } from "./store/user";

const inventoryStore = useInventoryListStore();
const userStore = useUserStore();

watch(() => {
  if (userStore.isAuth) {
    inventoryStore.fetchInventory();
  }
});
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
