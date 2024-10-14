<script setup>
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useDisplay } from "vuetify";

const { width, height } = useDisplay();
const router = useRouter();

// Determine if the display is mobile-sized
const isMobile = computed(() => width.value < 700);

// Adjust the circle radius based on screen size
const radius = computed(
  () => Math.min(width.value, height.value) / (isMobile.value ? 3 : 5)
);

// Define the items with initial positions at (0, 0)
const items = ref([
  { text: "Setting", href: "/", icon: "mdi-cogs", x: 0, y: 0 },
  { text: "Logout", href: "/", icon: "mdi-logout", x: 0, y: 0 },
  { text: "Inventory", href: "/inventory", icon: "mdi-pencil", x: 0, y: 0 },
  { text: "History", href: "/history", icon: "mdi-history", x: 0, y: 0 },
  { text: "Checkout", href: "/checkout", icon: "mdi-table", x: 0, y: 0 },
  { text: "Reports", href: "/", icon: "mdi-chart-areaspline", x: 0, y: 0 },
]);

/**
 * Calculate and set the initial circular positions for all items.
 */
const calculatePositions = () => {
  items.value.forEach((item, index) => {
    const angle = (360 / items.value.length) * index; // Angle between items
    const radians = (angle * Math.PI) / 180; // Convert to radians

    // Set x and y coordinates based on radius and angle
    item.x = radius.value * Math.cos(radians);
    item.y = radius.value * Math.sin(radians);
  });
};

// Calculate initial positions on mount
calculatePositions();

// Watch for changes in width and height to recalculate positions
watch([width, height], () => {
  // Only recalculate positions if no item is currently being dragged
  if (draggedItemIndex === null) {
    calculatePositions(); // Recalculate positions on resize
  }
});

let draggedItemIndex = null; // Track the index of the dragged item

/**
 * Handle the start of a drag event.
 */
const onDragStart = (event, index) => {
  draggedItemIndex = index; // Save the index of the dragged item
};

/**
 * Handle the drop event to swap item positions.
 */
const onDrop = (event, targetIndex) => {
  if (draggedItemIndex !== null && draggedItemIndex !== targetIndex) {
    // Swap the (x, y) positions of the dragged and target items
    const draggedItem = items.value[draggedItemIndex];
    const targetItem = items.value[targetIndex];

    // Swap their positions
    const tempX = draggedItem.x;
    const tempY = draggedItem.y;
    draggedItem.x = targetItem.x;
    draggedItem.y = targetItem.y;
    targetItem.x = tempX;
    targetItem.y = tempY;

    // Reset dragged item index after swap
    draggedItemIndex = null;
  }
};

/**
 * Allow the drop action by preventing the default behavior.
 */
const allowDrop = (event) => {
  event.preventDefault(); // Enable dropping by preventing default behavior
};
</script>

<template>
  <div class="container" @drop="onDrop" @dragover="allowDrop">
    <!-- Centered Title -->
    <div class="center-text" :style="{ fontSize: isMobile ? '40px' : '60px' }">
      Circle
    </div>

    <!-- Circular Layout for Icons -->
    <ul class="nav-list">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="nav-item"
        :style="{
          transform: `translate(${item.x}px, ${item.y}px)`,
          transition: 'transform 0.3s ease-in-out',
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
          <p :style="{ fontSize: isMobile ? '12px' : '16px' }">
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
