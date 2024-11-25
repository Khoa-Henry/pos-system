<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const goHome = () => {
  router.push("/");
};
</script>

<template>
  <v-container
    class="d-flex flex-column justify-center align-center text-center"
    style="height: 100vh"
    fluid
  >
    <v-row justify="center" align="center" no-gutters>
      <v-col>
        <!-- Icon -->
        <v-icon size="96" color="error" class="mb-4"
          >mdi-alert-circle-outline</v-icon
        >
        <!-- 404 Message -->
        <h1 class="display-1 font-weight-bold text-error">404</h1>
        <h1 class="headline font-weight-medium mb-4">Something's wrong here</h1>
        <p class="text-h6 mb-6">
          Uh oh, we can't seem to find the page you're looking for. Trying going
          back to the previous page.
        </p>
        <!-- Go Home Button -->
        <v-btn color="primary" variant="outlined" large @click="goHome">
          Go to Home
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
