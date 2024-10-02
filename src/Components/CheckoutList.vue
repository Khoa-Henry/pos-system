<script setup>
const { list, readOnly = false } = defineProps({
  list: { type: Array, required: true },
  readOnly: { type: Boolean },
});

const emit = defineEmits(["onItemRemove"]);
</script>

<template>
  <v-row v-for="item in list" no-gutters>
    <v-col cols="12" class="px-2 py-2">
      <v-container fluid class="pa-0">
        <v-row no-gutters>
          <v-col cols="auto"
            >{{ item.value.itemName }} ({{ item.count }})</v-col
          >
          <v-col cols="true" align-self="center" class="px-1">
            <v-divider class="border-opacity-100"></v-divider>
          </v-col>
          <v-col cols="auto">
            {{
              Math.abs(item.value.pricePerUnit).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })
            }}
          </v-col>
          <v-col cols="auto" align-self="center" v-if="!readOnly">
            <v-btn
              icon="mdi-delete"
              variant="text"
              height="24"
              style="margin-right: -24px"
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
