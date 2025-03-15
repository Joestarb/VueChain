<template>
  <div class="tradingview-widget-container">
    <div ref="widgetRef"></div> <!-- Asegúrate de que este div tiene un ref para acceder a él -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onUnmounted, defineProps } from 'vue';

// Props recibidos del componente padre (Dashboard)
const { symbol } = defineProps({
  symbol: {
    type: String,
    required: true
  }
})

let scriptLibrary: HTMLScriptElement | null = null
const widgetRef = ref<HTMLDivElement | null>(null)

const loadWidget = (symbol: string) => {
  // Verificar si el ref widgetRef está correctamente asignado
  if (widgetRef.value) {
    new window.TradingView.widget({
      width: '100%',
      height: 600,
      symbol: symbol,
      interval: 'D',
      timezone: 'America/Mexico_City',
      theme: 'light',
      style: '1',
      locale: 'es',
      enable_publishing: false,
      allow_symbol_change: true,
      container_id: widgetRef.value.id // Usamos el ref para asignar el ID correctamente
    })
  } else {
    console.error("El contenedor widgetRef no está disponible");
  }
}

onMounted(() => {
  if (widgetRef.value) {
    // Asignamos el ID al contenedor después de que esté montado
    widgetRef.value.id = 'tradingview-widget-container'; // Asignamos un ID único al contenedor

    scriptLibrary = document.createElement('script')
    scriptLibrary.src = 'https://s3.tradingview.com/tv.js'
    scriptLibrary.async = true
    scriptLibrary.onload = () => loadWidget(symbol)

    document.body.appendChild(scriptLibrary)
  }
})

onUnmounted(() => {
  if (scriptLibrary) {
    document.body.removeChild(scriptLibrary)
  }
})
</script>

<style scoped>
.tradingview-widget-container {
  width: 100%;
}
</style>
