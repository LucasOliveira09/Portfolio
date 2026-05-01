# 🚀 Lucas Oliveira | Portfolio & NoShortVideos Platform

Bem-vindo ao repositório principal do meu Portfólio Profissional e da plataforma web da extensão **NoShortVideos**. Este projeto foi construído com foco extremo em performance, design premium e escalabilidade utilizando as melhores tecnologias do ecossistema Vue.

## ✨ Características

- **Portfólio Profissional (`/`)**: Uma Single Page Application otimizada que apresenta minha experiência, stack tecnológica e projetos. Design moderno com glassmorphism e animações suaves.
- **Plataforma NoShortVideos (`/noshortsvideos`)**: A página oficial de aterrissagem da extensão NoShortVideos (bloqueadora de vídeos curtos para YouTube, Instagram e TikTok).
- **Sistema de Doação Inteligente**: 
  - Geração dinâmica de QR Code e chave Pix "Copia e Cola" via **Mercado Pago**.
  - **Mural de Apoiadores** em tempo real alimentado pelo **Supabase**.
  - Proteção de pagamentos com Webhooks nativos processados e validados via API Serverless do Nuxt.

## 🛠️ Stack Tecnológica

- **Framework**: [Nuxt 3](https://nuxt.com/) (Vue 3)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
- **Backend/Serverless**: Nuxt Nitro (Integrado nativamente com a Vercel)
- **Banco de Dados**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Pagamentos**: SDK do [Mercado Pago](https://www.mercadopago.com.br/developers)

## ⚙️ Configuração do Ambiente (Local)

### 1. Instalação
Clone o repositório e instale as dependências:
```bash
git clone https://github.com/LucasOliveira09/Portfolio.git
cd Portfolio
npm install
```

### 2. Variáveis de Ambiente
Copie o arquivo de exemplo e crie o seu `.env`:
```bash
cp .env.example .env
```
Preencha o arquivo `.env` com as suas chaves do Mercado Pago e Supabase:
```env
MERCADOPAGO_ACCESS_TOKEN="APP_USR-..."
SUPABASE_URL="https://seu-projeto.supabase.co"
SUPABASE_KEY="sua_anon_key_publica"
SUPABASE_SERVICE_KEY="sua_service_role_secreta"
NUXT_PUBLIC_SUPABASE_URL="https://seu-projeto.supabase.co"
NUXT_PUBLIC_SUPABASE_ANON_KEY="sua_anon_key_publica"
```
*(Nota: A `SUPABASE_SERVICE_KEY` é exigida pela nossa API para aprovar as doações ignorando o Row Level Security (RLS) do Supabase com total segurança direto pelo backend).*

### 3. Banco de Dados (Supabase)
No painel do seu Supabase, abra o **SQL Editor** e rode o script contido no arquivo `supabase_donations.sql` (localizado na raiz deste projeto). Ele criará a tabela e as políticas de segurança (RLS) automáticas.

### 4. Executando o Servidor
```bash
npm run dev
```
Acesse `http://localhost:3000` para ver o Portfólio e `http://localhost:3000/noshortsvideos` para ver a página da extensão funcionando.

## 🚢 Deploy (Vercel)

Este projeto está pronto para ir para a Vercel através do Nitro preset pré-configurado no Nuxt.

1. Conecte seu repositório no painel da Vercel.
2. Configure **todas** as variáveis de ambiente do seu `.env` diretamente no painel da Vercel.
3. Para ativar a arquitetura de **Múltiplos Subdomínios**:
   - Adicione os domínios no painel (ex: `lubiagency.com.br` e `noshortsvideos.lubiagency.com.br`).
   - Configure um *Rewrite* no `vercel.json` ou pelas configurações de domínio da Vercel apontando o domínio da extensão para a rota interna `/noshortsvideos`.
4. **Webhook do Mercado Pago**: Vá no painel de integrações do Mercado Pago (Sua Aplicação > Webhooks) e adicione a URL: `https://<seu-dominio-da-vercel>/api/pix/webhook` selecionando o evento "Pagamentos". 

## 🤝 Contribuição
Sugestões e Pull Requests são sempre bem-vindos. Este é um projeto focado em aprendizado, evolução constante e muito código limpo.

---
*Desenvolvido com dedicação e foco por [LucasOliveira09](https://github.com/LucasOliveira09).*
