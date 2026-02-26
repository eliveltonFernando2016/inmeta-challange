export const useAuthStore = defineStore('Auth Store', () => {
  const { $axios, $swal } = useNuxtApp()

  const currentUser = useUserStore()

  const user = ref<User | null>(null)
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)
  const userId = ref<string | null>(null)

  const getUser = computed((): User | null => {
    return user.value
  })

  async function signUp(user: User) {
    loading.value = true

    await $axios.post('/register', {
      email: user.email,
      password: user.password,
      name: user.name,
    }).then((res) => {
      error.value = null
      userId.value = res.data.userId
      $swal.fire({
        title: "Registered!",
        text: "Your register has been confirmed!",
        icon: "success",
        confirmButtonColor: "#4C9A66",
      })
    }).catch((err) => {
      error.value = err.response?.data?.userId || err.message
      console.error('Login error:', err.response?.data || err)
      $swal.fire({
        title: "Error!",
        text: "An error occurred while registering the user.",
        icon: "error",
        confirmButtonColor: "#4C9A66",
      })
    }).finally(() => {
      loading.value = false
    })
  }
  async function login(login: User) {
    loading.value = true

    await $axios.post('/login', {
      email: login.email,
      password: login.password,
    }).then(async (res) => {
      error.value = null
      user.value = res.data.user

      const cookie = useCookie('token', {
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      })
      cookie.value = res.data.token

      await currentUser.setCurrentUser()
      await navigateTo('/')
    }).catch((err) => {
      error.value = err.response?.data?.message || err.message
      console.error('Login error:', err.response?.data || err)
    }).finally(() => {
      loading.value = false
    })
  }

  return {
    loading,
    error,
    getUser,
    signUp,
    login
  }
})