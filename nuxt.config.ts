// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: [
      'trpc-nuxt',
    ],
  },
  typescript: {
    shim: false,
  },
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@nuxtjs/supabase'],
  app: {
    head: {
      title: 'Finances',
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico',
        },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  shadcn: {
    prefix: '',
    componentDir: './components/ui',
  },
  supabase: {
    redirect: false,
  },
})
