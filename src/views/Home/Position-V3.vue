<script setup>
import { computed, onMounted, ref, watch } from "vue";
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
  { label: "Setting", href: "/", icon: "mdi-cogs", x: 0, y: 0 },
  { label: "Logout", href: "/", icon: "mdi-logout", x: 0, y: 0 },
  { label: "Inventory", href: "/inventory", icon: "mdi-pencil", x: 0, y: 0 },
  { label: "History", href: "/history", icon: "mdi-history", x: 0, y: 0 },
  { label: "Checkout", href: "/checkout", icon: "mdi-table", x: 0, y: 0 },
  { label: "Reports", href: "/", icon: "mdi-chart-areaspline", x: 0, y: 0 },
]);
const draggedItemIndex = ref(null); // Track the index of the dragged item

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
onMounted(() => {
  calculatePositions();
});

// Watch for changes in width and height to recalculate positions
watch([width, height], () => {
  calculatePositions(); // Recalculate positions on resize
});

/**
 * Handle the start of a drag event.
 */
const onDragStart = (event, index) => {
  draggedItemIndex.value = index; // Save the index of the dragged item
};

/**
 * Handle the drop event to swap item positions.
 */
const onDrop = (event, targetIndex) => {
  const draggedItemIndexValue = draggedItemIndex.value;

  if (draggedItemIndexValue !== null && draggedItemIndexValue !== targetIndex) {
    const draggedItem = items.value[draggedItemIndexValue];
    const targetItem = items.value[targetIndex];

    // Swap their positions
    const tempX = draggedItem.x;
    const tempY = draggedItem.y;
    draggedItem.x = targetItem.x;
    draggedItem.y = targetItem.y;
    targetItem.x = tempX;
    targetItem.y = tempY;

    // Swap the items in the array
    items.value[draggedItemIndexValue] = targetItem;
    items.value[targetIndex] = draggedItem;

    // Reset dragged item index after swap
    draggedItemIndex.value = null;
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
            {{ item.label }}
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
