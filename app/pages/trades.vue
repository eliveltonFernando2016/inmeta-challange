<template>
  <div class="container">
    <h1 class="h1">Create New Trade Request</h1>
    <div class="grid grid-cols-2 gap-8 mt-8">
      <div class="bg-white border border-slate-light rounded-xl">
        <div class="flex items-center gap-2 p-3">
          <Icon name="ph:hand-deposit" size="24" class="text-green-nature" />
          <h3 class="text-lg leading-7 text-midnight-blue font-bold">Cards I'm Offering</h3>
        </div>
        <div class="p-3 bg-green-nature/5 border-t border-b border-cloud-soft mt-3">
          <div class="flex gap-3 overflow-x-auto">
            <div v-for="(item, index) in offerList" :key="index" class="border-2 border-green-nature rounded-md w-20 overflow-x-hidden grow-0 shrink-0 basis-auto">
              <img :src="item.imageUrl" class="object-cover" :alt="item.name" >
            </div>
          </div>
        </div>
      </div>
      <div class="bg-white border border-slate-light rounded-xl">
        <div class="flex items-center gap-2 p-3">
          <Icon name="ph:hand-withdraw" size="24" class="text-green-nature" />
          <h3 class="text-lg leading-7 text-midnight-blue font-bold">Cards I Want</h3>
        </div>
        <div class="p-3 bg-green-nature/5 border-t border-b border-cloud-soft mt-3">
          <div class="flex gap-3 overflow-x-auto">
            <div v-for="(item, index) in receiveList" :key="index" class="border-2 border-green-nature rounded-md w-20 overflow-x-hidden grow-0 shrink-0 basis-auto">
              <img :src="item.imageUrl" class="object-cover" :alt="item.name" >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const tradeStore = useTradetore()

const offerList = computed(() => {
  const listOffer = tradeStore.listTrade?.filter(item => item.type === 'OFFERING') || []
  return tradeStore.listCardsToTrade?.filter(card => listOffer.some(trade => trade.cardId === card.id)) || []
})
const receiveList = computed(() => {
  const listReceive = tradeStore.listTrade?.filter(item => item.type === 'RECEIVING') || []
  return tradeStore.listCardsToTrade?.filter(card => listReceive.some(trade => trade.cardId === card.id)) || []
})
</script>