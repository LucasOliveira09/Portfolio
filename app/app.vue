<script setup>
import { computed } from 'vue'
import { useRequestURL } from '#imports'
import NoShortsVideosApp from '~/components/NoShortsVideosApp.vue'

const url = useRequestURL()

// Essa lógica faz o roteamento nativo! 
// Se o domínio tiver 'noshortsvideos' ou a url local tiver '/noshortsvideos', renderizamos a extensão.
const isExtension = computed(() => {
  return url.hostname.includes('onfocus') || url.pathname.includes('/noshortsvideos')
})
</script>

<template>
  <div>
    <!-- Se for o subdomínio da extensão, renderiza a extensão (sem chamar o Vue Router principal) -->
    <NoShortsVideosApp v-if="isExtension" />
    
    <!-- Se for o domínio principal, carrega as páginas normais do portfólio via Vue Router -->
    <NuxtPage v-else />
  </div>
</template>
