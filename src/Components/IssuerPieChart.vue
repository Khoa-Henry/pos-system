<template>
  <div>
    <Pie :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import { ref, watch } from "vue";
import { Pie } from "vue-chartjs";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

const props = defineProps({
  issuerTotals: {
    type: Object,
    required: true,
  },
});

const chartData = ref({
  labels: [],
  datasets: [
    {
      label: "Issuer Totals",
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
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
  () => props.issuerTotals,
  (newTotals) => {
    chartData.value = {
      labels: Object.keys(newTotals),
      datasets: [
        {
          label: "Issuer Totals",
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
          ],
          data: Object.values(newTotals),
        },
      ],
    };
  },
  { immediate: true }
);
</script>

<style scoped></style>
