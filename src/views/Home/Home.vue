<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useDisplay } from "vuetify";

const { width } = useDisplay();
const router = useRouter();

// Determine if the display is mobile-sized
const isMobile = computed(() => width.value < 700);

// Set the circle radius based on the screen size
const radius = computed(() => (isMobile.value ? 120 : 220));

// Check if there are saved positions in localStorage, else set initial positions
const storedItems = JSON.parse(localStorage.getItem("iconPositions")) || [
  { text: "Setting", href: "/", icon: "mdi-cogs", x: 0, y: 0 },
  { text: "Logout", href: "/", icon: "mdi-logout", x: 0, y: 0 },
  { text: "Inventory", href: "/inventory", icon: "mdi-pencil", x: 0, y: 0 },
  { text: "History", href: "/history", icon: "mdi-history", x: 0, y: 0 },
  { text: "Checkout", href: "/checkout", icon: "mdi-table", x: 0, y: 0 },
  { text: "Reports", href: "/", icon: "mdi-chart-areaspline", x: 0, y: 0 },
];

const items = ref(storedItems);

/**
 * Calculate the initial circular positions only if no saved positions exist.
 */
const initializePositions = () => {
  if (!localStorage.getItem("iconPositions")) {
    items.value.forEach((item, index) => {
      // Calculate the angle for the current item based on its index.
      // We divide 360 degrees by the total number of items to ensure equal spacing around the circle.
      // Example: If there are 6 items, the angle between each would be 360 / 6 = 60 degrees.
      const angle = (360 / items.value.length) * index;

      // Convert the angle from degrees to radians.
      // Radians are required for trigonometric functions (cosine and sine) in JavaScript.
      // Formula: radians = degrees × (π / 180).
      // This ensures the angle is in the correct unit for accurate calculations.
      const radians = (angle * Math.PI) / 180;

      // Compute the (x, y) position for each item using the radius and the angle in radians.
      // - `Math.cos(radians)` gives the horizontal displacement (x-coordinate) from the circle's center.
      // - `Math.sin(radians)` gives the vertical displacement (y-coordinate) from the circle's center.
      // Multiplying by the circle's radius scales the position to fit the circle's size.
      item.x = radius.value * Math.cos(radians); // Horizontal position
      item.y = radius.value * Math.sin(radians); // Vertical position
    });

    // Save the calculated positions to localStorage, ensuring the layout persists on page reload.
    localStorage.setItem("iconPositions", JSON.stringify(items.value));
  }
};

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

    // Save the updated positions to localStorage
    localStorage.setItem("iconPositions", JSON.stringify(items.value));
  }

  draggedItemIndex = null; // Reset the dragged item index after the swap
};

/**
 * Allow the drop action by preventing the default behavior.
 * @param {Event} event - The dragover event object.
 */
const allowDrop = (event) => {
  event.preventDefault(); // Enable dropping by preventing default behavior
};

// Initialize positions when the component is mounted
onMounted(() => {
  initializePositions();
});
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
        :style="{ transform: `translate(${item.x}px, ${item.y}px)` }"
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
