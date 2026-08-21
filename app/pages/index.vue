<script setup>
import {
  ArrowDown,
  ArrowUpRight,
  Bot,
  BriefcaseBusiness,
  Database,
  Github,
  GraduationCap,
  Layers3,
  Linkedin,
  Mail,
  ServerCog,
  ShieldCheck,
  Target,
} from 'lucide-vue-next'

const currentYear = new Date().getFullYear()

useSeoMeta({
  title: 'Lucas Oliveira | Software Engineer & Full-Stack Developer',
  ogTitle: 'Lucas Oliveira | Software Engineer & Full-Stack Developer',
  description: 'Portfólio de Lucas Oliveira, desenvolvedor full stack aberto a novas oportunidades em backend, APIs e Engenharia de Software.',
  ogDescription: 'Experiência, competências e projetos de Lucas Oliveira em Engenharia de Software.',
  ogImage: '/banner-lucas.png',
  twitterCard: 'summary_large_image',
})

useHead({
  link: [{ rel: 'canonical', href: 'https://lubiagency.com.br/' }],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Lucas Oliveira',
        jobTitle: 'Software Engineer & Full-Stack Developer',
        url: 'https://lubiagency.com.br/',
        sameAs: [
          'https://github.com/LucasOliveira09',
          'https://www.linkedin.com/in/lucas-oliveira09/',
        ],
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'UNIFIO',
        },
        knowsAbout: [
          'Java',
          'C#',
          'TypeScript',
          'REST APIs',
          'Software Architecture',
          'Artificial Intelligence',
        ],
      }),
    },
  ],
})

const stack = [
  {
    category: 'Backend',
    icon: ServerCog,
    items: ['Java & Spring Boot', 'C# & .NET', 'Node.js', 'Python & FastAPI', 'APIs REST'],
  },
  {
    category: 'Frontend',
    icon: Layers3,
    items: ['TypeScript', 'Vue.js & Nuxt', 'Blazor', 'Tailwind CSS', 'Interfaces responsivas'],
  },
  {
    category: 'Dados & Infra',
    icon: Database,
    items: ['PostgreSQL', 'MySQL', 'Redis', 'Supabase', 'Docker & Git'],
  },
  {
    category: 'Engenharia',
    icon: ShieldCheck,
    items: ['Arquitetura limpa', 'SOLID', 'Microsserviços', 'CI/CD', 'Segurança e testes'],
  },
]

const projects = [
  {
    title: 'ytdlp-java',
    eyebrow: 'Open source',
    description: 'Biblioteca assíncrona para Java 21 que integra yt-dlp e FFmpeg, com Virtual Threads, API fluente e callbacks de progresso em tempo real.',
    tags: ['Java 21', 'FFmpeg', 'Virtual Threads'],
    links: [
      { label: 'Código', url: 'https://github.com/LucasOliveira09/ytdlp-java', icon: Github },
    ],
  },
  {
    title: 'OnFocus',
    eyebrow: 'Extensão publicada',
    description: 'Extensão para Chrome criada para reduzir distrações, ocultando vídeos curtos e anúncios e permitindo bloquear sites durante períodos de foco.',
    tags: ['Chrome Extension', 'JavaScript', 'Productivity'],
    links: [
      { label: 'Código', url: 'https://github.com/LucasOliveira09/NoShortVideos', icon: Github },
      { label: 'Chrome Web Store', url: 'https://chromewebstore.google.com/detail/iilpohelamhbfjimffmihmhlcdnbkfcl', icon: ArrowUpRight },
    ],
  },
  {
    title: 'SimulaAE',
    eyebrow: 'Produto EdTech',
    description: 'Plataforma que identifica os tipos de questão que mais prejudicam o desempenho no ENEM, calcula a nota e entrega um plano de estudos direcionado.',
    tags: ['Next.js', 'React', 'EdTech'],
    links: [
      { label: 'Acessar produto', url: 'https://www.simulaae.com.br/', icon: ArrowUpRight },
    ],
  },
  {
    title: 'ViziHub',
    eyebrow: 'Plataforma SaaS',
    description: 'Plataforma que encontra negócios locais e automatiza a criação de sites, permitindo que usuários apresentem e comercializem a solução sem escrever código.',
    tags: ['Next.js', 'React', 'SaaS'],
    links: [
      { label: 'Acessar produto', url: 'https://www.vizihub.com.br/', icon: ArrowUpRight },
    ],
  },
  {
    title: 'SkillSwap',
    eyebrow: 'Projeto integrador',
    description: 'Plataforma para conectar clientes e prestadores de serviços, com avaliações, chat, portfólio e liberação de pagamento após a conclusão.',
    tags: ['Web Platform', 'UX', 'Marketplace'],
    links: [
      { label: 'Código', url: 'https://github.com/LucasOliveira09/Skillswap', icon: Github },
    ],
  },
  {
    title: 'LgaSports',
    eyebrow: 'Produto digital',
    description: 'Catálogo e experiência de compra para uma loja de camisas esportivas, com foco em navegação móvel, confiança e conversão.',
    tags: ['Vue', 'Node.js', 'Supabase'],
    links: [
      { label: 'Código', url: 'https://github.com/LucasOliveira09/jerseys-site', icon: Github },
      { label: 'Demonstração', url: 'https://lgasports.vercel.app/', icon: ArrowUpRight },
    ],
  },
]
</script>

<template>
  <div class="portfolio-page">
    <a href="#conteudo" class="skip-link">Pular para o conteúdo</a>

    <nav class="site-nav" aria-label="Navegação principal">
      <div class="site-container nav-inner">
        <a href="#inicio" class="brand" aria-label="Lucas Oliveira, início">
          <span class="brand-mark">LO</span>
          <span>Lucas Oliveira</span>
        </a>

        <div class="nav-links">
          <a href="#sobre">Sobre</a>
          <a href="#experiencia">Experiência</a>
          <a href="#stack">Stack</a>
          <a href="#projetos">Projetos</a>
        </div>

        <a href="mailto:lucasleiteoliveira09@gmail.com" class="nav-contact" aria-label="Enviar e-mail para Lucas Oliveira">
          <Mail :size="17" aria-hidden="true" />
          <span class="nav-contact-label">Contato</span>
        </a>
      </div>
    </nav>

    <main id="conteudo">
      <header id="inicio" class="hero-shell">
        <div class="hero-overlay" aria-hidden="true"></div>
        <div class="site-container hero-content">
          <p class="hero-kicker">Desenvolvedor Full Stack · Aberto a oportunidades</p>
          <h1>Lucas Oliveira</h1>
          <p class="hero-summary">
            Tenho experiência profissional com APIs, aplicações web e produtos digitais.
            Busco uma nova oportunidade para contribuir em uma equipe de engenharia, evoluir tecnicamente e entregar software confiável.
          </p>

          <div class="hero-actions">
            <a href="#experiencia" class="button button-primary">
              Ver experiência
              <ArrowDown :size="18" aria-hidden="true" />
            </a>
            <a href="https://www.linkedin.com/in/lucas-oliveira09/" target="_blank" rel="noopener noreferrer" class="button button-secondary">
              LinkedIn
              <ArrowUpRight :size="18" aria-hidden="true" />
            </a>
          </div>

          <dl class="hero-facts">
            <div>
              <dt><BriefcaseBusiness :size="17" aria-hidden="true" /> Atuação</dt>
              <dd>TadsBR</dd>
            </div>
            <div>
              <dt><GraduationCap :size="17" aria-hidden="true" /> Formação</dt>
              <dd>Engenharia de Software · UNIFIO</dd>
            </div>
            <div>
              <dt><Target :size="17" aria-hidden="true" /> Objetivo</dt>
              <dd>Desenvolvedor de Software Júnior</dd>
            </div>
          </dl>
        </div>
      </header>

      <section id="sobre" class="section section-light">
        <div class="site-container about-grid">
          <div>
            <p class="section-label">01 · Sobre</p>
            <h2>Pronto para o próximo desafio.</h2>
          </div>
          <div class="about-copy">
            <p>
              Sou estudante de Engenharia de Software na UNIFIO e Estagiário Full Stack na TadsBR. Já atuo em projetos reais, colaborando com desenvolvimento de APIs, interfaces web, regras de negócio, testes e homologação.
            </p>
            <p>
              Busco uma oportunidade como Desenvolvedor de Software Júnior para ampliar essa experiência, contribuir com uma equipe de engenharia e continuar evoluindo em backend, arquitetura e desenvolvimento full stack.
            </p>
            <div class="about-principles" aria-label="Princípios de trabalho">
              <span>APIs e backend</span>
              <span>Trabalho em equipe</span>
              <span>Qualidade de código</span>
            </div>
          </div>
        </div>
      </section>

      <section id="experiencia" class="section section-ink">
        <div class="site-container">
          <div class="section-heading section-heading-wide">
            <div>
              <p class="section-label">02 · Experiência</p>
              <h2>Experiência prática em produtos reais.</h2>
            </div>
            <p>Vivência profissional com entregas, colaboração em equipe e validação cuidadosa antes de cada publicação.</p>
          </div>

          <article class="experience-row">
            <div class="experience-date">Jan 2026 — atual</div>
            <div>
              <p class="experience-company">TadsBR Softwares</p>
              <h3>Estagiário Full Stack</h3>
            </div>
            <ul>
              <li>Desenvolvimento e integração de APIs REST com C# e Java.</li>
              <li>Interfaces web reativas com Nuxt e Blazor, além de aplicações com .NET MAUI.</li>
              <li>Implementação de regras de negócio, testes em ambiente de homologação e práticas de segurança.</li>
              <li>Participação em produtos como PDV web, encarte digital e sistemas internos para clientes.</li>
            </ul>
          </article>
        </div>
      </section>

      <section id="stack" class="section section-light">
        <div class="site-container">
          <div class="section-heading">
            <div>
              <p class="section-label">03 · Stack</p>
              <h2>Competências para contribuir desde o primeiro dia.</h2>
            </div>
          </div>

          <div class="stack-grid">
            <article v-for="group in stack" :key="group.category" class="stack-group">
              <component :is="group.icon" :size="25" aria-hidden="true" />
              <h3>{{ group.category }}</h3>
              <ul>
                <li v-for="item in group.items" :key="item">{{ item }}</li>
              </ul>
            </article>
          </div>

          <div class="ai-note">
            <Bot :size="24" aria-hidden="true" />
            <p><strong>IA no fluxo de engenharia.</strong> Uso agentes e assistentes de código para acelerar pesquisa, implementação e revisão, mantendo segurança, testes e decisões técnicas sob responsabilidade humana.</p>
          </div>
        </div>
      </section>

      <section id="projetos" class="section section-soft">
        <div class="site-container">
          <div class="section-heading section-heading-wide">
            <div>
              <p class="section-label">04 · Projetos</p>
              <h2>Projetos que demonstram como eu trabalho.</h2>
            </div>
            <a href="https://github.com/LucasOliveira09?tab=repositories" target="_blank" rel="noopener noreferrer" class="text-link">
              Ver todos no GitHub
              <ArrowUpRight :size="17" aria-hidden="true" />
            </a>
          </div>

          <div class="projects-grid">
            <article v-for="(project, index) in projects" :key="project.title" class="project-card">
              <div class="project-topline">
                <span class="project-number">0{{ index + 1 }}</span>
                <span class="project-eyebrow">{{ project.eyebrow }}</span>
              </div>
              <h3>{{ project.title }}</h3>
              <p>{{ project.description }}</p>
              <ul class="project-tags" :aria-label="`Tecnologias do projeto ${project.title}`">
                <li v-for="tag in project.tags" :key="tag">{{ tag }}</li>
              </ul>
              <div v-if="project.links.length" class="project-links">
                <a v-for="link in project.links" :key="link.url" :href="link.url" target="_blank" rel="noopener noreferrer">
                  <component :is="link.icon" :size="16" aria-hidden="true" />
                  {{ link.label }}
                </a>
              </div>
              <span v-else class="project-private">Projeto em evolução</span>
            </article>
          </div>
        </div>
      </section>

      <section id="contato" class="contact-band">
        <div class="site-container contact-inner">
          <div>
            <p class="section-label">05 · Contato</p>
            <h2>Estou aberto a novas oportunidades em desenvolvimento de software.</h2>
          </div>
          <div class="contact-actions">
            <a href="mailto:lucasleiteoliveira09@gmail.com" class="button button-primary">
              <Mail :size="18" aria-hidden="true" />
              Falar sobre uma oportunidade
            </a>
            <a href="https://github.com/LucasOliveira09" target="_blank" rel="noopener noreferrer" class="icon-link" aria-label="GitHub de Lucas Oliveira">
              <Github :size="22" aria-hidden="true" />
            </a>
            <a href="https://www.linkedin.com/in/lucas-oliveira09/" target="_blank" rel="noopener noreferrer" class="icon-link" aria-label="LinkedIn de Lucas Oliveira">
              <Linkedin :size="22" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="site-container footer-inner">
        <span>Lucas Oliveira · {{ currentYear }}</span>
        <span>Desenvolvido com Nuxt e atenção aos detalhes.</span>
      </div>
    </footer>
  </div>
</template>
