<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar (No modificado) -->
    <aside class="w-64 bg-gray-800 text-white p-5 flex flex-col">
      <h2 class="text-2xl font-bold mb-6">Dashboard</h2>
      <nav class="flex-1">
        <ul>
          <li class="mb-4">
            <RouterLink to="" class="flex items-center p-3 rounded-lg hover:bg-gray-700">
              <span class="material-icons mr-2"></span> Inicio
            </RouterLink>
          </li>
          <li class="mb-4">
            <RouterLink to="" class="flex items-center p-3 rounded-lg hover:bg-gray-700">
              <span class="material-icons mr-2"></span> Perfil
            </RouterLink>
          </li>
          <li class="mb-4">
            <RouterLink to="" class="flex items-center p-3 rounded-lg hover:bg-gray-700">
              <span class="material-icons mr-2"></span> Configuración
            </RouterLink>
          </li>
        </ul>
      </nav>
      <ButtonComponent
        @click="logout"
        title="Cerrar Sesión"
        own-style="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg w-full"
      />
    </aside>

    <!-- Main Content -->
    <div class="flex-1 p-8 overflow-auto">
      <h2 class="text-4xl font-bold text-gray-800 mb-6">Resumen de Mercado</h2>

      <!-- Estado de carga o error -->
      <div v-if="tradingStore.loading" class="text-center text-gray-500 text-lg">Cargando datos...</div>
      <div v-if="tradingStore.error" class="text-center text-red-500 text-lg">{{ tradingStore.error }}</div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Bolsa de Valores (Ajustado para ser más ancho) -->
        <div class="col-span-full md:col-span-3 lg:col-span-3 bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
          <h3 class="text-2xl font-semibold text-gray-700 mb-4">Bolsa de Valores</h3>
          <TradingViewWidget :symbol="'NASDAQ:AAPL'" />
        </div>

        <!-- Criptomonedas -->
        <div class="col-span-full">
          <h2 class="text-3xl font-bold text-gray-800 my-6">Criptomonedas</h2>
        </div>
        <div
          v-for="widget in tradingStore.widgetsCripto"
          :key="widget.symbol"
          class="bg-white p-6 rounded-2xl shadow-lg border border-gray-200"
        >
          <h3 class="text-xl font-semibold text-gray-700 mb-4">{{ widget.symbol }}</h3>
          <iframe
            :src="`https://s.tradingview.com/embed-widget/symbol-info/?symbol=${widget.symbol}`"
            :width="widget.width"
            :height="widget.height"
            frameborder="0"
            class="rounded-lg w-full"
          ></iframe>
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
            :width="widget.width"
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
import ButtonComponent from '@/components/common/ButtonComponent.vue';
import { useRouter } from 'vue-router';
import TradingViewWidget from '@/components/TradingViewWidget.vue';  // Asegúrate de tener el componente TradingViewWidget

const tradingStore = useTradingStore();
const tokenStore = useTokenStore();
const authStore = useAuthStore();
const navigate = useRouter();

const logout = async () => {
  try {
    await authStore.logout(tokenStore.getToken()?.token);
    tokenStore.removeToken();
    navigate.push('/');
  } catch (error) {
    console.error('Error al cerrar sesión', error);
  }
};

// Cargar datos al montar el componente
onMounted(() => {
  tradingStore.fetchTradingData();
  tradingStore.fetchCryptoData();
  tradingStore.fetchCompaniesData();
  tradingStore.fetchWidgets(); // 🔹 Se carga la lista de widgets
});
</script>

