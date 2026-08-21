// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-08-21',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['./app/assets/css/main.css'],
  
  // Configuração para Vercel e HTTPS
  nitro: {
    preset: 'vercel'
  },
  
  app: {
    head: {
      title: 'Lucas Oliveira | Software Engineer & Full-Stack Developer',
      htmlAttrs: {
        lang: 'pt-BR'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Portfólio de Lucas Oliveira, desenvolvedor full stack aberto a novas oportunidades em backend, APIs e Engenharia de Software.' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#111512' },
        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://lubiagency.com.br/' },
        { property: 'og:title', content: 'Lucas Oliveira | Software Engineer & Full-Stack Developer' },
        { property: 'og:description', content: 'Experiência, competências e projetos de Lucas Oliveira em Engenharia de Software.' },
        { property: 'og:image', content: '/banner-lucas.png' },
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:url', content: 'https://lubiagency.com.br/' },
        { name: 'twitter:title', content: 'Lucas Oliveira | Software Engineer & Full-Stack Developer' },
        { name: 'twitter:description', content: 'Experiência, competências e projetos de Lucas Oliveira em Engenharia de Software.' },
        { name: 'twitter:image', content: '/banner-lucas.png' },
        { name: 'keywords', content: 'Lucas Oliveira, Software Engineer, Desenvolvedor Full Stack, Java, C#, TypeScript, APIs REST, Arquitetura de Software, Inteligência Artificial' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap' }
      ]
    }
  }
})
