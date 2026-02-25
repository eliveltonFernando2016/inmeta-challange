<template>
  <div class="container">
    <h1 class="h1">My Collection</h1>
    <h2 class="text-base text-green-forest leading-6">Manage and track your {{ cards?.length || 0 }} digital collectibles</h2>

    <div class="grid grid-cols-4 gap-8 mt-8">
      <Card v-for="(item, index) in cards" :key="index" :card="item" type="collection" />
    </div>
  </div>
</template>
<script setup lang="ts">
useHead({
  title: '- Profile',
  meta: [
    { name: 'description', content: 'CardSwip, my cards collection' }
  ]
})

const userStore = useUserStore()
const cards = computed(() => userStore.getUserCards)

onMounted(async () => {
  await userStore.getCards()
})
</script>