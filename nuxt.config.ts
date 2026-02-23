import type { CreateAxiosDefaults } from 'axios'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],
  runtimeConfig: {
    public: {
      axios: <CreateAxiosDefaults>{
        baseURL: process.env.NUXT_APP_API_URL,
        timeout: 30000,
      },
    }
  },
  pinia: {
    storesDirs: ['./app/stores/**'],
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'pt-br',
      },
      titleTemplate: 'Card Swap %s',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
    },
  },
})