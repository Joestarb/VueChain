<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-10">
    <div class="p-6 max-w-6xl mx-auto">
      <h1 class="text-4xl font-extrabold text-center text-gray-900 mb-8">Crypto Prices in Real-Time</h1>

      <input
        v-model="search"
        type="text"
        placeholder="Search for a symbol..."
        class="w-full p-4 border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
        @input="handleSearch"
      />

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        <div
          v-for="(price, symbol) in filteredPrices"
          :key="symbol"
          class="p-6 border-2 border-gray-200 rounded-2xl shadow-xl flex flex-col items-center bg-white hover:shadow-2xl transition-shadow duration-300"
        >
          <img
            :src="getCryptoImage(symbol)"
            :alt="symbol"
            class="w-20 h-20 mb-4"
            @error="handleImageError"
          />
          <p class="text-xl font-bold text-gray-800">{{ symbol }}</p>
          <p class="text-2xl font-extrabold text-green-600 mt-2">${{ price.toLocaleString() }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useBinanceSlice } from '@/features/BinanceSlice'

const binanceStore = useBinanceSlice()
const prices = ref<{ [key: string]: number }>({})
const search = ref("")

const symbols = ref([
  'BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'ADAUSDT', 'XRPUSDT', 'SOLUSDT', 'DOGEUSDT', 'DOTUSDT',
  'LTCUSDT', 'UNIUSDT', 'LINKUSDT', 'MATICUSDT', 'AVAXUSDT', 'ALGOUSDT', 'ATOMUSDT', 'ETCUSDT',
  'XLMUSDT', 'VETUSDT', 'TRXUSDT', 'ICPUSDT', 'FILUSDT', 'THETAUSDT', 'AAVEUSDT', 'EOSUSDT'
])

const fetchPrices = async (symbol?: string) => {
  const targetSymbols = symbol ? [symbol] : symbols.value

  for (const sym of targetSymbols) {
    try {
      const priceData = await binanceStore.getRealTimePrice(sym)
      prices.value[sym] = priceData
      if (!symbols.value.includes(sym)) {
        symbols.value.push(sym)
      }
    } catch (error) {
      console.error(`Error fetching price for ${sym}:`, error)
    }
  }
}

const filteredPrices = computed(() => {
  if (!search.value) return prices.value

  return Object.fromEntries(
    Object.entries(prices.value).filter(([symbol]) =>
      symbol.toLowerCase().includes(search.value.toLowerCase())
    )
  )
})

const handleSearch = async () => {
  const query = search.value.toUpperCase()
  if (query && !prices.value[query]) {
    await fetchPrices(query)
  }
}

const getCryptoImage = (symbol: string) => {
  const baseSymbol = symbol.replace("USDT", "").toLowerCase()
  return `https://cryptologos.cc/logos/${baseSymbol}-${baseSymbol}-logo.png`
}


let interval: number
onMounted(() => {
  fetchPrices()
  interval = setInterval(fetchPrices, 5000)
})

onUnmounted(() => {
  clearInterval(interval)
})

watch(search, handleSearch)
</script>


<!--PEPEUSDT-->
<!--FLOKIUSDT → Floki Inu-->

<!--TWTUSDT → Trust Wallet Token-->

<!--RNDRUSDT → Render Token-->

<!--LDOUSDT → Lido DAO-->

<!--GMXUSDT → GMX-->
