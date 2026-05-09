<script setup>
import { 
  Github, 
  Linkedin, 
  Youtube, 
  Instagram, 
  Mail, 
  Code2, 
  Cpu, 
  Database, 
  Sparkles, 
  ExternalLink,
  ChevronRight
} from 'lucide-vue-next'

useSeoMeta({
  title: 'Lucas Oliveira | Full-Stack Developer & Software Engineer Student',
  ogTitle: 'Lucas Oliveira | Full-Stack Developer',
  description: 'Portfólio profissional de Lucas Oliveira. Especialista em Nuxt.js, Node.js e integrações com Inteligência Artificial.',
  ogDescription: 'Explore projetos inovadores e a trajetória profissional de Lucas Oliveira no desenvolvimento Full-Stack.',
  ogImage: '/icons/icon.png',
  twitterCard: 'summary_large_image',
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://lucasoliveira.dev' }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Lucas Oliveira",
        "jobTitle": "Full-Stack Developer",
        "url": "https://lucasoliveira.dev",
        "sameAs": [
          "https://github.com/LucasOliveira09",
          "https://www.linkedin.com/in/lucas-oliveira09/",
          "https://www.instagram.com/lucas_oliveira0911"
        ],
        "description": "Desenvolvedor Full-Stack e estudante de Engenharia de Software focado em criar soluções eficientes com Nuxt.js e IA.",
        "knowsAbout": ["Web Development", "Nuxt.js", "Node.js", "Artificial Intelligence", "Software Engineering"]
      })
    }
  ]
})

const stack = [
  {
    category: 'Linguagens & Backend',
    icon: Code2,
    items: [ 'Node.js', 'Python', 'Java', 'C#', 'Pascal/Lazarus']
  },
  {
    category: 'Frontend & UI',
    icon: Cpu,
    items: ['Nuxt.js', 'Tailwind CSS', 'Blazor' ]
  },
  {
    category: 'Bancos de Dados',
    icon: Database,
    items: ['PostgreSQL', 'Supabase', 'SQL', 'MySQL']
  },
  {
    category: 'Diferenciais',
    icon: Sparkles,
    items: ['APIs REST', 'Integração com IA', 'Modelagem de Dados', 'Versionamento de Código', 'Arquitetura de Software', 'Metodologias Ágeis', 'Testes de Software com IA', 'Programação com IA (Claude Code, Antigravity, Github Copilot)', 'Conceitos de segurança'  ]
  }
]

const projects = [
  {
    title: 'SimulaAI',
    description: 'Plataforma SaaS que utiliza Inteligência Artificial para a geração de simulados de provas personalizados. (Em desenvolvimento)',
    tag: 'Nuxt.js + AI + Supabase',
    url: 'https://mailtracer.vercel.app/'
  },
  {
    title: 'MailTracer',
    description: 'Aplicação focada na classificação e resumo inteligente de e-mails, desenvolvida com FastAPI e Inteligência Artificial. (VPS desligada, rodando apenas o front)',
    tag: 'Python + FastAPI + AI',
    url: 'https://mailtracer.vercel.app/'
  },
  {
    title: 'LgaSports',
    description: 'Plataforma e catálogo digital para venda de camisas esportivas, com foco em confiabilidade, conversão e excelente experiência do usuário.',
    tag: 'Nuxt.js + Node.js + Supabase',
    url: 'https://lgasports.vercel.app/'
  },
  {
    title: 'LGHN Systems',
    description: 'Landing page focado na venda do sistema de controle de dados e cardápio digital.',
    tag: 'HTML + Tailwind CSS + JS + Firebase',
    url: 'https://lghnsoluctions.vercel.app/'
  },
  {
    title: 'Cardápio da Nona Lurdes',
    description: 'Cardápio digital interativo desenvolvido para facilitar a visualização dos pratos, melhorando a UX e agilizando o atendimento aos clientes.',
    tag: 'HTML + Tailwind CSS + JS + Firebase',
    url: 'https://nona-lurdes.vercel.app/'
  },
  {
    title: 'Bonanza Pizzaria',
    description: 'Vitrine digital e interface de pedidos para pizzaria, focada em um layout responsivo (mobile-first) e facilidade de navegação.',
    tag: 'HTML + Tailwind CSS + JS + Firebase',
    url: 'https://pizzariabonanza.vercel.app/'
  }
];
</script>

<template>
  <div class="min-h-screen selection:bg-blue-100 selection:text-blue-900">
    <!-- Navigation -->
    <nav class="fixed top-0 w-full z-50 glass">
      <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <img src="/icons/icon.png" alt="Logotipo Lucas Oliveira - Desenvolvedor Full-Stack" class="h-9 w-9 rounded-xl shadow-sm" />
          <span class="font-bold text-xl tracking-tight text-blue-600 dark:text-blue-400">LO.</span>
        </div>
        <div class="hidden md:flex gap-8 text-sm font-medium uppercase tracking-wider text-slate-600 dark:text-slate-400">
          <a href="#sobre" class="hover:text-blue-600 transition-colors">Sobre</a>
          <a href="#experiencia" class="hover:text-blue-600 transition-colors">Experiência</a>
          <a href="#stack" class="hover:text-blue-600 transition-colors">Stack</a>
          <a href="#projetos" class="hover:text-blue-600 transition-colors">Projetos</a>
          <a href="#contato" class="hover:text-blue-600 transition-colors">Contato</a>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <header class="pt-32 pb-20 px-6 max-w-6xl mx-auto flex flex-col items-center text-center">
      <div class="mb-8">
        <img src="/icons/icon.png" alt="Foto de Perfil/Logo Lucas Oliveira" class="w-24 h-24 rounded-3xl shadow-2xl mx-auto border-4 border-white dark:border-slate-800" />
      </div>
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-6 dark:bg-blue-900/30 dark:text-blue-300">
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
        </span>
        Disponível para novos desafios
      </div>
      <h1 class="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
        Lucas Oliveira
      </h1>
      <p class="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed mb-10">
        Desenvolvedor Full-Stack | Estudante de Engenharia de Software | Criador de Conteúdo
      </p>
      <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <a href="#projetos" class="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2">
          Ver Projetos <ChevronRight :size="18" />
        </a>
        <a href="#contato" class="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-xl font-semibold hover:bg-slate-50 transition-all dark:bg-slate-800 dark:text-white dark:border-slate-700 flex items-center justify-center gap-2">
          Entrar em Contato
        </a>
      </div>
    </header>

    <!-- About Section -->
    <section id="sobre" class="py-24 px-6 bg-white dark:bg-slate-900/50">
      <div class="max-w-4xl mx-auto text-center md:text-left">
        <h2 class="text-3xl font-bold mb-8 text-slate-900 dark:text-white inline-flex items-center gap-3">
          <span class="w-12 h-1 bg-blue-600 rounded-full hidden md:block"></span>
          Sobre Mim
        </h2>
        <div class="prose prose-lg dark:prose-invert max-w-none">
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
            Olá! Meu nome é Lucas Oliveira, tenho 19 anos e moro em Fartura-SP. Sou apaixonado por tecnologia desde criança — aos 10 anos, montei meu primeiro computador. Atualmente, curso Engenharia de Software na Unifio e busco minha primeira oportunidade como Desenvolvedor Júnior. Meu objetivo é agregar valor a projetos reais, evoluir continuamente e construir soluções com código limpo, bem estruturado e sem enrolação.
          </p>
        </div>
      </div>
    </section>

    <!-- Experience Section -->
    <section id="experiencia" class="py-24 px-6 max-w-6xl mx-auto">
      <h2 class="text-3xl font-bold mb-12 text-slate-900 dark:text-white text-center md:text-left">Experiência</h2>
      <div class="relative pl-8 border-l-2 border-slate-200 dark:border-slate-800 space-y-12">
        <div class="relative">
          <div class="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-blue-600 border-4 border-slate-50 dark:border-slate-950"></div>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white">Estagiário em Desenvolvimento</h3>
          <p class="text-blue-600 font-medium mb-4">TadsBR Softwares</p>
          <p class="text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            Na TadsBR, vivenciei o dia a dia de uma equipe de desenvolvimento ágil, entregando soluções reais e de impacto. Participei da construção de diversos sistemas, incluindo: Raspadinha Digital, Encarte Digital, PDV Web, Sistema de Pontos e um Sistema para Contadores.

Essa variedade de projetos me forçou a sair da teoria e focar na estruturação profissional do código, com destaque para:<br><br>

APIs e Regras de Negócio: Criação e consumo de APIs robustas, garantindo que a lógica de negócio do cliente funcionasse com perfeição. <br><br>

Segurança na Prática: Implementação de boas práticas para proteger dados sensíveis e fechar vulnerabilidades nas aplicações. <br><br>

Desenvolvimento Homologado: Vivência prática em ambientes de teste, validando e quebrando a aplicação em um ambiente controlado para garantir deploys seguros e sem bugs em produção.
Hoje, minha mentalidade é focada em produtividade e arquitetura eficiente, evitando retrabalho e funções inúteis.
          </p>
        </div>
      </div>
    </section>

    <!-- Tech Stack Section -->
    <section id="stack" class="py-24 px-6 bg-slate-900 text-white overflow-hidden relative">
      <div class="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
      <div class="max-w-6xl mx-auto relative z-10">
        <h2 class="text-3xl font-bold mb-16 text-center">Stack Tecnológica</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="group in stack" :key="group.category" class="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <component :is="group.icon" class="text-blue-400 mb-6" :size="32" />
            <h3 class="text-lg font-bold mb-4">{{ group.category }}</h3>
            <ul class="space-y-2 text-slate-400">
              <li v-for="item in group.items" :key="item" class="flex items-center gap-2 text-sm">
                <div class="w-1 h-1 rounded-full bg-blue-500"></div>
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projetos" class="py-24 px-6 max-w-6xl mx-auto">
  <h2 class="text-3xl font-bold mb-16 text-slate-900 dark:text-white text-center">Projetos</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div v-for="project in projects" :key="project.title" class="group relative p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 transition-all hover:shadow-2xl hover:shadow-blue-500/10">
      <div class="text-xs font-bold uppercase tracking-widest text-blue-600 mb-4">{{ project.tag }}</div>
      <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 transition-colors">
        {{ project.title }}
      </h3>
      <p class="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
        {{ project.description }}
      </p>
      <div class="flex items-center gap-4">
        <a 
          v-if="project.url" 
          :href="project.url" 
          target="_blank" 
          rel="noopener noreferrer"
          class="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white hover:text-blue-600 transition-colors"
        >
          Ver Projeto <ExternalLink :size="16" />
        </a>
      </div>
    </div>
  </div>
</section>

    <!-- Contact & Footer -->
    <footer id="contato" class="py-24 px-6 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl font-bold mb-6 text-slate-900 dark:text-white uppercase tracking-tight">Compartilhando Conhecimento</h2>
        <p class="text-slate-600 dark:text-slate-400 mb-12 text-lg leading-relaxed">
          Acredito que ensinar é uma das melhores formas de aprender. Documento minha jornada na programação, as etapas de desenvolvimento dos meus projetos e um pouco da minha personalidade nas redes sociais.
        </p>
        
        <div class="flex flex-wrap justify-center gap-6 mb-16">
          <a href="https://youtube.com/@CanalLucasOliveira" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-blue-600 hover:text-white transition-all group">
            <Youtube :size="20" />
            <span class="font-semibold">Canal Lucas Oliveira</span>
          </a>
          <a href="https://instagram.com/lucas_oliveira0911" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-pink-600 hover:text-white transition-all group">
            <Instagram :size="20" />
            <span class="font-semibold">@lucas_oliveira0911</span>
          </a>
        </div>

        <div class="pt-16 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-sm">
          <div class="flex flex-col items-center md:items-start gap-4">
            <img src="/icons/icon.png" alt="Logotipo Lucas Oliveira" class="h-10 w-10 rounded-xl" />
            <p>© 2024 Lucas Oliveira . Desenvolvido com Nuxt. E-mail para contato: lucasleiteoliveira09@gmail.com</p>
          </div>
          <div class="flex gap-6">
            <a href="https://github.com/LucasOliveira09" target="_blank" rel="noopener noreferrer" class="hover:text-blue-600" aria-label="Github"><Github :size="20" /></a>
            <a href="https://www.linkedin.com/in/lucas-oliveira09/" target="_blank" rel="noopener noreferrer" class="hover:text-blue-600" aria-label="LinkedIn"><Linkedin :size="20" /></a>
            <a href="mailto:lucasleiteoliveira09@gmail.com" class="hover:text-blue-600" aria-label="E-mail"><Mail :size="20" /></a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
/* Custom animations if needed */
html {
  scroll-behavior: smooth;
}
</style>
