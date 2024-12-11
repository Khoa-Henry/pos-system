<template>
  <div class="chart-container">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { ref, watch } from "vue";
import { Line } from "vue-chartjs";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

const props = defineProps({
  todayTotal: {
    type: Number,
    required: true,
  },
  previousDayTotal: {
    type: Number,
    required: true,
  },
});

const chartData = ref({
  labels: ["Previous Day", "Today"],
  datasets: [
    {
      label: "Total Orders",
      backgroundColor: "white",
      borderColor: props.previousDayTotal > props.todayTotal ? "red" : "green",
      data: [props.previousDayTotal, props.todayTotal],
    },
  ],
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: "Total Orders Today vs Previous Day",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

watch(
  () => [props.todayTotal, props.previousDayTotal],
  ([newTodayTotal, newPreviousDayTotal]) => {
    chartData.value = {
      labels: ["Previous Day", "Today"],
      datasets: [
        {
          label: "Total Orders",
          backgroundColor: "white",
          borderColor: newPreviousDayTotal > newTodayTotal ? "red" : "green",
          data: [newPreviousDayTotal, newTodayTotal],
        },
      ],
    };
  }
);
</script>

<style scoped>
.chart-container {
  height: 400px;
}

@media (max-width: 960px) {
  .chart-container {
    height: 250px;
  }
}
</style>
