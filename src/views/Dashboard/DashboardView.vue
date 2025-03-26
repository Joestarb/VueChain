<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Main Content -->
    <div class="flex-1 p-8 overflow-auto">
      <h2 class="text-4xl font-bold text-gray-800 mb-6">Resumen de Mercado</h2>

      <!-- Estado de carga o error -->
      <div v-if="tradingStore.loading" class="text-center text-gray-500 text-lg">Cargando datos...</div>
      <div v-if="tradingStore.error" class="text-center text-red-500 text-lg">{{ tradingStore.error }}</div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Bolsa de Valores -->
        <div class="col-span-full md:col-span-3 lg:col-span-3 bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
          <h3 class="text-2xl font-semibold text-gray-700 mb-4">Bolsa de Valores</h3>
          <TradingViewWidget :symbol="'NASDAQ:AAPL'" />
        </div>

        <!-- Criptomonedas -->
        <div class="col-span-full">
          <h2 class="text-4xl font-bold text-gray-900 mb-8 text-center transform hover:scale-105 transition-transform duration-300">
            📈 Criptomonedas en Tiempo Real
          </h2>
        </div>
        <div class="bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl shadow-2xl border border-gray-100  w-[170vh] hover:shadow-3xl transition-shadow duration-300">
          <div class="flex flex-col md:flex-row items-center justify-between mb-6">
            <h3 class="text-3xl font-semibold text-gray-800 mb-4 md:mb-0 flex items-center">
              🔍 Mercado de Criptomonedas
            </h3>
            <span class="text-gray-600 text-sm bg-gray-100 px-3 py-1 rounded-full">Fuente: TradingView</span>
          </div>
          <div class="overflow-hidden rounded-xl border border-gray-200 shadow-lg">
            <iframe
              src="https://s.tradingview.com/embed-widget/crypto-mkt-screener/?locale=es"
              height="500"
              frameborder="0"
              class="rounded-lg w-full"
              style="min-height: 500px;"
            ></iframe>
          </div>
        </div>

        <!-- Empresas -->
        <div class="col-span-full">
          <h2 class="text-3xl font-bold text-gray-800 my-6">Empresas</h2>
        </div>
        <div
          v-for="widget in tradingStore.widgetsEmpresas"
          :key="widget.symbol"
          class="bg-white p-6 rounded-2xl shadow-lg border border-gray-200"
        >
          <h3 class="text-xl font-semibold text-gray-700 mb-4">{{ widget.symbol }}</h3>
          <iframe
            :src="`https://s.tradingview.com/embed-widget/symbol-info/?symbol=${widget.symbol}`"
            :height="widget.height"
            frameborder="0"
            class="rounded-lg w-full"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useTradingStore } from '@/stores/useTradingStore.ts';
import { useTokenStore } from '@/stores/TokenStore.ts';
import { useAuthStore } from '@/features/authSlice.ts';
import TradingViewWidget from '@/components/TradingViewWidget.vue';

const tradingStore = useTradingStore();
const tokenStore = useTokenStore();
const authStore = useAuthStore();

// Cargar datos al montar el componente
onMounted(() => {
  tradingStore.fetchTradingData();
  tradingStore.fetchCryptoData();
  tradingStore.fetchCompaniesData();
  tradingStore.fetchWidgets();
});
</script>