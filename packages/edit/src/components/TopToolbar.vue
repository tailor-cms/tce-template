<template>
  <div>
    <p>Edit element top toolbar {{ element?.id }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ element: Element }>();
defineEmits(['save']);
</script>

<style scoped></style>
