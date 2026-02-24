<template>
  <div class="container">
    <div class="w-[480px] bg-white rounded-2xl border border-cloud-soft shadow-md p-8 mx-auto">
      <h1 class="text-midnight-blue text-3xl font-bold text-center">Welcome back, Collector</h1>
      <h2 class="text-slate-muted text-base text-center pt-2">Continue your hunt for the rarest cards.</h2>

      <div class="w-full grid grid-cols-2 items-center justify-center border-b-2 border-cloud-soft my-8">
        <button
          :class="[
            'border-b-2 text-sm pb-2',
            activeTab === 'login' ? 'border-green-nature font-bold text-midnight-blue' : 'border-transparent text-slate-soft'
          ]"
          @click="setTab('login')"
        >
          Login
        </button>
        <button
          :class="[
            'border-b-2 text-sm pb-2',
            activeTab === 'signup' ? 'border-green-nature font-bold text-midnight-blue' : 'border-transparent text-slate-soft'
          ]"
          @click="setTab('signup')"
        >
          Create Account
        </button>
      </div>

      <LoginForm v-if="activeTab === 'login'" />
      <SignupForm v-if="activeTab === 'signup'" />
    </div>
  </div>
</template>
<script setup lang="ts">
const route = useRoute()
const activeTab = ref<'login' | 'signup'>('login')

onMounted(() => {
  if (route.query.tab === 'signup') {
    activeTab.value = 'signup'
  } else {
    activeTab.value = 'login'
  }
})

const setTab = (tab: 'login' | 'signup') => {
  activeTab.value = tab
}
</script>