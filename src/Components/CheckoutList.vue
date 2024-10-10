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
  <v-row
    v-for="(item, index) in props.list"
    :key="item.value.itemId"
    no-gutters
  >
    <v-col cols="12" class="px-2 py-0">
      <v-container fluid class="pa-0">
        <v-row no-gutters>
          <v-col cols="auto" align-self="center">
            {{ item.value.itemName }} ({{ item.count }})
          </v-col>
          <v-col align-self="center" class="px-1">
            <v-divider class="border-opacity-100"></v-divider>
          </v-col>
          <v-col cols="auto" align-self="center">
            {{
              Math.abs(item.value.pricePerUnit).toLocaleString("en-US", {
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
</template>

<style scoped>
.delete-btn {
  margin-right: -24px;
  font-size: 22px;
}
</style>
