<template>
  <form class="grid grid-cols-1 gap-y-6">
    <div class="grid grid-cols-1">
      <label for="name" class="label">Name</label>
      <input
        name="name"
        class="input"
        placeholder="Enter your full name"
        autocomplete="name"
      >
    </div>
    <div class="grid grid-cols-1">
      <label for="name" class="label">E-mail</label>
      <input
        name="name"
        type="email"
        class="input"
        placeholder="Enter your e-mail"
        autocomplete="email"
      >
    </div>
    <div class="grid grid-cols-1">
      <label for="password" class="label">Password</label>
      <input
        name="password"
        type="password"
        class="input"
        placeholder="Enter your password"
        autocomplete="new-password"
      >
    </div>
    <div class="grid grid-cols-1">
      <label for="repeat-password" class="label">Repeat password</label>
      <input
        name="repeat-password"
        type="password"
        class="input"
        placeholder="Repeat your password"
        autocomplete="new-password"
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