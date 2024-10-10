<script setup>
const { modelValue } = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(["update:modelValue"]);

const formatCurrency = () => {
  if (modelValue) {
    const parseValue = parseFloat(modelValue);
    emit("update:modelValue", (Math.round(parseValue * 100) / 100).toFixed(2));
  }
};
</script>

<template>
  <v-text-field
    prefix="$"
    placeholder="0.00"
    type="number"
    :model-value="modelValue"
    @input="
      (e) => {
        // only accept numbers and no special character expect for. vuetify number only doesnt work on other browser beside chrome
        emit('update:modelValue', e.target.value);
      }
    "
    @blur="formatCurrency"
    required
  />
</template>
