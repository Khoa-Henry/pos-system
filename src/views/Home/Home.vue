<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div>
    <div>
      <div><RouterLink to="/">Home</RouterLink></div>
      <div><RouterLink to="/checkout">Checkout</RouterLink></div>
      <div><RouterLink to="history">History</RouterLink></div>
    </div>
  </div>
</template>

<style scoped></style>
