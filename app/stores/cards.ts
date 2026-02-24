export const useCardstore = defineStore('Cards Store', () => {
  const { $axios, $loading } = useNuxtApp()

  const cards = ref<Card[] | null>(null)
  const currentCard = ref<Card | null>(null)
  const loading = ref<boolean>(false)
  const currentPage = ref<number>(0)

  const listCards = computed(() => cards.value)
  const getCard = computed(() => currentCard.value)

  async function getCards(page: number) {
    const loader = $loading.show({
      color: '#13EC5B'
    })
    currentPage.value = page
    loading.value = true

    await $axios.get('/cards', {
      params: {
        rpp: 20,
        page: page
      }
    }).then((res) => {
      cards.value = res.data.list
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      loader.hide()
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

  onMounted(async () => {
    await getCards(1)
  })

  return {
    loading,
    listCards,
    getCard,
    setCard,
    currentPage,
    getCards,
  }
})