<template>
  <div class="tce-root">
    <p>
      This is the Display version of the content element id: {{ element.id }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { Element } from 'tce-manifest';

defineProps<{ element: Element; userState: any }>();
defineEmits(['interaction']);
</script>

<style scoped>
.tce-root {
  font-size: 1rem;
  font-family: Arial, Helvetica, sans-serif;
}
</style>
