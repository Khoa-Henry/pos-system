<template>
  <div class="chart-container">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { ref, watch } from "vue";
import { Bar } from "vue-chartjs";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const props = defineProps({
  paymentTypeTotals: {
    type: Object,
    required: true,
  },
});

const chartData = ref({
  labels: [""],
  datasets: [
    {
      label: "Payment Type Totals",
      backgroundColor: ["#42A5F5", "#FF5722", "#4CAF50", "#FFC107", "#008000"],
      data: [],
    },
  ],
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: "",
    },
  },
};

watch(
  () => props.paymentTypeTotals,
  (newTotals) => {
    const labels = Object.keys(newTotals);
    const data = Object.values(newTotals);

    // Include total in the chart data
    const total = data.reduce((acc, curr) => acc + curr, 0);
    labels.push("Total");
    data.push(total);

    chartData.value = {
      labels: labels,
      datasets: [
        {
          label: "Payment Type Totals",
          backgroundColor: [
            "#42A5F5",
            "#FF5722",
            "#4CAF50",
            "#FFC107",
            "#008000",
          ],
          data: data,
        },
      ],
    };
  },
  { immediate: true }
);
</script>

<style scoped>
.chart-container {
  height: 250px;
}
</style>
