<script setup>
// Define props
const props = defineProps({
  list: { type: Array, required: true },
  readOnly: { type: Boolean, default: false },
});

// Define emits
const emit = defineEmits(["onItemRemove"]);
</script>

<template>
  <transition-group name="list-transition" tag="div" class="list-container">
    <v-row v-for="(item, index) in props.list" :key="item.itemId" no-gutters>
      <v-col cols="12" class="px-2 py-0">
        <v-container fluid class="pa-0">
          <v-row no-gutters>
            <v-col cols="auto" align-self="center">
              {{ item.itemName }} ({{ item.count }})
            </v-col>
            <v-col align-self="center" class="px-1">
              <v-divider class="border-opacity-100"></v-divider>
            </v-col>
            <v-col cols="auto" align-self="center">
              {{
                Math.abs(item.pricePerUnit).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })
              }}
            </v-col>
            <v-col cols="auto" align-self="center" v-if="!props.readOnly">
              <v-btn
                icon="mdi-delete"
                variant="text"
                class="delete-btn"
                @click="emit('onItemRemove', item)"
                color="error"
              >
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </transition-group>
</template>

<style scoped>
.list-container {
  display: flex;
  flex-direction: column;
}

.list-transition-enter-active,
.list-transition-leave-active {
  transition: all 0.3s ease;
}

.list-transition-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.list-transition-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.list-transition-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.list-transition-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.delete-btn {
  margin-right: -24px;
  font-size: 22px;
}
</style>
