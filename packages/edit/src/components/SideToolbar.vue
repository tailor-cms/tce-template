<template>
  <div>
    <p>Edit element side toolbar {{ element?.id }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Element } from 'tce-manifest';

defineProps<{ element: Element }>();
defineEmits(['save']);
</script>

<style scoped></style>
