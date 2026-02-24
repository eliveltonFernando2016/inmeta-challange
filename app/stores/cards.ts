export const useCardstore = defineStore('Cards Store', () => {
  const { $axios } = useNuxtApp()

  const cards = ref<Cards[] | null>(null)
  const currentCard = ref<Card | null>(null)
  const loading = ref<boolean>(false)

  const getCards = computed(() => cards.value)
  const getCard = computed(() => card.value)

  async function setCards() {
    loading.value = true

    await $axios.get('/cards').then((res) => {
      cards.value = res.data.list
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      loading.value = false
    })
  }
  async function setCard(id: string) {
    loading.value = true

    await $axios.get('/cards/' + id).then((res) => {
      currentCard.value = res.data
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      loading.value = false
    })
  }

  onMounted(() => {
    await setCards()
  })

  return {
    loading,
    getCards,
    getCard,
    setCards,
    setCard,
  }
})