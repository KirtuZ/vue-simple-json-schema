<template>
  <div class="example">
    <VueSimpleJsonSchema
      v-model="model"
      :options="options"
      :components="components"
      :ui-schema="uiSchema"
      :schema="schema"
      @update:errors="onUpdateErrors"
    />
    <pre>
        {{ model }}
    </pre>
  </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from "vue";
import { ErrorObject } from "ajv";
const ExampleInput = defineAsyncComponent(() => import("./ExampleInput.vue"));
const ExampleSelect = defineAsyncComponent(() => import("./ExampleSelect.vue"));

const VueSimpleJsonSchema = defineAsyncComponent(
  () => import("../VueSimpleJsonSchema.vue")
);

// ## Types

type FieldsProperties = {
  type?: string;
  format?: string;
  description?: string;
  minLength?: number;
  maxLength?: number;
  minimum?: number;
  maximum?: number;
  pattern?: string;
  enum?: string[];
};

// ## Refs

const options = {
  castToSchemaType: true,
};
const model = ref<Record<string, string | undefined>>({});
const errors = ref<Record<string, string | undefined>>({});

// ## Computed

const components = computed(() => ({
  string: ExampleInput,
  enum: ExampleSelect,
}));

const schema = computed(() => ({
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "https://igentify-dev.s3.amazonaws.com/emr/dynamic.properties.schema.01.json",
  title: "Api dynamic properties",
  description:
    "Describes dynamic properties that can be attached to the sample during registration. The payload should be configured via valid json schema from the settings",
  type: "object",
  additionalProperties: false,
  properties: {
    "@specUrl": {
      type: "string",
      default: "/api/v1/blob/org/dynamic.fields.json",
      example: "/api/v1/blob/org/dynamic.fields.json",
    },
    textExample: {
      description: "Text Example",
      type: "string",
      maxLength: 4,
    },
    enumExample: {
      description: "Enum Example",
      enum: ["red", "blue", "white"],
    },
  },
  required: [],
}));
const uiSchema = computed(() => {
  const uiSchema: any[] = [];

  if (schema.value?.properties) {
    Object.entries(schema.value.properties)
      .filter(([key]) => key !== "@specUrl")
      .forEach(([key, field]) => {
        uiSchema.push(buildUISchemaItem(field, key));
      });
  }

  return uiSchema;
});

function buildUISchemaItem(field: FieldsProperties, key: string) {
  const specificProps = field.enum
    ? {
        // select props
        options: field.enum,
      }
    : {
        // text field props
        type: field.format,
      };

  return {
    component: field.enum ? "enum" : field.type,
    modelValue: model.value[key],
    model: key,
    fieldOptions: {
      on: ["update:modelValue", "select"],
      key,
      class: "ign-input",
      attrs: {
        ...specificProps,
        name: key,
        title: field.description,
        modelValue: model.value[key],
        error: errors.value[`/${key}`],
      },
    },
  };
}

function onUpdateErrors(freshErrors: ErrorObject[] | null) {
  if (freshErrors === null) {
    errors.value = {};
  } else {
    errors.value = freshErrors.reduce(
      (
        result: Record<string, string | undefined>,
        currentValue: ErrorObject
      ) => {
        result[currentValue.instancePath] = currentValue.message;

        return result;
      },
      {}
    );
  }
}
</script>

<style scoped>
.example {
  text-align: left;
}
</style>
