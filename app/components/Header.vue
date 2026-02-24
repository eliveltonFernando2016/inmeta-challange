<template>
  <header class="w-full bg-white sticky top-0 z-10 shadow-md py-5">
    <nav class="container flex items-center justify-between">
      <NuxtLink to="/">
        <img src="@/assets/img/logo.svg" alt="Logo">
      </NuxtLink>
      <ul class="flex items-center justify-center gap-8 *:text-sm *:font-semibold *:text-midnight-blue *:border-b-2 *:border-transparent *:pb-1">
        <li class="hover:border-midnight-blue transition-all">Marketplace</li>
        <li class="hover:border-midnight-blue transition-all">Auctions</li>
        <li class="hover:border-midnight-blue transition-all">Community</li>
      </ul>
      <div class="flex items-center justify-center gap-4">
        <NuxtLink to="/login?tab=signup" class="bg-green-nature hover:bg-midnight-blue rounded-lg w-24 h-10 flex items-center justify-center gap-2 font-semibold text-sm text-midnight-blue hover:text-green-nature transition-colors">
          <Icon name="ph:user-plus" />
          Sign Up
        </NuxtLink>
        <NuxtLink to="/login" class="bg-cloud-soft hover:bg-midnight-blue rounded-lg w-24 h-10 flex items-center justify-center gap-2 font-semibold text-sm text-midnight-blue hover:text-cloud-soft transition-colors">
          <Icon name="ph:sign-in" />
          Login
        </NuxtLink>
      </div>
    </nav>
  </header>
</template>
<script setup lang="ts">

</script>