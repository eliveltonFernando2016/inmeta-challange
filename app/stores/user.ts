export const useUserStore = defineStore('User Store', () => {
  const { $axios } = useNuxtApp()

  const currrentUser = ref<User | null>(null)

  const getCurrentUser = computed(() => {
    return currrentUser.value
  })

  async function setCurrentUser() {
    await $axios.get('/me').then((res) => {
      currrentUser.value = res.data
    })
  }

  return {
    getCurrentUser,
    setCurrentUser,
  }
})