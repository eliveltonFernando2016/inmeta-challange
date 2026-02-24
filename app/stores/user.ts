export const useUserStore = defineStore('User Store', () => {
  const { $axios } = useNuxtApp()

  const currrentUser = ref<User | null>(null)
  const userCards = ref<Card[] | null>(null)

  const getCurrentUser = computed(() => currrentUser.value)
  const getUserCards = computed(() => userCards.value)

  async function setCurrentUser() {
    await $axios.get('/me').then((res) => {
      currrentUser.value = res.data
    })
  }
  async function getCards() {
    await $axios.get('/me/cards').then((res) => {
      userCards.value = res.data
    })
  }
  async function addCard(ids: string[]) {
    await $axios.post('/me/cards', {
      cardIds: ids
    })
  }

  return {
    getCurrentUser,
    setCurrentUser,
    addCard,
    getCards,
    getUserCards
  }
})