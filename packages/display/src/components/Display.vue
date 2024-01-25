<template>
  <div class="tce-root">
    <p>This is the Display version of the content element id: {{ id }}</p>
    <div class="mt-6 mb-2">
      Counter:
      <span class="font-weight-bold">{{ data.count }}</span>
    </div>
    <v-btn class="my-6" @click="submit">Update user state</v-btn>
    <div>
      <div class="mb-1 text-subtitle-2">User state:</div>
      <pre class="text-body-2">{{ userState }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElementData } from 'tce-manifest';

const props = defineProps<{ id: number; data: ElementData; userState: any }>();
const emit = defineEmits(['interaction']);

const submit = () => emit('interaction', { id: props.id });
</script>

<style scoped>
.tce-root {
  background-color: transparent;
  margin-top: 1rem;
  padding: 1.25rem;
  border: 2px dashed #888;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
}
</style>
