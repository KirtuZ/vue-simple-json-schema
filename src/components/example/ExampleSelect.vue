<template>
  <label>
    {{ title }}:
    <select :name="name">
      <option
        v-for="option in options"
        :value="option"
        :key="option"
        :selected="option === state"
      >
        {{ option }}
      </option>
    </select>
  </label>
</template>

<script setup lang="ts">
import { PropType, ref } from "vue";

const props = defineProps({
  name: {
    type: String as PropType<string>,
    required: true,
  },
  options: {
    type: Array as PropType<string[]>,
    required: true,
  },
  modelValue: {
    type: String as PropType<string>,
    required: true,
  },
  title: {
    type: String as PropType<string>,
    required: true,
  },
});

const state = ref(props.modelValue);
</script>

<style scoped></style>
