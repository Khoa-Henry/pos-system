<script setup>
import { useRouter } from "vue-router";

// Props declaration
const props = defineProps({
  displayIcon: { type: Boolean, default: false },
});

// Define emits
const emit = defineEmits(["onIconClick"]);

// Router setup
const router = useRouter();

const onIconClick = () => {
  router.push("/");

  emit("onIconClick");
};
</script>

<template>
  <v-container class="fullHeightContainer px-2" fluid>
    <div class="contentWrapper">
      <!-- Top Row with Back Button and Optional Icon -->
      <v-row no-gutters class="headerRow">
        <!-- Back Button -->
        <v-col>
          <v-btn @click="onIconClick" color="primary" variant="text" icon>
            <v-icon class="iconSize">mdi-chevron-left</v-icon>
          </v-btn>
        </v-col>
        <v-spacer />

        <!-- Optional Icon Slot -->
        <v-col cols="auto" class="pr-4" v-if="props.displayIcon">
          <slot name="iconHeader"></slot>
        </v-col>
      </v-row>

      <!-- Main Content -->
      <v-row no-gutters class="sectionRow">
        <slot></slot>
      </v-row>
    </div>
  </v-container>
</template>

<style scoped>
.fullHeightContainer {
  height: 100vh;
  overflow: hidden;
}

.contentWrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.headerRow {
  margin: 0;
  flex: 0 0 auto;
}

.sectionRow {
  height: 100%;
  overflow: auto;
}

.iconSize {
  font-size: 3rem;
}
</style>
