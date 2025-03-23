<template>
  <div class="p-8 bg-gray-100 min-h-screen">
    <!-- Título -->
    <h2 class="text-4xl font-bold text-gray-800 mb-6 text-center">Realizar Compra P2P</h2>

    <!-- Formulario para simular compra -->
    <div class="bg-white p-8 rounded-xl shadow-lg max-w-6xl w-full mx-auto mb-10">
      <h3 class="text-2xl font-semibold text-gray-800 mb-4 text-center">Completa los siguientes datos</h3>
      <form @submit.prevent="simulateBuy">
        <div class="mb-4">
          <label for="sellerName" class="block text-gray-700 font-medium mb-1">Vendedor</label>
          <input
            id="sellerName"
            type="text"
            :value="sellerName"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100"
            readonly
          />
        </div>
        <div class="mb-4">
          <label for="symbol" class="block text-gray-700 font-medium mb-1">Símbolo</label>
          <input
            id="symbol"
            type="text"
            :value="symbol"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100"
            readonly
          />
        </div>
        <div class="mb-4">
          <label for="quantity" class="block text-gray-700 font-medium mb-1">Cantidad</label>
          <input
            v-model.number="quantity"
            id="quantity"
            type="number"
            step="0.0001"
            placeholder="Ej. 0.01"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div class="mb-6">
          <label for="price" class="block text-gray-700 font-medium mb-1">Precio</label>
          <input
            id="price"
            type="number"
            :value="price"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100"
            readonly
          />
        </div>
        <button
          type="submit"
          class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg"
        >
          Realizar Compra
        </button>
      </form>
    </div>

    <!-- Historial de transacciones -->
    <h2 class="text-4xl font-bold text-gray-800 mb-6 text-center">Historial de Transacciones</h2>
    <div class="bg-white p-8 rounded-xl shadow-lg max-w-6xl w-full mx-auto mb-6">
      <table v-if="binanceStore.transactions.length > 0" class="w-full border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-200">
            <th class="border border-gray-300 p-2">Símbolo</th>
            <th class="border border-gray-300 p-2">Cantidad</th>
            <th class="border border-gray-300 p-2">Precio</th>
            <th class="border border-gray-300 p-2">Tipo</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transaction in binanceStore.transactions" :key="transaction.timestamp">
            <td class="border border-gray-300 p-2">{{ transaction.symbol }}</td>
            <td class="border border-gray-300 p-2">{{ transaction.quantity }}</td>
            <td class="border border-gray-300 p-2">{{ transaction.price }}</td>
            <td class="border border-gray-300 p-2">{{ transaction.type }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue';
import { useBinanceStore } from '@/stores/binanceStore';
import { useAuthStore } from '@/features/authSlice.ts';
import Swal from 'sweetalert2';

const binanceStore = useBinanceStore();
const authStore = useAuthStore();

const symbol = ref('BTCUSDT');
const quantity = ref(0.01);
const price = ref(50000);
const sellerName = ref('');

// Computed property to get user ID
const userId = computed(() => authStore.user?.id || null);

// Función para simular una compra P2P
const simulateBuy = async () => {
  if (!userId.value) {
    Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo obtener el ID del usuario.' });
    return;
  }

  if (!sellerName.value) {
    Swal.fire({ icon: 'error', title: 'Error', text: 'Debe seleccionar un vendedor antes de comprar.' });
    return;
  }

  const result = await Swal.fire({
    title: '¿Estás seguro?',
    text: '¡La compra P2P se realizará con los datos ingresados!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, realizar compra',
    cancelButtonText: 'Cancelar',
  });

  if (result.isConfirmed) {
    try {
      await binanceStore.simulateBuy(symbol.value, quantity.value, price.value, userId.value);
      Swal.fire({ icon: 'success', title: 'Compra Realizada', text: 'La compra P2P se realizó con éxito.' });
    } catch (error) {
      console.error('Error realizando la compra P2P', error);
      Swal.fire({ icon: 'error', title: 'Error', text: 'Error al simular la compra.' });
    }
  }
};

// Se ejecuta cuando cambia el vendedor seleccionado
watch(
  () => binanceStore.selectedSeller,
  (newSeller) => {
    if (newSeller) {
      sellerName.value = newSeller.userName || '';
      symbol.value = newSeller.symbol || 'BTCUSDT';
      price.value = newSeller.price || 50000;
    }
  },
  { immediate: true }
);

// Cargar datos al montar el componente
onMounted(() => {
  authStore.loadUserFromStorage();
  binanceStore.fetchTransactions();
  binanceStore.fetchP2PSellers('BTCUSDT');
});
</script>

<style scoped>
/* Estilos adicionales si es necesario */
</style>
