<script setup>
import PageLayout from "@/Components/PageLayout.vue";
import { useOrdersStore } from "@/store/orders";
import { computed, onMounted, ref } from "vue";

const ordersStore = useOrdersStore();

const dateInput = ref(new Date());

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

// Calculate total amount
const totalAmount = computed(() => {
  return ordersStore.orders.reduce((sum, order) => sum + order.total, 0);
});
// Calculate total amount for previous day
const previousTotalAmount = computed(() => {
  return ordersStore.previousOrders.reduce(
    (sum, order) => sum + order.total,
    0
  );
});

// Calculate totals for each payment type, ensuring "Card" and "Cash" are always present
const paymentTypeTotals = computed(() => {
  const totals = {
    card: 0,
    cash: 0,
    refunds: 0,
    discounts: 0,
  };
  ordersStore.orders.forEach((order) => {
    if (totals[order.paymentType]) {
      totals[order.paymentType] += order.total;
    } else {
      totals[order.paymentType] = order.total;
    }
  });
  return totals;
});

// Calculate performance percentage
const performancePercentage = computed(() => {
  if (previousTotalAmount.value === 0) {
    return totalAmount.value > 0 ? 100 : 0;
  }
  const change = totalAmount.value - previousTotalAmount.value;
  const percentage = (change / previousTotalAmount.value) * 100;
  return percentage;
});

// Determine the color for the performance percentage
const performanceColor = computed(() => {
  if (performancePercentage.value > 0) {
    return "text-green";
  } else if (performancePercentage.value < 0) {
    return "text-red";
  } else {
    return "text-black";
  }
});
</script>

<template>
  <PageLayout>
    <v-container fluid>
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
      <v-row no-gutters>
        <v-col cols="12">
          <v-card>
            <v-card-title class="title font-weight-bold"
              >Report Summary</v-card-title
            >
            <v-divider class="my-2"></v-divider>
            <v-card-text>
              <v-row no-gutters>
                <v-col cols="12">
                  <v-row>
                    <v-col cols="6" class="text-left font-weight-bold"
                      >Gross Revenue</v-col
                    >
                    <v-col cols="6" class="text-right font-weight-bold">
                      ${{ totalAmount.toFixed(2) }}
                    </v-col>
                    <v-divider class="my-2"></v-divider>
                  </v-row>
                  <v-row
                    v-for="(total, paymentType) in paymentTypeTotals"
                    :key="paymentType"
                  >
                    <v-col cols="6" class="text-left">{{ paymentType }}</v-col>
                    <v-col cols="6" class="text-right">
                      ${{ total.toFixed(2) }}
                    </v-col>
                    <v-divider class="my-2"></v-divider>
                  </v-row>

                  <v-row>
                    <v-col cols="6" class="text-left font-weight-bold">
                      Performance
                    </v-col>
                    <v-col
                      cols="6"
                      class="text-right font-weight-bold"
                      :class="performanceColor"
                    >
                      {{ performancePercentage.toFixed(2) }}%
                    </v-col>
                    <v-divider class="my-2"></v-divider>
                  </v-row>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </PageLayout>
</template>

<style scoped>
.title {
  padding-top: 16px;
  padding-bottom: 16px;
}
</style>
