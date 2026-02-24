<template>
  <form class="grid grid-cols-1 gap-y-6" @submit.prevent="login">
    <div class="grid grid-cols-1">
      <label for="username" class="label">Username or Email</label>
      <input
        v-model="userLogin.email"
        name="username"
        type="email"
        class="input"
        placeholder="Enter your username or email"
        autocomplete="username"
        required
      >
    </div>
    <div class="grid grid-cols-1">
      <label for="password" class="label">Password</label>
      <input
        v-model="userLogin.password"
        name="password"
        type="password"
        class="input"
        placeholder="Enter your password"
        autocomplete="current-password"
        required
      >
    </div>
    <button type="submit" class="submit-btn" :disabled="loading">
      Login to Dashboard
      <Icon :name="loading ? 'ph:circle-notch-bold' : 'ph:arrow-right-bold'" :class="loading ? 'animate-spin' : ''" />
    </button>

    <small class="text-red-500 text-center">{{ error }}</small>
  </form>
</template>
<script setup lang="ts">
const authStore = useAuthStore()

const { error, loading } = storeToRefs(authStore)

const userLogin = ref<User>({
  email: '',
  password: '',
})

async function login() {
  await authStore.login(userLogin.value)
}
</script>
