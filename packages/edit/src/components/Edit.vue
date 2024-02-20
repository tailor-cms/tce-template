<template>
  <div class="tce-container">
    <div>This is Edit version of the content element id: {{ element?.id }}</div>
    <div class="mt-6 mb-2">
      Counter:
      <span class="font-weight-bold">{{ element.data.count }}</span>
    </div>
    <button @click="increment">Increment</button>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue';
import { Element } from 'tce-manifest';

const emit = defineEmits(['save']);
const props = defineProps<{ element: Element; isFocused: boolean }>();

const increment = () => {
  const { data } = props.element;
  const count = data.count + 1;
  emit('save', { ...data, count });
};
</script>

<style scoped>
.tce-container {
  background-color: transparent;
  margin-top: 1rem;
  padding: 1.5rem;
  border: 2px dashed #888;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
}

button {
  margin: 1rem 0 0 0;
  padding: 0.25rem 1rem;
  background-color: #eee;
  border: 1px solid #444;
}
</style>
