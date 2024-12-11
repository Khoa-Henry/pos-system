<script setup>
import { auth } from "@/firebase";
import { signOut } from "@firebase/auth";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useDisplay } from "vuetify";
import { useInventoryListStore } from "../../store/inventoryList";

const { width } = useDisplay();
const router = useRouter();
const inventoryStore = useInventoryListStore();

const translateValue = computed(() => (width.value < 700 ? "120px" : "220px"));
const isMobile = computed(() => {
  return width.value < 700;
});

// Slider value representing the starting position
const startingPosition = ref(0);

// Define the items with their properties
const items = [
  { text: "Setting", href: "/notfound", icon: "mdi-cogs" },
  { text: "Logout", href: "/login", icon: "mdi-logout" },
  { text: "Inventory", href: "/inventory", icon: "mdi-pencil" },
  { text: "History", href: "/history", icon: "mdi-history" },
  { text: "Checkout", href: "/checkout", icon: "mdi-table" },
  { text: "Reports", href: "/reports", icon: "mdi-chart-areaspline" },
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
    <input
      type="range"
      min="0"
      max="360"
      v-model="startingPosition"
      style="width: 80%; margin: 20px 0; z-index: 1"
    />

    <ul
      class="nav-list"
      :style="{
        transform: `rotate(${startingPosition}deg)`,
      }"
    >
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
          @click="
            () => {
              router.push(item.href);
              if (item.href === '/login') {
                // Log user out
                signOut(auth);
                inventoryStore.storeClear();
              }
            }
          "
          :style="{
            transform: `rotate(-${startingPosition}deg)`,
          }"
        >
          <span
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
          </span>
        </v-btn>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.center-text {
  position: absolute;
  top: 50%; /* Adjusted for better visibility */
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  font-weight: bold;
  z-index: 1; /* Ensure text is above other elements */
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
  z-index: 0; /* Behind the slider */
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
