<template>
  <div class="tce-container">
    <span>This is Edit version of the content element {{ element?.id }}</span>
  </div>
</template>

<script setup lang="ts">
import { Element } from 'tce-manifest';

defineProps<{ element: Element; isFocused: boolean }>();
defineEmits(['save']);
</script>

<style scoped>
.tce-container {
  background-color: transparent;
  margin-top: 1rem;
  padding: 1rem;
  border: 2px dashed #888;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
}
</style>
