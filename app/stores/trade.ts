export const useTradetore = defineStore('Trade Store', () => {
  const { $axios, $loading, $swal } = useNuxtApp()

  const loading = ref<boolean>(false)
  const trades = ref<Trade[] | null>(null)
  const tradeRequest = ref<TradeRequest[] | null>(null)
  const currentPage = ref<number>(0)
  const cardsToOffer = ref<Card[] | null>(null)
  const cardsToReceive = ref<Card[] | null>(null)

  const listTrade = computed(() => trades.value)
  const listCardsToOffer = computed(() => {
    if (localStorage.getItem('cardsToOffer'))
      cardsToOffer.value = JSON.parse(<string>localStorage.getItem('cardsToOffer'))

    return cardsToOffer.value
  })
  const listCardsToReceive = computed(() => {
    if (localStorage.getItem('cardsToReceive'))
      cardsToReceive.value = JSON.parse(<string>localStorage.getItem('cardsToReceive'))

    return cardsToReceive.value
  })

  function addToTrade(trade: TradeRequest) {
    if (!tradeRequest.value) {
      tradeRequest.value = []
    }

    const exists = tradeRequest.value.some(t => t.cardId === trade.cardId)
    if (exists) return

    tradeRequest.value.push(trade)
    localStorage.setItem('trades', JSON.stringify(tradeRequest.value))
  }
  async function setTrade() {
    console.log(tradeRequest.value)
    loading.value = true

    await $axios.post('/trades', {
      cards: tradeRequest.value
    }).then(() => {
      $swal.fire({
        title: "Traded!",
        text: "Your trade has been confirmed!",
        icon: "success",
        confirmButtonColor: "#4C9A66",
      })
      tradeRequest.value = null
      localStorage.removeItem('cardsToOffer')
      localStorage.removeItem('cardsToReceive')
      localStorage.removeItem('trades')
    }).catch(err => {
      console.log(err)
      $swal.fire({
        title: "Error!",
        text: "An error occurred while trading.",
        icon: "error",
        confirmButtonColor: "#4C9A66",
      })
    }).finally(() => {
      loading.value = false
    })
  }
  async function getTrades(page: number) {
    const loader = $loading.show({
      color: '#13EC5B'
    })
    loading.value = true
    currentPage.value = page

    await $axios.get('/trades', {
      params: {
        rpp: 20,
        page: page
      }
    }).then(res => {
      trades.value = res.data.list
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      loader.hide()
      loading.value = false
    })
  }
  async function deleteTrade(id: string) {
    loading.value = true

    await $axios.delete('/trades/' + id).then((res) => {
      console.log(res.data)
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      loading.value = false
    })
  }
  function addCardToTrade(card: Card, type: TradeType) {
    if (type === 'OFFERING') {
      if (!cardsToOffer.value) cardsToOffer.value = []
      const exist = cardsToOffer.value.some(c => c.id === card.id)
      if (exist) return
      cardsToOffer.value.push(card)
      localStorage.setItem('cardsToOffer', JSON.stringify(cardsToOffer.value))
    } else {
      if (!cardsToReceive.value) cardsToReceive.value = []
      const exist = cardsToReceive.value.some(c => c.id === card.id)
      if (exist) return
      cardsToReceive.value.push(card)
      localStorage.setItem('cardsToReceive', JSON.stringify(cardsToReceive.value))
    }
  }
  function removeOfferCard(id: string) {
    if (tradeRequest.value) {
      tradeRequest.value = tradeRequest.value.filter(t => t.cardId !== id)
      localStorage.setItem('trades', JSON.stringify(tradeRequest.value))
    }

    if (cardsToOffer.value) {
      cardsToOffer.value = cardsToOffer.value.filter(c => c.id !== id)
      localStorage.setItem('cardsToOffer', JSON.stringify(cardsToOffer.value))
    }
  }
  function removeReceiveCard(id: string) {
    if (tradeRequest.value) {
      tradeRequest.value = tradeRequest.value.filter(t => t.cardId !== id)
      localStorage.setItem('trades', JSON.stringify(tradeRequest.value))
    }

    if (cardsToReceive.value) {
      cardsToReceive.value = cardsToReceive.value.filter(c => c.id !== id)
      localStorage.setItem('cardsToReceive', JSON.stringify(cardsToReceive.value))
    }
  }

  onMounted(async () => {
    await getTrades(1)

    if (import.meta.client) {
      const savedTrades = localStorage.getItem('trades')
      if (savedTrades) {
        const parsed = JSON.parse(savedTrades)
        if (!tradeRequest.value) {
          tradeRequest.value = parsed
        } else {
          const merged = [...tradeRequest.value]
          parsed.forEach((saved: TradeRequest) => {
            const exists = merged.some(t => t.cardId === saved.cardId)
            if (!exists) {
              merged.push(saved)
            }
          })
          tradeRequest.value = merged
        }
      }
    }
  })

  return {
    loading,
    listTrade,
    getTrades,
    setTrade,
    deleteTrade,
    addToTrade,
    currentPage,
    addCardToTrade,
    listCardsToOffer,
    listCardsToReceive,
    removeOfferCard,
    removeReceiveCard
  }
})