// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    apiBase: 'https://obsidiankey-api.vercel.app',
    apiLoginPaths: '/login,/api/login,/user/login,/user_login,/auth/login,/signin,/sign-in',
  },
})
