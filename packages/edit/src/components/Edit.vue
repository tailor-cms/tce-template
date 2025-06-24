<template>
  <div class="tce-container">
    <div>This is Edit version of the content element id: {{ element?.id }}</div>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue';
import { Element } from 'tce-manifest';

defineEmits(['save']);
defineProps<{
  element: Element;
  isDragged: boolean;
  isReadonly: boolean;
  isFocused: boolean;
}>();
</script>

<style scoped>
.tce-container {
  font-size: 1rem;
  font-family: Arial, Helvetica, sans-serif;
}
</style>
