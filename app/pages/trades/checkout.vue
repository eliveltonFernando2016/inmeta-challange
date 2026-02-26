<template>
  <div class="container">
    <h1 class="h1">Finish trades</h1>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 mt-4 lg:mt-8">
      <div class="bg-white border border-slate-light rounded-xl">
        <div class="flex items-center gap-2 p-3">
          <Icon name="ph:hand-deposit" size="24" class="text-green-nature" />
          <h3 class="text-lg leading-7 text-midnight-blue font-bold">Offering cards</h3>
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
          <h3 class="text-lg leading-7 text-midnight-blue font-bold">Receiving cards</h3>
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
    <button class="green-btn mt-4 place-self-end" @click="tradeHandle">
      <Icon name="ph:swap" />
      Trade it
    </button>
  </div>
</template>
<script setup lang="ts">
const { $swal } = useNuxtApp()
const tradeStore = useTradetore()
const offerList = computed(() => tradeStore.listCardsToOffer)
const receiveList = computed(() => tradeStore.listCardsToReceive)

function tradeHandle() {
  $swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#4C9A66",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, trade it!"
  }).then((result) => {
    if (result.isConfirmed) {
      tradeStore.setTrade()
    }
  })
}
</script>