// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/sitemap',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxtjs/google-fonts'
  ],

  plugins: [
    '~/plugins/fontawesome.ts'
  ],

  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Kirsty Wright — software engineer, paramedic, hobbyist developer.' },
        { name: 'theme-color', content: '#34ca46' },
        { property: 'og:locale', content: 'en_GB' },
        { property: 'og:site_name', content: 'Kirsty Wright' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  css: [
    '~/assets/main.css',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],

  site: {
    url: 'https://kirsty.dev',
    name: 'Kirsty Wright'
  },

  content: {},

  future: { compatibilityVersion: 4 },

  compatibilityDate: '2026-05-01',

  nitro: {
    preset: 'node-server',
    compressPublicAssets: { brotli: true, gzip: true }
  },

  vite: {
    plugins: [tailwindcss()],
    build: { target: 'es2020' }
  },

  eslint: {
    config: {
      stylistic: { quotes: 'single', commaDangle: 'never' }
    }
  },

  googleFonts: {
    families: { Inter: [300, 400, 500, 600, 700] },
    display: 'swap',
    prefetch: true,
    preconnect: true,
    preload: true
  },

  image: {
    quality: 80,
    format: ['webp', 'avif'],
    screens: { sm: 640, md: 768, lg: 1024, xl: 1280 }
  },

  sitemap: {
    exclude: []
  }
})
