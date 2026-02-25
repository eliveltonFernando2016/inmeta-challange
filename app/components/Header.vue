<template>
  <header class="w-full bg-white sticky top-0 z-10 shadow-md py-5">
    <nav class="container flex items-center justify-between">
      <NuxtLink to="/">
        <img src="@/assets/img/logo.svg" alt="Logo">
      </NuxtLink>
      <ul class="flex items-center justify-center gap-8 *:text-sm *:font-semibold *:text-midnight-blue *:border-b-2 *:pb-1">
        <li class="hover:border-midnight-blue transition-all" :class="route.name === 'index' ? 'border-midnight-blue' : 'border-transparent'">
          <NuxtLink to="/">
            Home
          </NuxtLink>
        </li>
        <li class="hover:border-midnight-blue transition-all" :class="route.name === 'trades' ? 'border-midnight-blue' : 'border-transparent'">
          <NuxtLink to="/trades">
            Trades
          </NuxtLink>
        </li>
        <li class="hover:border-midnight-blue transition-all" :class="route.name === 'profile' ? 'border-midnight-blue' : 'border-transparent'">
          <NuxtLink to="/profile">
            Profile
          </NuxtLink>
        </li>
      </ul>
      <div v-if="!token" class="flex items-center justify-center gap-4">
        <NuxtLink to="/login?tab=signup" class="green-btn">
          <Icon name="ph:user-plus" />
          Sign Up
        </NuxtLink>
        <NuxtLink to="/login" class="light-btn">
          <Icon name="ph:sign-in" />
          Login
        </NuxtLink>
      </div>
      <button v-else class="light-btn" @click="logout">
        <Icon name="ph:sign-out" />
        Logout
      </button>
    </nav>
  </header>
</template>
<script setup lang="ts">
const route = useRoute()
const token = useCookie('token')
const router = useRouter()

function logout() {
  token.value = null
  router.push('/')
}
</script>