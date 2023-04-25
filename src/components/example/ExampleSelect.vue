<template>
  <label>
    {{ title }}:
    <select :name="name" @select="onSelect">
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
const emits = defineEmits(["select"]);

const state = ref(props.modelValue);

function onSelect(value: string) {
  console.log("onSelect", value);
  state.value = value;
  emits("select", {
    name: props.name,
    value,
  });
}
</script>

<style scoped></style>
