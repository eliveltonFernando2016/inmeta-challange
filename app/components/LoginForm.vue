<template>
  <form class="grid grid-cols-1 gap-y-6">
    <div class="grid grid-cols-1">
      <label for="username" class="label">Username or Email</label>
      <input
        name="username"
        type="email"
        class="input"
        placeholder="Enter your username or email"
        autocomplete="username"
      >
    </div>
    <div class="grid grid-cols-1">
      <label for="password" class="label">Password</label>
      <input
        name="password"
        type="password"
        class="input"
        placeholder="Enter your password"
        autocomplete="current-password"
      >
    </div>
    <button type="submit" class="submit-btn">
      Login to Dashboard
      <Icon name="ph:arrow-right-bold" />
    </button>
  </form>
</template>
<script setup lang="ts">

</script>
