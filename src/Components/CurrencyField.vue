<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(["update:modelValue"]);

const formatCurrency = () => {
  if (props.modelValue) {
    const parseValue = parseFloat(props.modelValue);
    if (!isNaN(parseValue)) {
      console.log((Math.round(parseValue * 100) / 100).toFixed(2));
      emit(
        "update:modelValue",
        (Math.round(parseValue * 100) / 100).toFixed(2)
      );
    }
  }
};
</script>

<template>
  <v-text-field
    prefix="$"
    placeholder="0.00"
    type="number"
    :model-value="props.modelValue"
    @input="(e) => emit('update:modelValue', e.target.value)"
    @blur="formatCurrency"
    required
  />
</template>
