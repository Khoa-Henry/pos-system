<script setup>
import { computed } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";

// Define props
const props = defineProps({
  loading: { type: Boolean, required: true },
});
const { height } = useDisplay();
const displayHeight = computed(() => height.value - 178);
</script>

<template>
  <v-table v-if="props.loading" :height="displayHeight">
    <thead>
      <tr>
        <th class="text-left">Order ID</th>
        <th class="text-left">Total</th>
        <th class="text-left">Payment Type</th>
        <th class="text-left">Issuer</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="_ in 13">
        <td style="padding: 0">
          <v-skeleton-loader :loading="props.loading" type="list-item">
          </v-skeleton-loader>
        </td>
        <td style="padding: 0">
          <v-skeleton-loader :loading="props.loading" type="list-item">
          </v-skeleton-loader>
        </td>
        <td style="padding: 0">
          <v-skeleton-loader :loading="props.loading" type="list-item">
          </v-skeleton-loader>
        </td>
        <td style="padding: 0">
          <v-skeleton-loader :loading="props.loading" type="list-item">
          </v-skeleton-loader>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<style scope></style>
