<template>
  <label>
    {{ title }}
    <input :name="name" :type="type" @input="onInput" :value="modelValue" />
  </label>
  <div v-if="error" class="error">{{ error }}</div>
</template>

<script setup lang="ts">
import { PropType } from "vue";

defineProps({
  name: {
    type: String as PropType<string>,
    required: true,
  },
  title: {
    type: String as PropType<string>,
    required: true,
  },
  modelValue: {
    type: String as PropType<string>,
    required: true,
  },
  type: {
    type: String as PropType<string>,
    required: false,
    default: () => "text",
  },
  error: {
    type: String as PropType<string>,
    required: false,
    default: () => undefined,
  },
});

const emits = defineEmits(["input"]);

function onInput(event: Event) {
  emits("input", event);
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
