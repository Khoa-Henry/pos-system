<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useDisplay } from "vuetify";

const { width } = useDisplay();
const router = useRouter();
const translateValue = computed(() => (width.value < 700 ? "120px" : "220px"));
const isMobile = computed(() => width.value < 700);

// Helper function to save items to localStorage
const saveItemsToLocalStorage = (items) => {
  localStorage.setItem("navItems", JSON.stringify(items));
};

// Load items from localStorage or use default items if none exist
const loadItemsFromLocalStorage = () => {
  const storedItems = localStorage.getItem("navItems");
  return storedItems
    ? JSON.parse(storedItems)
    : [
        { text: "Setting", href: "/", icon: "mdi-cogs" },
        { text: "Logout", href: "/", icon: "mdi-logout" },
        { text: "Inventory", href: "/inventory", icon: "mdi-pencil" },
        { text: "History", href: "/history", icon: "mdi-history" },
        { text: "Checkout", href: "/checkout", icon: "mdi-table" },
        { text: "Reports", href: "/", icon: "mdi-chart-areaspline" },
      ];
};

// Reactive items array initialized from localStorage
const items = ref(loadItemsFromLocalStorage());

let draggedItemIndex = null;

const handleDragStart = (index) => {
  draggedItemIndex = index;
};

// this is to move the item in the current index
const handleDrop = (targetIndex) => {
  if (draggedItemIndex === targetIndex) return;

  const draggedItem = items.value.splice(draggedItemIndex, 1)[0];
  items.value.splice(targetIndex, 0, draggedItem);
  draggedItemIndex = null;

  // Save the updated order to localStorage
  saveItemsToLocalStorage(items.value);
};

// this is the swap the 2 items
// const handleDrop = (targetIndex) => {
//   if (draggedItemIndex === targetIndex) return;

//   [items.value[draggedItemIndex], items.value[targetIndex]] = [
//     items.value[targetIndex],
//     items.value[draggedItemIndex],
//   ];

//   draggedItemIndex = null;

//   // Save the updated order to localStorage
//   saveItemsToLocalStorage(items.value);
// };

const allowDrop = (event) => {
  event.preventDefault();
};

// Save to localStorage whenever items change
watch(items, (newItems) => {
  saveItemsToLocalStorage(newItems);
});

// Ensure items are loaded when the component mounts
onMounted(() => {
  items.value = loadItemsFromLocalStorage();
});
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
        :key="item.text"
        class="nav-item"
        draggable="true"
        @dragstart="handleDragStart(index)"
        @dragover="allowDrop"
        @drop="handleDrop(index)"
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
  cursor: grab;
  transition: transform 0.5s ease; /* Smooth transition on transform */
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
