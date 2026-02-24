export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie('token')

  if (to.path === '/login' || to.path === '/') {
    return
  }

  if (!token.value) {
    return navigateTo('/')
  }
})
