<script setup>
import PageLayout from "@/Components/PageLayout.vue";
import { ref } from "vue";

// Sample data for the table
const orders = ref([
  {
    orderId: "MnQ8NfGYhRg9MYEh4soC",
    total: 100.5,
    paymentType: "cash",
    issuer: "Employee",
  },
  {
    orderId: "MnQ8NfGYhRg9MYEh4soC",
    total: 200.75,
    paymentType: "Card",
    issuer: "Admin",
  },
  { orderId: 3, total: 50.0, paymentType: "Card", issuer: "Employee" },
  {
    orderId: 4,
    total: 150.25,
    paymentType: "cash",
    issuer: "Admin",
  },
]);
const loading = ref(true);
const dateInput = ref(new Date());
</script>

<template>
  <page-layout>
    <v-container fluid>
      <v-row no-gutters justify="center">
        <v-col cols="3">
          <v-date-input label="Date input" variant="underlined"></v-date-input>
        </v-col>
      </v-row>

      <v-row no-gutters justify="center">
        <v-col cols="12">
          <v-table v-if="loading">
            <thead>
              <tr>
                <th class="text-left">Order ID</th>
                <th class="text-left">Total</th>
                <th class="text-left">Payment Type</th>
                <th class="text-left">Issuer</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in orders" :key="order.orderId">
                <td>
                  <v-skeleton-loader :loading="loading" type="list-item">
                  </v-skeleton-loader>
                </td>
                <td>
                  <v-skeleton-loader :loading="loading" type="list-item">
                  </v-skeleton-loader>
                </td>
                <td>
                  <v-skeleton-loader :loading="loading" type="list-item">
                  </v-skeleton-loader>
                </td>
                <td>
                  <v-skeleton-loader :loading="loading" type="list-item">
                  </v-skeleton-loader>
                </td>
              </tr>
            </tbody>
          </v-table>
          <v-table v-else>
            <thead>
              <tr>
                <th class="text-left">Order ID</th>
                <th class="text-left">Total</th>
                <th class="text-left">Payment Type</th>
                <th class="text-left">Issuer</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in orders" :key="order.orderId">
                <td>{{ order.orderId }}</td>
                <td>{{ order.total.toFixed(2) }}</td>
                <td>{{ order.paymentType }}</td>
                <td>{{ order.issuer }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
    </v-container>
  </page-layout>
</template>

<style scoped>
/* Add any scoped styles here */
</style>
