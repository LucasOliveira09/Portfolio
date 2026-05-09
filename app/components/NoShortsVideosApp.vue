<script setup>
import { ref } from 'vue'
import { useHead, useFetch } from '#imports'

useHead({
  title: 'OnFocus | Estude sem distrações',
  meta: [
    { name: 'description', content: 'Extensão definitiva para Chrome que bloqueia Shorts, Ads e sites viciantes para você focar no que importa.' }
  ],
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap' }
  ]
})

const name = ref('')
const amount = ref('')
const email = ref('')
const loading = ref(false)
const qrCodeBase64 = ref('')
const qrCodeText = ref('')
const copied = ref(false)
const errorMsg = ref('')
const showPrivacy = ref(false)

const setAmount = (val) => {
  amount.value = val
}

const generatePix = async () => {
  if (!name.value || !amount.value || !email.value) {
    errorMsg.value = 'Preencha todos os campos obrigatórios.'
    return
  }
  errorMsg.value = ''
  loading.value = true
  try {
    const res = await $fetch('/api/pix/create', {
      method: 'POST',
      body: { 
        name: name.value, 
        amount: Number(amount.value),
        email: email.value
      }
    })
    if (res && res.qr_code) {
      qrCodeBase64.value = res.qr_code_base64
      qrCodeText.value = res.qr_code
    }
  } catch (err) {
    errorMsg.value = err?.data?.statusMessage || 'Erro ao gerar o PIX. Verifique os dados.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const copyPix = () => {
  if (!qrCodeText.value) return
  navigator.clipboard.writeText(qrCodeText.value)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}

// Busca a lista de doações aprovadas do backend
const { data: donations } = await useFetch('/api/donations/list')
</script>

<template>
  <div class="ns-page bg-[#020617] text-[#f8fafc] min-h-screen font-['Outfit'] relative overflow-x-hidden selection:bg-indigo-500/30">
    <!-- Efeito de Fundo -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>
    
    <!-- Navbar -->
    <nav class="fixed top-0 left-0 right-0 z-[100] bg-[#020617]/70 backdrop-blur-xl border-b border-white/10">
      <div class="max-w-6xl mx-auto px-6 h-20 flex justify-between items-center">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.3)]">
            <span class="text-white font-bold text-xl">O</span>
          </div>
          <span class="text-xl font-bold tracking-tight">OnFocus</span>
        </div>
        <div class="hidden md:flex items-center gap-6">
          <a href="#features" class="text-slate-400 hover:text-white font-medium transition-colors">Como funciona</a>
          <a href="#donate" class="text-slate-400 hover:text-white font-medium transition-colors">Apoiar Projeto</a>
          <a href="https://github.com/LucasOliveira09/NoShortVideos" target="_blank" class="px-5 py-2 rounded-lg border border-white/10 text-white hover:bg-white/5 transition-colors text-sm font-medium">GitHub</a>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <header class="pt-40 pb-20 px-6 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div class="flex flex-col gap-6 text-center lg:text-left items-center lg:items-start relative z-10">
        <div class="inline-block px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-sm font-medium text-indigo-400">
          ✨ Rebrand: OnFocus v1.1.0
        </div>
        <h1 class="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight">
          Domine sua atenção. <br>
          <span class="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">Sem distrações nos estudos.</span>
        </h1>
        <p class="text-lg text-slate-400 max-w-lg">
          O OnFocus não apenas oculta Shorts e Reels, ele cria um ambiente blindado para sua produtividade com bloqueio de sites e anúncios.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 mt-4">
          <a href="https://github.com/LucasOliveira09/NoShortVideos" target="_blank" class="inline-flex items-center justify-center px-7 py-3.5 bg-indigo-600 text-white font-bold rounded-xl shadow-[0_4px_20px_rgba(99,102,241,0.4)] hover:bg-indigo-700 hover:-translate-y-0.5 transition-all">
            Instalar OnFocus
          </a>
          <a href="#features" class="inline-flex items-center justify-center px-7 py-3.5 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 hover:-translate-y-0.5 transition-all">
            Saber mais
          </a>
        </div>
      </div>
      
      <!-- Mockup Visual -->
      <div class="perspective-1000 relative z-10">
        <div class="mockup-card glass-card p-6 shadow-2xl shadow-black/50">
          <div class="flex items-center gap-4 mb-6 pb-4 border-b border-white/10">
            <div class="flex gap-1.5">
              <span class="w-3 h-3 rounded-full bg-red-500"></span>
              <span class="w-3 h-3 rounded-full bg-yellow-400"></span>
              <span class="w-3 h-3 rounded-full bg-green-500"></span>
            </div>
            <div class="text-sm text-slate-400 font-mono">dashboard.onfocus</div>
          </div>
          <div class="bg-indigo-600/10 border border-dashed border-indigo-500/50 rounded-2xl p-10 text-center flex flex-col items-center">
            <div class="w-16 h-16 bg-indigo-600 rounded-2xl mb-4 flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(99,102,241,0.3)]">🎯</div>
            <p class="font-bold text-lg mb-1">Modo Foco Ativo</p>
            <p class="text-indigo-300">Sua mente no controle. 🚀</p>
          </div>
        </div>
      </div>
    </header>

    <!-- Features -->
    <section id="features" class="max-w-6xl mx-auto py-24 px-6 relative z-10">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold mb-4">Foco Radical para Estudantes</h2>
        <p class="text-slate-400 text-lg">Bloqueie o que te tira o sono e foque no que te faz crescer.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="glass-card p-10 hover:-translate-y-2 transition-transform duration-300">
          <div class="text-4xl mb-6">🚫</div>
          <h3 class="text-2xl font-bold mb-3">Bloqueio de Sites</h3>
          <p class="text-slate-400 leading-relaxed">Crie sua própria lista negra. Redes sociais e sites de notícias ficam inacessíveis durante seu tempo de foco.</p>
        </div>
        <div class="glass-card p-10 hover:-translate-y-2 transition-transform duration-300">
          <div class="text-4xl mb-6">🛡️</div>
          <h3 class="text-2xl font-bold mb-3">Zero Anúncios</h3>
          <p class="text-slate-400 leading-relaxed">Remova banners e vídeos patrocinados que tentam roubar sua atenção. Um navegador limpo e rápido.</p>
        </div>
        <div class="glass-card p-10 hover:-translate-y-2 transition-transform duration-300">
          <div class="text-4xl mb-6">⏳</div>
          <h3 class="text-2xl font-bold mb-3">Timer com Desafio</h3>
          <p class="text-slate-400 leading-relaxed">Não consegue parar? O timer só destrava se você digitar uma frase motivacional. Fricção positiva real.</p>
        </div>
      </div>
    </section>

    <!-- Donation Section & Mural -->
    <section id="donate" class="max-w-6xl mx-auto py-24 px-6 relative z-10">
      <div class="flex flex-col md:flex-row gap-8 items-stretch">
        
        <!-- Formulário Pix -->
        <div class="flex-1 flex flex-col items-center text-center p-8 md:p-12 border border-indigo-500/20 rounded-3xl bg-black/20 backdrop-blur-md shadow-[0_20px_40px_rgba(0,0,0,0.3),inset_0_0_40px_rgba(99,102,241,0.05)]">
          <div class="mb-8">
            <h2 class="text-4xl font-bold mb-4 text-indigo-400">Apoie o OnFocus ☕</h2>
            <p class="text-slate-400 text-base leading-relaxed">Este projeto é 100% gratuito e open-source. Ajude a mantê-lo vivo!</p>
          </div>
          
          <div class="glass-card p-8 bg-black/40 w-full flex-1 flex flex-col justify-center">
            <div v-if="!qrCodeText">
              <h3 class="text-2xl font-bold mb-6">Doação via Pix</h3>
              
              <div class="flex flex-col gap-4 text-left">
                <div>
                  <label class="block text-sm font-medium text-slate-400 mb-1">Seu Nome</label>
                  <input v-model="name" type="text" placeholder="Apareça no mural" class="w-full bg-white/5 border border-white/10 rounded-lg text-white px-4 py-3 outline-none focus:border-indigo-400/50 transition-colors">
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-slate-400 mb-1">E-mail</label>
                  <input v-model="email" type="email" placeholder="seu@email.com" class="w-full bg-white/5 border border-white/10 rounded-lg text-white px-4 py-3 outline-none focus:border-indigo-400/50 transition-colors">
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-slate-400 mb-1">Valor (R$)</label>
                  <input v-model="amount" type="number" step="0.01" placeholder="Ex: 10.00" class="w-full bg-white/5 border border-white/10 rounded-lg text-white px-4 py-3 outline-none focus:border-indigo-400/50 transition-colors">
                </div>
                
                <button @click="generatePix" :disabled="loading" class="w-full mt-4 px-5 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50">
                  {{ loading ? 'Gerando...' : 'Gerar Pix' }}
                </button>
              </div>
            </div>

            <div v-else class="flex flex-col items-center">
              <div class="bg-white p-2 rounded-xl mb-6 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
                <img :src="'data:image/png;base64,' + qrCodeBase64" alt="QR Code Pix" class="w-48 h-48">
              </div>
              <button @click="copyPix" class="w-full px-5 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors">
                {{ copied ? 'Copiado! ✅' : 'Copiar Chave' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Mural de Apoiadores -->
        <div class="flex-1 flex flex-col p-8 md:p-12 border border-white/10 rounded-3xl bg-black/20 backdrop-blur-md">
          <h3 class="text-3xl font-bold mb-8 pb-6 border-b border-white/10 flex items-center gap-3">
            🏆 Apoiadores
          </h3>
          
          <div class="flex-1 overflow-y-auto pr-2 min-h-[300px] max-h-[500px] custom-scrollbar">
            <div v-if="!donations || donations.length === 0" class="flex flex-col items-center justify-center h-full text-slate-500 py-10">
              <p>Nenhuma doação ainda. Seja o primeiro! 🚀</p>
            </div>
            <div v-else class="flex flex-col gap-3">
              <div v-for="donation in donations" :key="donation.id" class="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl">
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                    {{ donation.name.charAt(0).toUpperCase() }}
                  </div>
                  <p class="font-bold text-white">{{ donation.name }}</p>
                </div>
                <div class="font-mono text-indigo-400 font-bold">R$ {{ donation.amount.toFixed(2) }}</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-white/10 py-10 mt-10 relative z-10">
      <div class="max-w-6xl mx-auto px-6 flex flex-col items-center gap-4 text-center">
        <div class="flex items-center gap-3 font-bold text-xl">
          <div class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-sm">O</div>
          <span>OnFocus</span>
        </div>
        <p class="text-slate-400">Desenvolvido por <a href="https://github.com/LucasOliveira09" target="_blank" class="text-indigo-400 hover:text-indigo-300">LucasOliveira09</a>.</p>
        <div class="flex gap-6 mt-2">
          <button @click="showPrivacy = true" class="text-xs text-slate-500 hover:text-indigo-400 transition-colors">Política de Privacidade</button>
          <a href="https://github.com/LucasOliveira09/NoShortVideos" target="_blank" class="text-xs text-slate-500 hover:text-indigo-400 transition-colors">GitHub</a>
        </div>
        <p class="text-xs text-slate-600 mt-2">MIT License © 2026</p>
      </div>
    </footer>

    <!-- Privacy Policy Modal -->
    <Transition name="fade">
      <div v-if="showPrivacy" class="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-[#020617]/90 backdrop-blur-sm">
        <div class="glass-card w-full max-w-2xl max-h-[80vh] overflow-y-auto p-8 relative shadow-2xl border-indigo-500/30">
          <button @click="showPrivacy = false" class="absolute top-4 right-4 text-slate-400 hover:text-white text-2xl">×</button>
          <div class="prose prose-invert max-w-none">
            <h2 class="text-2xl font-bold text-indigo-400 mb-6">Política de Privacidade - OnFocus</h2>
            <div class="space-y-4 text-slate-300 text-sm leading-relaxed">
              <p><strong>Última atualização: 09 de Maio de 2026</strong></p>
              <p>Esta Política de Privacidade explica como o <strong>OnFocus</strong> ("nós", "nosso" ou "a extensão") lida com as informações quando você utiliza nossa extensão de navegador.</p>
              
              <h3 class="text-lg font-bold text-white mt-6">1. Coleta e Uso de Informações</h3>
              <p>O OnFocus foi projetado com a privacidade como prioridade.</p>
              <ul class="list-disc pl-5 space-y-2">
                <li><strong>Sem Coleta de Dados Pessoais:</strong> Não coletamos, armazenamos ou transmitimos qualquer informação de identificação pessoal (como nome, e-mail ou histórico de navegação) para servidores externos.</li>
                <li><strong>Armazenamento Local:</strong> A extensão armazena suas preferências (como timers e domínios bloqueados) localmente no seu navegador usando a API <code>chrome.storage.sync</code>. Esses dados são usados apenas para sincronizar suas configurações entre seus próprios dispositivos Chrome e nunca são compartilhados conosco.</li>
                <li><strong>Regras de Bloqueio:</strong> Os domínios que você escolhe bloquear são processados localmente pelo navegador. Não rastreamos quais sites você visita ou bloqueia.</li>
              </ul>

              <h3 class="text-lg font-bold text-white mt-6">2. Segurança de Dados</h3>
              <p>Suas configurações permanecem dentro do ecossistema do Google Chrome. Contamos com a segurança nativa do Chrome para proteger seus dados sincronizados.</p>

              <h3 class="text-lg font-bold text-white mt-6">3. Serviços de Terceiros</h3>
              <p>O OnFocus não integra serviços de análise ou rastreamento de terceiros. Não vendemos ou compartilhamos nenhum dado de usuário.</p>

              <h3 class="text-lg font-bold text-white mt-6">4. Divulgação de Permissões</h3>
              <ul class="list-disc pl-5 space-y-2">
                <li><code>storage</code>: Para salvar suas configurações e lista negra.</li>
                <li><code>declarativeNetRequest</code>: Para bloquear anúncios e distrações.</li>
                <li><code>alarms</code>: Para gerenciar o timer de foco em segundo plano.</li>
              </ul>

              <h3 class="text-lg font-bold text-white mt-6">5. Contato</h3>
              <p>Se tiver dúvidas, entre em contato através do painel de suporte da Chrome Web Store.</p>
            </div>
          </div>
          <button @click="showPrivacy = false" class="w-full mt-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors">Fechar</button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.ns-page {
  font-family: 'Outfit', sans-serif;
}

.glass-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 24px;
}

.perspective-1000 {
  perspective: 1000px;
}

.mockup-card {
  transform: rotateY(-10deg) rotateX(5deg);
  transition: transform 0.5s ease;
}

.mockup-card:hover {
  transform: rotateY(-5deg) rotateX(2deg) translateY(-10px);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(99, 102, 241, 0.5);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
