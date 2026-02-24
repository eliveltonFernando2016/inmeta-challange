export const useTradetore = defineStore('Trade Store', () => {
  const { $axios } = useNuxtApp()

  const loading = ref<boolean>(false)
  const trades = ref<Trade[] | null>(null)

  const listTrade = computed(() => trades.value)

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

  return {
    loading,
    listTrade,
    getTrades,
    setTrade,
    deleteTrade,
  }
})