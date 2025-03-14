<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <aside class="w-64 bg-gray-800 text-white p-5 flex flex-col">
      <h2 class="text-2xl font-bold mb-6">Dashboard</h2>
      <nav class="flex-1">
        <ul>
          <li class="mb-4">
            <RouterLink to="/home" class="flex items-center p-3 rounded-lg hover:bg-gray-700">
              <span class="material-icons mr-2"></span> Inicio
            </RouterLink>
          </li>
          <li class="mb-4">
            <RouterLink to="/profile" class="flex items-center p-3 rounded-lg hover:bg-gray-700">
              <span class="material-icons mr-2"></span> Perfil
            </RouterLink>
          </li>
          <li class="mb-4">
            <RouterLink to="/settings" class="flex items-center p-3 rounded-lg hover:bg-gray-700">
              <span class="material-icons mr-2"></span> Configuración
            </RouterLink>
          </li>
        </ul>
      </nav>
      <ButtonComponent @click="logout" title="Cerrar Sesión" own-style="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg w-full" />
    </aside>

    <!-- Main Content -->
    <div class="flex-1 p-6">
      <h2 class="text-3xl font-bold mb-4">Resumen de Mercado</h2>

      <div v-if="loading" class="text-center text-gray-500">Cargando datos...</div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="text-xl font-bold mb-2">Bolsa de Valores</h3>
          <pre class="text-gray-700">{{ stockData }}</pre>
        </div>

        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="text-xl font-bold mb-2">Criptomonedas</h3>
          <pre class="text-gray-700">{{ cryptoData }}</pre>
        </div>

        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="text-xl font-bold mb-2">Empresas</h3>
          <pre class="text-gray-700">{{ companies }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { tradingService } from '@/services/apiService.ts';
import { useTokenStore } from '@/stores/TokenStore.ts';
import { useAuthStore } from '@/features/authSlice.ts';
import ButtonComponent from '@/components/common/ButtonComponent.vue';
import { useRouter } from 'vue-router';

const tokenStore = useTokenStore();
const authStore = useAuthStore();
const navigate = useRouter();

const loading = ref(true);
const stockData = ref(null);
const cryptoData = ref(null);
const companies = ref(null);

const logout = async () => {
  try {
    await authStore.logout(tokenStore.getToken().token);
    tokenStore.removeToken();
    navigate.push('/');
  } catch (error) {
    console.error("Error al cerrar sesión", error);
  }
};

// Cargar datos de TradingView al montar el componente
onMounted(async () => {
  try {
    stockData.value = await tradingService.getStockData();
    cryptoData.value = await tradingService.getCryptoData();
    companies.value = await tradingService.getCompanies();
  } catch (error) {
    console.error("Error al obtener datos de mercado", error);
  } finally {
    loading.value = false;
  }
});
</script>
