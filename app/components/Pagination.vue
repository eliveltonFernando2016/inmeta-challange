<template>
  <div class="flex items-center justify-center gap-4 mt-8">
    <button class="green-btn" @click="emit('paginate', currentPage - 1)">
      <Icon name="ph:arrow-left" />
      Previous
    </button>
    <button class="green-btn" @click="emit('paginate', currentPage + 1)">
      Next
      <Icon name="ph:arrow-right" />
    </button>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits<{
  (e: 'paginate', page: number): void
}>()
</script>