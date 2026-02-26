<template>
  <div class="border border-green-whisper bg-neutral-linen rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
    <img :src="props.card.imageUrl" :alt="props.card.name" class="p-4" >
    <div class="bg-white p-4">
      <p class="text-lg leading-6 font-bold text-midnight-blue lg:min-h-[56px]">{{ props.card.name }}</p>
      <small class="text-green-forest min-h-[41px]">
        {{ props.card.description.length > (props.type === 'toTrade' ? 40 : 50) ? props.card.description.slice(0, (props.type === 'toTrade' ? 40 : 50)) + '...' : props.card.description }}
      </small>
      <button
        v-if="props.type === 'toTrade' && token"
        class="green-btn mt-3 !w-full"
        :class="isAlreadyReceived ? 'bg-green-forest' : ''"
        @click="isAlreadyReceived ? removeReceive() : receiveCard()"
      >
        <Icon :name="isAlreadyReceived ? 'ph:trash' : 'ph:hand-withdraw'" />
        {{ isAlreadyReceived ? 'Remove Receive' : 'Receive' }}
      </button>
      <button v-else-if="props.type === 'marketplace' && token" class="green-btn mt-3 !w-full disabled:opacity-50" :disabled="isAlreadyOwned" @click="addCard">
        <Icon name="ph:plus" />
        {{ isAlreadyOwned ? 'Added' : 'Add' }}
      </button>
      <button
        v-else-if="props.type === 'collection' && token"
        class="green-btn mt-3 !w-full"
        :class="isAlreadyOffered ? 'bg-green-forest' : ''"
        @click="isAlreadyOffered ? removeOffer() : offerCard()"
      >
        <Icon :name="isAlreadyOffered ? 'ph:trash' : 'ph:hand-deposit'" />
        {{ isAlreadyOffered ? 'Remove Offer' : 'Offer' }}
      </button>
      <button v-else-if="!token" class="green-btn mt-3 !w-full" @click="viewCard">
        <Icon name="ph:eye" />
        View
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  card: {
    type: Object,
    required: true
  },
  type: {
    type: String,
    required: true
  }
})

const token = useCookie('token')
const { $swal } = useNuxtApp()
const userStore = useUserStore()
const tradeStore = useTradetore()

const isAlreadyOwned = computed(() => {
  return userStore.getUserCards?.some(c => c.id === props.card.id)
})

const isAlreadyOffered = computed(() => {
  return tradeStore.listCardsToOffer?.some(c => c.id === props.card.id)
})
const isAlreadyReceived = computed(() => {
  return tradeStore.listCardsToReceive?.some(c => c.id === props.card.id)
})

function viewCard() {
  $swal.fire({
    showConfirmButton: false,
    width: '50em',
    title: 'Abaout this card',
    html: `<div class="grid grid-cols-2 gap-4">
        <img src="${props.card.imageUrl}" alt="${props.card.name}" class="object-cover">
        <div>
            <p class="text-lg leading-6 font-bold text-midnight-blue">${props.card.name}</p>
            <small class="text-green-forest !text-left">${props.card.description}</small>
        </div>
      </div>`,
  })
}
function addCard() {
  $swal.fire({
    width: '50em',
    title: 'Add card to my collection',
    html: `<div class="grid grid-cols-2 gap-4">
        <img src="${props.card.imageUrl}" alt="${props.card.name}" class="object-cover">
        <div>
            <p class="text-lg leading-6 font-bold text-midnight-blue">${props.card.name}</p>
            <small class="text-green-forest !text-left">${props.card.description}</small>
        </div>
      </div>`,
    showCancelButton: true,
    confirmButtonColor: "#4C9A66",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, add it!",
    showCloseButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      userStore.addCard([props.card.id])

      $swal.fire({
        title: "Added successfully!",
        text: "Your card has been added.",
        icon: "success",
        confirmButtonColor: "#4C9A66",
      })
    }
  })
}
function offerCard() {
  $swal.fire({
    width: '50em',
    title: 'Offer this card',
    html: `<div class="grid grid-cols-2 gap-4">
        <img src="${props.card.imageUrl}" alt="${props.card.name}" class="object-cover">
        <div>
            <p class="text-lg leading-6 font-bold text-midnight-blue">${props.card.name}</p>
            <small class="text-green-forest !text-left">${props.card.description}</small>
        </div>
      </div>`,
    showCancelButton: true,
    confirmButtonColor: "#4C9A66",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, offer it!",
    showCloseButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      tradeStore.addToTrade({
        cardId: props.card.id,
        type: 'OFFERING'
      })

      tradeStore.addCardToTrade(props.card as Card, 'OFFERING')

      $swal.fire({
        title: "Card offered successfully!",
        text: "Your card has been offered.",
        icon: "success",
        confirmButtonColor: "#4C9A66",
      })
    }
  })
}
function receiveCard() {
  $swal.fire({
    width: '50em',
    title: 'Receive this card',
    html: `<div class="grid grid-cols-2 gap-4">
        <img src="${props.card.imageUrl}" alt="${props.card.name}" class="object-cover">
        <div>
            <p class="text-lg leading-6 font-bold text-midnight-blue">${props.card.name}</p>
            <small class="text-green-forest !text-left">${props.card.description}</small>
        </div>
      </div>`,
    showCancelButton: true,
    confirmButtonColor: "#4C9A66",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, receive it!",
    showCloseButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      tradeStore.addToTrade({
        cardId: props.card.id,
        type: 'RECEIVING'
      })

      tradeStore.addCardToTrade(props.card as Card, 'RECEIVING')

      $swal.fire({
        title: "Card received successfully!",
        text: "Your card has been received.",
        icon: "success",
        confirmButtonColor: "#4C9A66",
      })
    }
  })
}
function removeOffer() {
  $swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#4C9A66",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, remove it!"
  }).then((result) => {
    if (result.isConfirmed) {
      tradeStore.removeOfferCard(props.card.id)

      $swal.fire({
        title: "Removed!",
        text: "Your offer has been removed.",
        icon: "success",
        confirmButtonColor: "#4C9A66",
      })
    }
  })
}
function removeReceive() {
  $swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#4C9A66",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, remove it!"
  }).then((result) => {
    if (result.isConfirmed) {
      tradeStore.removeReceiveCard(props.card.id)

      $swal.fire({
        title: "Removed!",
        text: "Your receive has been removed.",
        icon: "success",
        confirmButtonColor: "#4C9A66",
      });
    }
  })
}
</script>