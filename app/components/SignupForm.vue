<template>
  <form class="grid grid-cols-1 gap-y-6" @submit.prevent="signUp">
    <div class="grid grid-cols-1">
      <label for="name" class="label">Name</label>
      <input
        v-model="userSignUp.name"
        name="name"
        class="input"
        placeholder="Enter your full name"
        autocomplete="name"
        required
      >
    </div>
    <div class="grid grid-cols-1">
      <label for="email" class="label">E-mail</label>
      <input
        v-model="userSignUp.email"
        name="email"
        type="email"
        class="input"
        placeholder="Enter your e-mail"
        autocomplete="email"
        required
      >
    </div>
    <div class="grid grid-cols-1">
      <label for="password" class="label">Password</label>
      <input
        v-model="userSignUp.password"
        name="password"
        type="password"
        class="input"
        placeholder="Enter your password"
        autocomplete="new-password"
        required
      >
    </div>
    <div class="grid grid-cols-1">
      <label for="repeat-password" class="label">Repeat password</label>
      <input
        v-model="repeatPassword"
        name="repeat-password"
        type="password"
        class="input"
        placeholder="Repeat your password"
        autocomplete="new-password"
        required
      >
      <small v-if="passwordError" class="text-red-500 text-sm mt-1 pl-1.5">{{ passwordError }}</small>
    </div>
    <button type="submit" class="submit-btn">
      Login to Dashboard
      <Icon :name="loading ? 'ph:circle-notch-bold' : 'ph:arrow-right-bold'" :class="loading ? 'animate-spin' : ''" />
    </button>

    <small class="text-red-500 text-center">{{ error }}</small>
  </form>
</template>
<script setup lang="ts">
const authStore = useAuthStore()
const { error, loading } = storeToRefs(authStore)

const userSignUp = ref<User>({
  email: '',
  password: '',
  name: ''
})
const repeatPassword = ref('')
const passwordError = ref('')

async function signUp() {
  passwordError.value = ''

  if (userSignUp.value.password !== repeatPassword.value) {
    passwordError.value = 'Passwords do not match'
    return
  }

  if (userSignUp.value.password.length < 6) {
    passwordError.value = 'Password must be at least 6 characters'
    return
  }

  await authStore.signUp(userSignUp.value)
}
</script>