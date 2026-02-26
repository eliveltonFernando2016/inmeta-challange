<template>
  <div class="container">
    <h1 class="h1">Cards to trade</h1>
    <div class="grid grid-cols-1 gap-4 lg:gap-8 mt-4 lg:mt-8">
      <div v-for="(trade, index) in trades" :key="index" class="bg-white border border-slate-light rounded-xl">
        <div class="flex items-center gap-2 p-3">
          <Icon name="ph:user" size="24" class="text-green-nature" />
          <h3 class="text-lg leading-7 text-midnight-blue font-bold">{{ trade.user.name }}</h3>
        </div>
        <div class="p-3 bg-green-nature/5 border-t border-b border-cloud-soft">
          <div class="flex gap-3 overflow-x-auto py-3">
            <Card v-for="(cards, i) in trade.tradeCards" :key="i" :card="cards.card" class="!w-80 grow-0 shrink-0 basis-auto" type="toTrade" />
          </div>
        </div>
      </div>
    </div>

    <Pagination v-if="trades?.length >= 20" :current-page="currentPage" @paginate="paginationHandler" />
  </div>
</template>
<script setup lang="ts">
const tradeStore = useTradetore()
const trades = computed(() => tradeStore.listTrade ?? [])
const { currentPage } = storeToRefs(tradeStore)

function paginationHandler(page: number) {
  tradeStore.getTrades(page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>