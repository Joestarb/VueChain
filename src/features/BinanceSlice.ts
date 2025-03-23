import { defineStore } from 'pinia'
import axios from 'axios'
import { baseUrl } from '@/utils/baseUrl'

export const useBinanceSlice = defineStore('binance', {
  actions: {
    async getRealTimePrice(symbol: string) {
      try {
        const response = await axios.get(`${baseUrl}/Binance/price?symbol=${symbol} `)
        return response.data
      } catch (error) {
        console.error('Error getting users:', error)
        throw error
      }
    },
    async historicalTrends(symbol: string) {
      try {
        const response = await axios.get(`${baseUrl}/historical-trends?symbol=BTCUSDT&interval=1h&startTime=2024-03-01T00:00:00Z&endTime=2024-03-10T00:00:00Z`)
        return response.data
      } catch (error) {
        console.error('Error getting users:', error)
        throw error
      }
    },



},
})
