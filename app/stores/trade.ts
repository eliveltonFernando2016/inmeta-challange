export const useTradetore = defineStore('Trade Store', () => {
  const { $axios } = useNuxtApp()

  const loading = ref<boolean>(false)
  const trades = ref<Trade[] | null>(null)
  const cardsToTrade = ref<Card[] | null>(null)

  const listTrade = computed(() => trades.value)
  const listCardsToTrade = computed(() => cardsToTrade.value)

  function addToTrade(trade: Trade) {
    if (!trades.value) {
      trades.value = []
    }

    const exists = trades.value.some(t => t.cardId === trade.cardId)
    if (exists) return

    trades.value.push(trade)
    localStorage.setItem('trades', JSON.stringify(trades.value))
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
  async function getTrades() {
    loading.value = true

    await $axios.get('/trades').then(res => {
      trades.value = res.data.list
      localStorage.setItem('trades', JSON.stringify(trades.value))
    }).catch(err => {
      console.log(err)
    }).finally(() => {
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

  onMounted(() => {
    if (import.meta.client) {
      const savedTrades = localStorage.getItem('trades')
      if (savedTrades) {
        const parsed = JSON.parse(savedTrades)
        if (!trades.value) {
          trades.value = parsed
        } else {
          const merged = [...trades.value]
          parsed.forEach((saved: Trade) => {
            const exists = merged.some(t => t.cardId === saved.cardId)
            if (!exists) {
              merged.push(saved)
            }
          })
          trades.value = merged
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
  }
})