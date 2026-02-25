export const useTradetore = defineStore('Trade Store', () => {
  const { $axios, $loading } = useNuxtApp()

  const loading = ref<boolean>(false)
  const trades = ref<Trade[] | null>(null)
  const tradeRequest = ref<TradeRequest[] | null>(null)
  const cardsToTrade = ref<Card[] | null>(null)
  const currentPage = ref<number>(0)

  const listTrade = computed(() => trades.value)
  const listCardsToTrade = computed(() => cardsToTrade.value)

  function addToTrade(trade: TradeRequest) {
    if (!tradeRequest.value) {
      tradeRequest.value = []
    }

    const exists = tradeRequest.value.some(t => t.cardId === trade.cardId)
    if (exists) return

    tradeRequest.value.push(trade)
    localStorage.setItem('trades', JSON.stringify(tradeRequest.value))
  }
  function addCardToTrade(card: Card) {
    if (!cardsToTrade.value) {
      cardsToTrade.value = []
    }

    const exists = cardsToTrade.value.some(t => t.id === card.id)
    if (exists) return

    cardsToTrade.value.push(card)
    localStorage.setItem('cardsToTrade', JSON.stringify(cardsToTrade.value))
  }
  async function setTrade(trades: Trade[]) {
    loading.value = true

    await $axios.post('/trades', {
      cards: trades
    }).then(res => {
      console.log(res.data)
    }).catch(err => {
      console.log(err)
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

      const savedCardsToTrade = localStorage.getItem('cardsToTrade')
      if (savedCardsToTrade) {
        const parsed = JSON.parse(savedCardsToTrade)
        if (!cardsToTrade.value) {
          cardsToTrade.value = parsed
        }
        else {
          const merged = [...cardsToTrade.value]
          parsed.forEach((saved: Card) => {
            const exists = merged.some(t => t.id === saved.id)
            if (!exists) merged.push(saved)
          })

          cardsToTrade.value = merged
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
    addCardToTrade,
    listCardsToTrade,
    currentPage
  }
})