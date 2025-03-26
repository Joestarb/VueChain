<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100 p-6">
    <div class="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
      <h3 class="text-3xl font-bold text-gray-700 text-center mb-6">Operaciones en Binance</h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Campos de entrada -->
        <input
          v-model="symbol"
          type="text"
          placeholder="Símbolo (Ej: BTCUSDT)"
          class="border px-4 py-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
        />
        <input
          v-model="quantity"
          type="number"
          placeholder="Cantidad"
          class="border px-4 py-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
        />
        <input
          v-model="price"
          type="number"
          placeholder="Precio"
          class="border px-4 py-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
        />
        <input
          v-model="userId"
          type="text"
          placeholder="ID de usuario"
          class="border px-4 py-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
          disabled
        />

        <!-- Botones de Compra y Venta -->
        <div class="flex justify-between col-span-2">
          <button
            @click="handleBuy"
            class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition w-1/2 mr-2 shadow-md"
          >
            Comprar
          </button>

          <button
            @click="handleSell"
            class="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition w-1/2 ml-2 shadow-md"
          >
            Vender
          </button>
        </div>
      </div>

      <!-- Establecer Alerta de Precio -->
      <div class="mt-8">
        <h4 class="text-xl font-semibold text-gray-700 mb-4">Establecer Alerta de Precio</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            v-model="alertSymbol"
            type="text"
            placeholder="Símbolo para alerta"
            class="border px-4 py-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
          />
          <input
            v-model="targetPrice"
            type="number"
            placeholder="Precio objetivo"
            class="border px-4 py-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
          />
          <input
            v-model="alertUserId"
            type="text"
            placeholder="ID de usuario"
            class="border px-4 py-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
            disabled
          />
          <button
            @click="handleSetAlert"
            class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition col-span-2 shadow-md"
          >
            Establecer Alerta
          </button>
        </div>
      </div>

      <!-- Respuesta de la API -->
      <div v-if="binanceStore.orderResponse" class="mt-6 text-gray-700 text-center">
        <p class="text-lg font-semibold">Orden procesada: {{ binanceStore.orderResponse }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useBinanceStore } from '@/stores/useBinanceStore.ts';

const binanceStore = useBinanceStore();

// Variables reactivas para entrada de datos
const symbol = ref<string>('');
const quantity = ref<number | null>(null);
const price = ref<number | null>(null);
const alertSymbol = ref<string>('');
const targetPrice = ref<number | null>(null);
const userId = ref<string>(''); 
const alertUserId = ref<string>('');

// Cargar el userId desde localStorage
onMounted(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const user = JSON.parse(storedUser);
    userId.value = user?.id || '';
    alertUserId.value = user?.id || '';
  }
});

// Funciones para operaciones
const handleBuy = () => {
  if (symbol.value && quantity.value && price.value && userId.value) {
    binanceStore.buyCrypto(symbol.value, quantity.value, price.value, userId.value);
  }
};

const handleSell = () => {
  if (symbol.value && quantity.value && price.value && userId.value) {
    binanceStore.sellCrypto(symbol.value, quantity.value, price.value, userId.value);
  }
};

const handleSetAlert = () => {
  if (alertSymbol.value && targetPrice.value && alertUserId.value) {
    binanceStore.setPriceAlert(alertSymbol.value, targetPrice.value, alertUserId.value);
  }
};
</script>
