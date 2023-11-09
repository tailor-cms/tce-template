<template>
  <div class="tce-root">
    <p>This is the Display version of the content element {{ id }}</p>
    <v-btn class="my-6" @click="submit">Update user state</v-btn>
    <div>User state: {{ userState }}</div>
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
  padding: 1rem;
  border: 2px dashed #888;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
}
</style>
