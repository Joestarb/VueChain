<template>
  <div class="p-8 bg-gray-100 min-h-screen">
    <h2 class="text-4xl font-bold text-gray-800 mb-6 text-center">Vendedores P2P en Binance</h2>

    <div class="mb-6 flex justify-center">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Buscar por nombre o precio..."
        class="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    <div v-if="binanceStore.loading" class="text-center text-gray-500 text-lg">Cargando vendedores...</div>
    <div v-if="binanceStore.error" class="text-center text-red-500 text-lg">{{ binanceStore.error }}</div>

    <div v-if="filteredSellers.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        v-for="seller in filteredSellers"
        :key="seller.userName"
        class="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-xl"
      >
        <h3 class="text-xl font-semibold text-gray-700 mb-4">{{ getDisplayName(seller.userName) }}</h3>
        <p class="text-gray-500">Precio: {{ seller.price }} USDT</p>
        <p class="text-gray-500">Cantidad: {{ seller.quantity }}</p>

        <!-- Botón para comprar -->
        <button 
          @click="selectSeller(seller)" 
          class="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Comprar
        </button>
      </div>
    </div>
    <div v-else class="text-center text-gray-500 text-lg">No se encontraron vendedores.</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useBinanceStore } from '@/stores/binanceStore';
import { useRouter } from 'vue-router';

const binanceStore = useBinanceStore();
const router = useRouter();
const searchQuery = ref('');

// Lista de nombres aleatorios para vendedores
const firstNames = ['Carlos', 'Ana', 'Luis', 'Elena', 'Javier', 'Sofía', 'Andrés', 'Mariana', 'Ricardo', 'Valeria'];
const lastNames = ['Gómez', 'Rodríguez', 'Fernández', 'López', 'Martínez', 'Pérez', 'García', 'Torres', 'Vargas', 'Jiménez'];

// Función para generar un nombre aleatorio
const getRandomName = () => {
  const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${randomFirstName} ${randomLastName}`;
};

// Diccionario reactivo para almacenar nombres aleatorios asignados a cada usuario
const simulatedNamesMap = ref<Record<string, string>>({});

// Función para obtener un nombre visible para cada vendedor
const getDisplayName = (userName: string) => {
  if (!simulatedNamesMap.value[userName]) {
    simulatedNamesMap.value[userName] = getRandomName();
  }
  return simulatedNamesMap.value[userName];
};

// Filtrar vendedores según el nombre o el precio
const filteredSellers = computed(() => {
  if (!searchQuery.value) {
    return binanceStore.sellers;
  }
  return binanceStore.sellers.filter((seller) =>
    getDisplayName(seller.userName).toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    seller.price.toString().includes(searchQuery.value)
  );
});

// Guardar el vendedor seleccionado y redirigir a la vista de compra
const selectSeller = (seller) => {
  binanceStore.selectedSeller = seller; // Guardar en estado global
  router.push({ name: 'P2PBuy' });
};

// Cargar vendedores al iniciar
onMounted(() => {
  binanceStore.fetchP2PSellers("BTCUSDT");
});
</script>
