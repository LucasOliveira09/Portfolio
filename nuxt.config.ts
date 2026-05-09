// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['./app/assets/css/main.css'],
  
  // Configuração para Vercel e HTTPS
  nitro: {
    preset: 'vercel'
  },
  
  devServer: {
    https: true
  },

  app: {
    head: {
      title: 'Lucas Oliveira | Full-Stack Developer & Software Engineer Student',
      htmlAttrs: {
        lang: 'pt-BR'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Explore o portfólio de Lucas Oliveira, desenvolvedor Full-Stack especializado em Nuxt, Node.js e IA. Veja projetos, experiência e habilidades técnicas.' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#2563eb' },
        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://lucasoliveira.dev' }, // Ajustar para o domínio real se necessário
        { property: 'og:title', content: 'Lucas Oliveira | Full-Stack Developer' },
        { property: 'og:description', content: 'Desenvolvedor Full-Stack focado em soluções modernas com Nuxt.js, IA e arquitetura robusta.' },
        { property: 'og:image', content: '/icons/icon.png' },
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:url', content: 'https://lucasoliveira.dev' },
        { name: 'twitter:title', content: 'Lucas Oliveira | Full-Stack Developer' },
        { name: 'twitter:description', content: 'Desenvolvedor Full-Stack focado em soluções modernas com Nuxt.js, IA e arquitetura robusta.' },
        { name: 'twitter:image', content: '/icons/icon.png' },
        { name: 'keywords', content: 'Lucas Oliveira, Desenvolvedor Full-Stack, Engenharia de Software, Nuxt.js, Vue.js, Node.js, Portfólio, IA, Inteligência Artificial, Programador' }
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
