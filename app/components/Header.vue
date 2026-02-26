<template>
  <header class="w-full bg-white sticky top-0 z-10 shadow-md py-5">
    <nav class="container flex items-center justify-between">
      <NuxtLink to="/">
        <img src="@/assets/img/logo.svg" alt="Logo">
      </NuxtLink>
      <ul class="hidden lg:flex items-center justify-center gap-8 *:text-sm *:font-semibold *:text-midnight-blue *:border-b-2 *:pb-1">
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
      <div v-if="!token" class="hidden lg:flex items-center justify-center gap-4">
        <NuxtLink to="/login?tab=signup" class="green-btn">
          <Icon name="ph:user-plus" />
          Sign Up
        </NuxtLink>
        <NuxtLink to="/login" class="light-btn">
          <Icon name="ph:sign-in" />
          Login
        </NuxtLink>
      </div>
      <div v-else class="hidden lg:flex items-center justify-center gap-4">
        <button v-if="hasTrade" class="green-btn px-2" @click="() => router.push('/trades/checkout')">
          <Icon name="ph:shopping-cart" />
          Checkout
        </button>
        <button class="light-btn" @click="logout">
          <Icon name="ph:sign-out" />
          Logout
        </button>
      </div>
      <button class="block lg:hidden light-btn !w-12" @click="openMenu(isOpen)">
        <Icon name="ph:list" />
      </button>
    </nav>
  </header>
  <div :class="[isOpen ? 'block' : 'hidden']" class="fixed inset-0 bg-black/70 z-40" />
  <div
    :class="[!isOpen ? 'translate-x-full' : 'translate-x-0']"
    class="transition-transform duration-300 w-[90%] h-screen fixed right-0 top-0 bg-white p-6 z-50"
  >
    <div class="flex items-center justify-between">
      <h5 class="text-black text-xl">Menu</h5>
      <button @click="openMenu(isOpen)">
        <Icon name="ph:x-bold" :size="28" class="text-black" />
      </button>
    </div>
    <ul class="flex flex-col gap-8 *:text-sm *:font-semibold *:text-midnight-blue *:border-b-2 *:pb-1 mt-8">
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
    <div v-if="!token" class="flex gap-4 mt-8">
      <NuxtLink to="/login?tab=signup" class="green-btn">
        <Icon name="ph:user-plus" />
        Sign Up
      </NuxtLink>
      <NuxtLink to="/login" class="light-btn">
        <Icon name="ph:sign-in" />
        Login
      </NuxtLink>
    </div>
    <div v-else class="flex gap-4 mt-8">
      <button v-if="hasTrade" class="green-btn px-2" @click="() => router.push('/trades/checkout')">
        <Icon name="ph:shopping-cart" />
        Checkout
      </button>
      <button class="light-btn" @click="logout">
        <Icon name="ph:sign-out" />
        Logout
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
const route = useRoute()
const token = useCookie('token')
const router = useRouter()

function logout() {
  token.value = null
  router.push('/')
}

const tradeStore = useTradetore()
const hasTrade = computed(() => {
  return !!(tradeStore.listCardsToReceive || tradeStore.listCardsToOffer);
})

const isOpen = ref<boolean>(false)
const openMenu = (open: boolean) => {
  isOpen.value = !open
}
</script>