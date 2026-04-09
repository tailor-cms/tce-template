<template>
  <div class="tce-container">
    <div>This is Edit version of the content element id: {{ element?.id }}</div>
  </div>
</template>

<script lang="ts" setup>
import type { Element, ElementData } from 'tce-manifest';

defineProps<{
  element: Element;
  isDragged: boolean;
  isReadonly: boolean;
  isFocused: boolean;
  references?: Record<string, Partial<Element>[]>;
}>();

defineEmits<{
  save: [data: ElementData];
  link: [key?: string];
}>();
</script>

<style scoped>
.tce-container {
  font-size: 1rem;
  font-family: Arial, Helvetica, sans-serif;
}
</style>
