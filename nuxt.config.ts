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
      title: 'Lucas Oliveira | Full-Stack Developer',
      meta: [
        { name: 'description', content: 'Portfólio profissional de Lucas Oliveira, Desenvolvedor Full-Stack e Estudante de Engenharia de Software.' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap' }
      ]
    }
  }
})
