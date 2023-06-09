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
          console.log("onInput", target);

          updateModel(
            options.fieldOptions.key,
            target.type === "number" ? target.valueAsNumber : target.value
          );
        },
        onSelect(value: string | number | boolean | null) {
          console.log("onInput", value);

          updateModel(options.fieldOptions.key, value);
        },
        onUpdateModelValue(value: any) {
          console.log("onUpdateModelValue", value);

          updateModel(options.fieldOptions.key, value);
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
  console.log("updateModel", key, value, valid, validate.errors);
  emits("update:errors", validate.errors);
}
</script>

<style scoped></style>
