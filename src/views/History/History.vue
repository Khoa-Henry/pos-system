<script setup>
import EditOrderDetails from "@/Components/EditOrderDetails.vue";
import PageLayout from "@/Components/PageLayout.vue";
import { db } from "@/firebase";
import {
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { computed, onMounted, ref, watch } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
import OrderSkeletonLoader from "../../Components/OrderSkeletonLoader.vue";
import { Order } from "../../Models/Order";

// Sample data for the table
const orders = ref([]);
const loading = ref(true);
const dateInput = ref(new Date());
const dialog = ref(false);
const selectedOrder = {};
const { height } = useDisplay();
const displayHeight = computed(() => height.value - 178);

// Function to fetch orders based on the selected date
const fetchOrders = async (date) => {
  loading.value = true;
  try {
    const startOfDay = Timestamp.fromDate(new Date(date.setHours(0, 0, 0, 0)));
    const endOfDay = Timestamp.fromDate(
      new Date(date.setHours(23, 59, 59, 999))
    );

    const ordersCollectionRef = collection(db, "Orders").withConverter(
      Order.converter
    );

    const q = query(
      ordersCollectionRef,
      where("date", ">=", startOfDay),
      where("date", "<=", endOfDay),
      orderBy("date", "desc")
    );

    const querySnapshot = await getDocs(q);
    orders.value = querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error("Error fetching orders:", error);
    orders.value = [];
  } finally {
    loading.value = false;
  }
};

// Watch the dateInput for changes and fetch orders accordingly
watch(dateInput, (newDate) => {
  fetchOrders(newDate);
});

// Fetch orders when the component is mounted with the current date
onMounted(() => {
  fetchOrders(dateInput.value);
});

const handleDelete = (order) => {
  console.log(order, "delete");
  // fetchOrders(dateInput.value);
};

const handleSubmit = (order) => {
  console.log(order, "save");
  // fetchOrders(dateInput.value);
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
          ></v-date-input>
        </v-col>
        <v-col cols="auto" class="pl-3">
          <v-btn @click="dateInput = new Date()">today</v-btn>
        </v-col>
      </v-row>

      <v-row no-gutters justify="center">
        <v-col cols="12">
          <OrderSkeletonLoader :loading="loading" />
          <v-table v-if="!loading" :height="displayHeight">
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
                v-for="order in orders"
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
              <tr></tr>
              <tr v-if="orders.length === 0">
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
