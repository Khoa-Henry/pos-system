<script setup>
import { useDisplay } from "vuetify";

import { computed } from "vue";

const { width } = useDisplay();
const translateValue = computed(() => (width.value < 700 ? "120px" : "220px"));
const isMobile = computed(() => {
  return width.value < 700;
});
// const { themes } = useTheme();
// console.log(themes);

const items = [
  { text: "Setting", href: "/", icon: "mdi-cogs" },
  { text: "Logout", href: "/", icon: "mdi-logout" },
  { text: "Inventory", href: "/inventory", icon: "mdi-pencil" },
  { text: "History", href: "/history", icon: "mdi-history" },
  { text: "Checkout", href: "/checkout", icon: "mdi-table" },
  { text: "Reports", href: "/", icon: "mdi-chart-areaspline" },
];
</script>

<template>
  <div
    style="
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    "
  >
    <div class="center-text" :style="{ fontSize: isMobile ? '45px' : '60px' }">
      Circle
    </div>
    <ul class="nav-list">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="nav-item"
        :style="{
          transform: `rotate(${
            (360 / items.length) * index
          }deg) translate(${translateValue})`,
        }"
      >
        <v-btn
          icon
          stacked
          variant="text"
          color="primary"
          class="nav-link"
          size="large"
          @click="this.$router.push(item.href)"
          :style="{
            transform: `rotate(-${(360 / items.length) * index}deg)`,
          }"
        >
          <v-icon
            :icon="item.icon"
            :style="{ fontSize: isMobile ? '45px' : '60px' }"
            color="primary"
          ></v-icon>
          <p :style="{ fontSize: isMobile ? '10px' : '16px' }">
            {{ item.text }}
          </p>
        </v-btn>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.center-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  font-weight: bold;
}

.nav-list {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.nav-item {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
  width: 100%;
  height: 100%;
}
</style>
