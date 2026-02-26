<template>
  <div class="container">
    <h1 class="h1">Cards</h1>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8 mt-4 lg:mt-8">
      <Card v-for="(item, index) in cards" :key="index" :card="item" type="marketplace" />
    </div>

    <Pagination :current-page="currentPage" @paginate="paginationHandler" />
  </div>
</template>
<script setup lang="ts">
useHead({
  title: '- Cards',
  meta: [
    { name: 'description', content: 'CardSwap, marketplace of cards' }
  ]
})

const userStore = useUserStore()
const cardsStore = useCardstore()
const { currentPage } = storeToRefs(cardsStore)

const cards = computed(() => cardsStore.listCards)

function paginationHandler(page: number) {
  cardsStore.getCards(page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(async () => {
  await userStore.getCards()
})
</script>