<script setup>
import EditOrderDetails from "@/Components/EditOrderDetails.vue";
import PageLayout from "@/Components/PageLayout.vue";
import { useOrdersStore } from "@/store/orders";
import { computed, onMounted, ref } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
import OrderSkeletonLoader from "../../Components/OrderSkeletonLoader.vue";

const ordersStore = useOrdersStore();
const dialog = ref(false);
const selectedOrder = ref({});
const dateInput = ref(new Date());
const { height } = useDisplay();
const displayHeight = computed(() => height.value - 178);

const getNewOrders = () => {
  ordersStore.fetchOrders(dateInput.value);
};

const getTodayOrders = () => {
  ordersStore.fetchOrders(new Date());
  dateInput.value = new Date();
};

// Fetch orders when the component is mounted with the current date
onMounted(() => {
  if (ordersStore.date && ordersStore.orders.length > 0) {
    dateInput.value = ordersStore.date;
  } else {
    ordersStore.fetchOrders(dateInput.value);
  }
});

const handleDelete = (order) => {
  console.log(order, "delete");
  // ordersStore.fetchOrders(dateInput.value);
};

const handleSubmit = (order) => {
  console.log(order, "save");
  // ordersStore.fetchOrders(dateInput.value);
};
</script>

<template>
  <page-layout>
    <EditOrderDetails
      :selectedOrder="selectedOrder"
      v-model:dialog="dialog"
      @handleDelete="handleDelete"
      @handleSubmit="handleSubmit"
    />
    <v-container fluid class="container">
      <v-row no-gutters justify="center" align="center" class="pb-3">
        <v-col cols="12" sm="9" md="3">
          <v-date-input
            label="Date"
            variant="underlined"
            v-model="dateInput"
            @update:modelValue="getNewOrders"
          ></v-date-input>
        </v-col>
        <v-col cols="auto" class="pl-3">
          <v-btn @click="getTodayOrders">today</v-btn>
        </v-col>
      </v-row>

      <v-row no-gutters justify="center">
        <v-col cols="12">
          <OrderSkeletonLoader :loading="ordersStore.loading" />
          <v-table v-if="!ordersStore.loading" :height="displayHeight">
            <thead>
              <tr>
                <th class="text-left bold">Order ID</th>
                <th class="text-right">Total</th>
                <th class="text-left">Payment Type</th>
                <th class="text-left">Issuer</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="order in ordersStore.orders"
                :key="order.orderId"
                @click="
                  selectedOrder = order;
                  dialog = true;
                "
                class="clickable-row"
              >
                <td>{{ order.orderId }}</td>
                <td class="text-right">
                  ${{ Number(order.total).toFixed(2) }}
                </td>
                <td>{{ order.paymentType }}</td>
                <td>{{ order.issuer }}</td>
              </tr>
              <tr v-if="ordersStore.orders.length === 0">
                <td>No orders</td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
    </v-container>
  </page-layout>
</template>

<style scoped>
.container {
  padding-left: 8px;
  padding-right: 8px;
  padding-bottom: 0;
}

.clickable-row {
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.clickable-row:hover {
  background-color: #575757; /* Light gray background on hover */
}
</style>
