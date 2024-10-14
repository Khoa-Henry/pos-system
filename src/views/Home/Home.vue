<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useDisplay } from "vuetify";
const { width } = useDisplay();
const router = useRouter();
// Determine if the display is mobile-sized
const isMobile = computed(() => width.value < 700);
// Set the circle radius based on the screen size
const radius = computed(() => (isMobile.value ? 120 : 220));
// Define the items to be displayed, with initial positions at (0, 0)
const items = ref([
  { text: "Setting", href: "/", icon: "mdi-cogs", x: 0, y: 0 },
  { text: "Logout", href: "/", icon: "mdi-logout", x: 0, y: 0 },
  { text: "Inventory", href: "/inventory", icon: "mdi-pencil", x: 0, y: 0 },
  { text: "History", href: "/history", icon: "mdi-history", x: 0, y: 0 },
  { text: "Checkout", href: "/checkout", icon: "mdi-table", x: 0, y: 0 },
  { text: "Reports", href: "/", icon: "mdi-chart-areaspline", x: 0, y: 0 },
]);
// Calculate the initial circular positions for each item
items.value.forEach((item, index) => {
  const angle = (360 / items.value.length) * index; // Angle between items
  const radians = (angle * Math.PI) / 180; // Convert angle to radians
  // Compute the (x, y) position based on the circle radius and angle
  item.x = radius.value * Math.cos(radians);
  item.y = radius.value * Math.sin(radians);
});
let draggedItemIndex = null; // Store the index of the dragged item
/**
 * Handle the start of a drag event.
 * @param {Event} event - The drag event object.
 * @param {number} index - The index of the item being dragged.
 */
const onDragStart = (event, index) => {
  draggedItemIndex = index; // Save the index of the dragged item
};
/**
 * Handle the drop event and swap items if dropped on another.
 * @param {Event} event - The drop event object.
 * @param {number} targetIndex - The index of the item being dropped onto.
 */
const onDrop = (event, targetIndex) => {
  // Ensure we're not dropping onto the same item
  if (draggedItemIndex !== null && draggedItemIndex !== targetIndex) {
    // Swap the positions of the dragged item and the target item
    const tempX = items.value[draggedItemIndex].x;
    const tempY = items.value[draggedItemIndex].y;
    items.value[draggedItemIndex].x = items.value[targetIndex].x;
    items.value[draggedItemIndex].y = items.value[targetIndex].y;
    items.value[targetIndex].x = tempX;
    items.value[targetIndex].y = tempY;
  }
  // Reset the dragged item index after the swap
  draggedItemIndex = null;
};
/**
 * Allow the drop action by preventing the default behavior.
 * @param {Event} event - The dragover event object.
 */
const allowDrop = (event) => {
  event.preventDefault(); // Enable dropping by preventing default behavior
};
</script>

<template>
  <div class="container" @drop="onDrop" @dragover="allowDrop">
    <!-- Center Title -->
    <div class="center-text" :style="{ fontSize: isMobile ? '45px' : '60px' }">
      Circle
    </div>

    <!-- Icons in Circular Layout -->
    <ul class="nav-list">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="nav-item"
        :style="{
          transform: `translate(${item.x}px, ${item.y}px)`,
        }"
        draggable="true"
        @dragstart="(event) => onDragStart(event, index)"
        @dragover.prevent
        @drop="(event) => onDrop(event, index)"
      >
        <v-btn
          icon
          stacked
          variant="text"
          color="primary"
          class="nav-link"
          size="large"
          @click="router.push(item.href)"
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
.container {
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.center-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
}
.nav-list {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.nav-item {
  position: absolute;
  transition: transform 0.3s;
}
.nav-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
ul {
  list-style-type: none;
}
</style>
<!-- <script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useDisplay } from "vuetify";

const { width } = useDisplay();
const router = useRouter();
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
          @click="router.push(item.href)"
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
</style> -->
