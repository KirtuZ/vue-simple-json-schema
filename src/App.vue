<template>
  <SimpleExample />
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const SimpleExample = defineAsyncComponent(
  () => import("./components/example/SimpleExample.vue")
);
</script>
