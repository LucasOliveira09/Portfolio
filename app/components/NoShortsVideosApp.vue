<script setup>
import { ref } from 'vue'
import { useHead, useFetch } from '#imports'

useHead({
  title: 'NoShortVideos | Recupere seu foco',
  meta: [
    { name: 'description', content: 'Extensão para Chrome que oculta vídeos curtos no YouTube, Instagram e TikTok para você focar no que importa.' }
  ],
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap' }
  ]
})

const name = ref('')
const amount = ref('')
const loading = ref(false)
const qrCodeBase64 = ref('')
const qrCodeText = ref('')
const copied = ref(false)
const errorMsg = ref('')

const setAmount = (val) => {
  amount.value = val
}

const generatePix = async () => {
  if (!name.value || !amount.value) {
    errorMsg.value = 'Preencha o nome e o valor.'
    return
  }
  errorMsg.value = ''
  loading.value = true
  try {
    const res = await $fetch('/api/pix/create', {
      method: 'POST',
      body: { name: name.value, amount: Number(amount.value) }
    })
    if (res && res.qr_code) {
      qrCodeBase64.value = res.qr_code_base64
      qrCodeText.value = res.qr_code
    }
  } catch (err) {
    errorMsg.value = 'Erro ao gerar o PIX. Verifique os dados ou tente novamente mais tarde.'
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
  <div class="ns-page bg-[#020617] text-[#f8fafc] min-h-screen font-['Outfit'] relative overflow-x-hidden selection:bg-green-400/30">
    <!-- Efeito de Fundo -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-green-400/10 rounded-full blur-[100px] pointer-events-none"></div>
    
    <!-- Navbar -->
    <nav class="fixed top-0 left-0 right-0 z-[100] bg-[#020617]/70 backdrop-blur-xl border-b border-white/10">
      <div class="max-w-6xl mx-auto px-6 h-20 flex justify-between items-center">
        <div class="flex items-center gap-3">
          <img src="/icons/icon.png" alt="NoShortVideos Logo" class="w-10 h-10 rounded-xl shadow-[0_0_15px_rgba(74,222,128,0.3)]">
          <span class="text-xl font-bold tracking-tight">NoShortVideos</span>
        </div>
        <div class="hidden md:flex items-center gap-6">
          <a href="#features" class="text-slate-400 hover:text-white font-medium transition-colors">Como funciona</a>
          <a href="#donate" class="text-slate-400 hover:text-white font-medium transition-colors">Apoiar Projeto</a>
          <a href="https://github.com/LucasOliveira09/NoShortVideos" target="_blank" class="px-5 py-2 rounded-lg border border-white/10 text-white hover:bg-white/5 transition-colors text-sm font-medium">Ver no GitHub</a>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <header class="pt-40 pb-20 px-6 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div class="flex flex-col gap-6 text-center lg:text-left items-center lg:items-start relative z-10">
        <div class="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-slate-400">
          🔥 Versão Alpha Disponível
        </div>
        <h1 class="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight">
          Recupere seu tempo. <br>
          <span class="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Diga adeus ao vício do scroll.</span>
        </h1>
        <p class="text-lg text-slate-400 max-w-lg">
          Uma extensão inteligente que oculta apenas os vídeos curtos (Shorts, Reels, TikTok) mantendo todo o resto da plataforma intacto. Foque no que importa.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 mt-4">
          <a href="https://github.com/LucasOliveira09/NoShortVideos#%EF%B8%8F-como-instalar-e-testar" target="_blank" class="inline-flex items-center justify-center px-7 py-3.5 bg-green-400 text-slate-950 font-bold rounded-xl shadow-[0_4px_20px_rgba(74,222,128,0.4)] hover:bg-green-500 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(74,222,128,0.5)] transition-all">
            Instalar no Chrome (Dev)
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
            <div class="text-sm text-slate-400 font-mono">youtube.com</div>
          </div>
          <div class="opacity-30 grid grid-cols-3 gap-4 mb-6">
            <div class="w-full aspect-video bg-white/5 rounded-lg"></div>
            <div class="w-full aspect-video bg-white/5 rounded-lg"></div>
            <div class="w-full aspect-video bg-white/5 rounded-lg"></div>
          </div>
          <div class="bg-green-400/10 border border-dashed border-green-400 rounded-2xl p-10 text-center flex flex-col items-center">
            <img src="/icons/icon.png" alt="Blocked" class="w-16 h-16 rounded-2xl mb-4 shadow-[0_0_20px_rgba(74,222,128,0.3)]">
            <p class="font-bold text-lg mb-1">Vídeos Curtos Ocultados</p>
            <p class="text-green-300">Seu foco agradece. 🚀</p>
          </div>
        </div>
      </div>
    </header>

    <!-- Features -->
    <section id="features" class="max-w-6xl mx-auto py-24 px-6 relative z-10">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold mb-4">O seu aliado contra a procrastinação</h2>
        <p class="text-slate-400 text-lg">Desenvolvido para agir por debaixo dos panos, sem quebrar sua experiência.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="glass-card p-10 hover:-translate-y-2 transition-transform duration-300">
          <div class="text-4xl mb-6">▶️</div>
          <h3 class="text-2xl font-bold mb-3">YouTube Limpo</h3>
          <p class="text-slate-400 leading-relaxed">A prateleira de Shorts e os links na barra lateral somem instantaneamente. Assista apenas o que você procurou.</p>
        </div>
        <div class="glass-card p-10 hover:-translate-y-2 transition-transform duration-300">
          <div class="text-4xl mb-6">📸</div>
          <h3 class="text-2xl font-bold mb-3">Instagram sem Reels</h3>
          <p class="text-slate-400 leading-relaxed">Feito para você entrar, responder suas mensagens, ver o feed principal e sair, sem cair na armadilha do Reels.</p>
        </div>
        <div class="glass-card p-10 hover:-translate-y-2 transition-transform duration-300">
          <div class="text-4xl mb-6">🎵</div>
          <h3 class="text-2xl font-bold mb-3">Fuga do TikTok</h3>
          <p class="text-slate-400 leading-relaxed">Nós ocultamos os feeds viciantes e o "scroll infinito". Recupere a sua dopamina natural.</p>
        </div>
      </div>
    </section>

    <!-- Donation Section & Mural -->
    <section id="donate" class="max-w-6xl mx-auto py-24 px-6 relative z-10">
      <div class="flex flex-col md:flex-row gap-8 items-stretch">
        
        <!-- Formulário Pix -->
        <div class="flex-1 flex flex-col items-center text-center p-8 md:p-12 border border-green-400/20 rounded-3xl bg-black/20 backdrop-blur-md shadow-[0_20px_40px_rgba(0,0,0,0.3),inset_0_0_40px_rgba(74,222,128,0.05)]">
          <div class="mb-8">
            <h2 class="text-4xl font-bold mb-4 text-green-400">Apoie o Projeto ☕</h2>
            <p class="text-slate-400 text-base leading-relaxed">Este projeto é 100% gratuito. Ajude a mantê-lo fazendo uma doação de qualquer valor e faça parte do nosso mural!</p>
          </div>
          
          <div class="glass-card p-8 bg-black/40 w-full flex-1 flex flex-col justify-center">
            <div v-if="!qrCodeText">
              <div class="text-4xl mb-4">💠</div>
              <h3 class="text-2xl font-bold mb-6">Doação via Pix</h3>
              
              <div class="flex flex-col gap-4 text-left">
                <div>
                  <label class="block text-sm font-medium text-slate-400 mb-1">Seu Nome (ou Nickname)</label>
                  <input v-model="name" type="text" placeholder="Como quer aparecer no mural?" class="w-full bg-white/5 border border-white/10 rounded-lg text-white px-4 py-3 outline-none focus:border-green-400/50 transition-colors">
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-slate-400 mb-1">Valor da Doação (R$)</label>
                  <input v-model="amount" type="number" step="0.01" placeholder="Ex: 15.00" class="w-full bg-white/5 border border-white/10 rounded-lg text-white px-4 py-3 outline-none focus:border-green-400/50 transition-colors">
                  
                  <div class="flex flex-wrap gap-2 mt-3">
                    <button @click="setAmount(5)" class="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-slate-400 hover:bg-white/10 hover:text-white transition-colors">R$ 5</button>
                    <button @click="setAmount(10)" class="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-slate-400 hover:bg-white/10 hover:text-white transition-colors">R$ 10</button>
                    <button @click="setAmount(20)" class="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-slate-400 hover:bg-white/10 hover:text-white transition-colors">R$ 20</button>
                  </div>
                </div>
                
                <p v-if="errorMsg" class="text-red-400 text-sm mt-2">{{ errorMsg }}</p>
                
                <button @click="generatePix" :disabled="loading" class="w-full mt-4 px-5 py-3 bg-green-400 text-slate-950 font-bold rounded-lg hover:bg-green-500 transition-colors disabled:opacity-50 flex justify-center items-center gap-2">
                  <span v-if="loading" class="w-5 h-5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin"></span>
                  {{ loading ? 'Gerando...' : 'Gerar QR Code Pix' }}
                </button>
              </div>
            </div>

            <div v-else class="flex flex-col items-center">
              <h3 class="text-xl font-bold mb-4 text-green-400">Pix Gerado com Sucesso!</h3>
              <div class="bg-white p-2 rounded-xl mb-6 shadow-[0_0_30px_rgba(74,222,128,0.2)]">
                <img :src="'data:image/png;base64,' + qrCodeBase64" alt="QR Code Pix" class="w-48 h-48">
              </div>
              <p class="text-slate-400 text-sm mb-3">Ou copie a chave abaixo:</p>
              <div class="flex flex-col sm:flex-row gap-2 w-full">
                <input type="text" :value="qrCodeText" readonly class="flex-1 bg-white/5 border border-white/10 rounded-lg text-slate-300 px-4 py-3 font-mono text-xs outline-none">
                <button @click="copyPix" class="px-5 py-3 bg-green-400 text-slate-950 font-bold rounded-lg hover:bg-green-500 transition-colors whitespace-nowrap">
                  {{ copied ? 'Copiado! ✅' : 'Copiar Chave' }}
                </button>
              </div>
              <button @click="qrCodeText = ''; qrCodeBase64 = ''; amount = '';" class="mt-6 text-sm text-slate-500 hover:text-slate-300 transition underline">
                Fazer outra doação
              </button>
            </div>
          </div>
        </div>

        <!-- Mural de Apoiadores -->
        <div class="flex-1 flex flex-col p-8 md:p-12 border border-white/10 rounded-3xl bg-black/20 backdrop-blur-md">
          <div class="flex items-center gap-3 mb-8 pb-6 border-b border-white/10">
            <span class="text-4xl drop-shadow-[0_0_15px_rgba(250,204,21,0.4)]">🏆</span>
            <div>
              <h3 class="text-3xl font-bold">Mural de Apoiadores</h3>
              <p class="text-slate-400 text-sm mt-1">Agradecemos profundamente a todos que apoiam!</p>
            </div>
          </div>
          
          <div class="flex-1 overflow-y-auto pr-2 min-h-[300px] max-h-[500px] custom-scrollbar">
            <div v-if="!donations || donations.length === 0" class="flex flex-col items-center justify-center h-full text-slate-500 py-10">
              <span class="text-5xl mb-4 opacity-50">👻</span>
              <p class="text-lg">Nenhuma doação ainda.</p>
              <p>Seja o primeiro a aparecer no mural! 🚀</p>
            </div>
            <div v-else class="flex flex-col gap-3">
              <div v-for="donation in donations" :key="donation.id" class="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-slate-950 text-xl font-bold shadow-[0_0_15px_rgba(74,222,128,0.3)]">
                    {{ donation.name.charAt(0).toUpperCase() }}
                  </div>
                  <div>
                    <p class="font-bold text-white text-lg">{{ donation.name }}</p>
                    <p class="text-xs text-slate-400 font-mono">{{ new Date(donation.created_at).toLocaleDateString('pt-BR') }}</p>
                  </div>
                </div>
                <div class="font-mono text-green-400 font-bold bg-green-400/10 px-4 py-1.5 rounded-full text-sm border border-green-400/20">
                  R$ {{ donation.amount.toFixed(2).replace('.', ',') }}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- CTA -->
    <section class="max-w-6xl mx-auto py-24 px-6 relative z-10">
      <div class="p-16 text-center bg-gradient-to-br from-green-400/10 to-transparent rounded-3xl border border-white/5 backdrop-blur-sm">
        <h2 class="text-4xl font-bold mb-4">Pronto para hackear sua produtividade?</h2>
        <p class="text-slate-400 text-lg mb-8">Instale o NoShortVideos gratuitamente. Código 100% aberto e focado em você.</p>
        <a href="https://github.com/LucasOliveira09/NoShortVideos" target="_blank" class="inline-flex items-center justify-center px-8 py-4 bg-green-400 text-slate-950 font-bold rounded-xl shadow-[0_4px_20px_rgba(74,222,128,0.4)] hover:bg-green-500 hover:-translate-y-0.5 transition-all">
          Acessar Repositório
        </a>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-white/10 py-10 mt-10 relative z-10">
      <div class="max-w-6xl mx-auto px-6 flex flex-col items-center gap-4 text-center">
        <div class="flex items-center gap-3 font-bold text-xl">
          <img src="/icons/icon.png" alt="NoShortVideos" class="w-8 h-8 rounded-lg shadow-sm">
          <span>NoShortVideos</span>
        </div>
        <p class="text-slate-400">Desenvolvido com foco por <a href="https://github.com/LucasOliveira09" target="_blank" class="text-green-400 hover:text-green-300">LucasOliveira09</a>.</p>
        <p class="text-xs text-slate-500">MIT License © 2026</p>
      </div>
    </footer>
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

/* Scrollbar Customizada para o Mural */
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
  background: rgba(74, 222, 128, 0.5);
}
</style>
