<template>
  <div class="tce-root">
    <p>This is the Display version of the content element {{ id }}</p>
  </div>
</template>

<script setup lang="ts">
import { ElementData } from 'tce-manifest';

defineProps<{ id: number; data: ElementData }>();
</script>

<style scoped>
.tce-root {
  background-color: transparent;
  margin-top: 1rem;
  padding: 1rem;
  border: 2px dashed #888;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
}
</style>
