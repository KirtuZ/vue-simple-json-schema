<template>
  <div v-for="(node, key) in mountedComponents" :key="key">
    <component :is="node" />
  </div>
</template>

<script setup lang="ts">
import { computed, DefineComponent, h, PropType, ref, VNode } from "vue";
import Ajv from "ajv";

const props = defineProps({
  schema: {
    type: Object as PropType<any>, // TODO: type
    required: true,
  },
  uiSchema: {
    type: Array as PropType<any[]>, // TODO: type
    required: true,
  },
  components: {
    type: Object as PropType<any>, // TODO: type
    required: true,
  },
  options: {
    type: Object as PropType<any>, // TODO: type
    required: true,
  },
  modelValue: {
    type: Object as PropType<any>,
    required: true,
  },
});

const emits = defineEmits(["update:errors", "update:modelValue", "validate"]);

const ajv = new Ajv({ strict: false });
const validate = ajv.compile(props.schema);
const localModel = ref(props.modelValue);

const mountedComponents = computed(() => {
  console.log("build components...");
  const result: { [key: string]: VNode } = {};

  props.uiSchema?.forEach((options: any) => {
    result[options.fieldOptions.key] = h(
      props.components?.[options.component] as DefineComponent,
      {
        ...options.fieldOptions.attrs,
        modelValue: props.modelValue?.[options.fieldOptions.key],
        onInput(event: Event) {
          const target = event.target as HTMLInputElement;

          updateModel(options.fieldOptions.key, target.value);
        },
        onSelect(event: Event) {
          const target = event.target as HTMLInputElement;

          updateModel(options.fieldOptions.key, target.value);
        },
      },
      {}
    );
  });

  return result;
});

function updateModel(key: string, value: any) {
  localModel.value[key] = value;
  emits("update:modelValue", localModel.value);

  const valid = validate(localModel.value);
  emits("validate", valid);
  emits("update:errors", validate.errors);
}
</script>

<style scoped></style>
