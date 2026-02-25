<template>
  <header class="w-full bg-white sticky top-0 z-10 shadow-md py-5">
    <nav class="container flex items-center justify-between">
      <NuxtLink to="/">
        <img src="@/assets/img/logo.svg" alt="Logo">
      </NuxtLink>
      <ul class="flex items-center justify-center gap-8 *:text-sm *:font-semibold *:text-midnight-blue *:border-b-2 *:border-transparent *:pb-1">
        <li class="hover:border-midnight-blue transition-all">
          <NuxtLink to="/cards">
            Marketplace
          </NuxtLink>
        </li>
        <li class="hover:border-midnight-blue transition-all">
          <NuxtLink to="/trades">
            Trades
          </NuxtLink>
        </li>
        <li class="hover:border-midnight-blue transition-all">
          <NuxtLink to="/profile">
            Profile
          </NuxtLink>
        </li>
      </ul>
      <div class="flex items-center justify-center gap-4">
        <NuxtLink to="/login?tab=signup" class="green-btn">
          <Icon name="ph:user-plus" />
          Sign Up
        </NuxtLink>
        <NuxtLink to="/login" class="light-btn">
          <Icon name="ph:sign-in" />
          Login
        </NuxtLink>
      </div>
    </nav>
  </header>
</template>
<script setup lang="ts">

</script>