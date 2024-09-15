// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  css: ['@/assets/styles/index.sass'],
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
  ],
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en.json',
      },
    ],
    lazy: false,
    langDir: 'locales/',
    defaultLocale: 'en',
  },
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: '@use "@/assets/styles/imports/_index.sass" as *\n',
        },
      },
    },
  },
  runtimeConfig: {
    public: {
      VITE_BASE_API_URL: process.env.VITE_BASE_API_URL,
    },
  },
  devServer: { port: 3000 },
  eslint: {
    checker: true,
  },
  typescript: {
    typeCheck: true,
    strict: true,
  },
  app: {
    head: {
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap',
        },
      ],
    },
  },
});