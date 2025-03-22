import { defineStore } from 'pinia';
import axios from 'axios';
import { useTokenStore } from '@/stores/TokenStore.ts';

export const useTradingStore = defineStore('trading', {
  state: () => ({
    tradingData: null,
    cryptoData: null,
    companiesData: null,
    widgets: [],
    loading: false,
    error: null,
    widgetsCripto: [],
    widgetsEmpresas: []
  }),

  actions: {
    async fetchTradingData() {
      this.loading = true;
      this.error = null;
      const tokenStore = useTokenStore();
      const token = tokenStore.getToken()?.token;

      if (!token) {
        this.error = 'No se encontró un token válido';
        this.loading = false;
        return;
      }

      try {
        const response = await axios.get('/api/tradingview/bolsa', {
          headers: { Authorization: `Bearer ${token}` }
        });


        this.tradingData = response.data;
      } catch (err) {
        this.error = err.response?.data?.message || 'Error al obtener datos';
      } finally {
        this.loading = false;
      }
    },

    async fetchCryptoData() {
      this.loading = true;
      this.error = null;
      const tokenStore = useTokenStore();
      const token = tokenStore.getToken()?.token;

      if (!token) {
        this.error = 'No se encontró un token válido';
        this.loading = false;
        return;
      }

      try {
        const response = await axios.get('/api/tradingview/cripto-currency', {
          headers: { Authorization: `Bearer ${token}` }
        });


        this.cryptoData = response.data;
        // console.log("Crypto Data:", this.cryptoData);
      } catch (err) {
        this.error = err.response?.data?.message || 'Error al obtener datos';
      } finally {
        this.loading = false;
      }
    },

    async fetchCompaniesData() {
      this.loading = true;
      this.error = null;
      const tokenStore = useTokenStore();
      const token = tokenStore.getToken()?.token;

      if (!token) {
        this.error = 'No se encontró un token válido';
        this.loading = false;
        return;
      }

      try {
        const response = await axios.get('/api/tradingview/get-companies', {
          headers: { Authorization: `Bearer ${token}` }
        });


        this.companiesData = response.data;
        console.log("Companies Data:", this.companiesData);
      } catch (err) {
        this.error = err.response?.data?.message || 'Error al obtener datos';
      } finally {
        this.loading = false;
      }
    },

    //función para obtener los widgets de TradingView
    async fetchWidgets() {
      this.loading = true;
      this.error = null;
      try {
        this.widgetsEmpresas = [
          { symbol: 'NASDAQ:AAPL', width: "400", height: "300" },
          { symbol: 'NASDAQ:TSLA', width: "400", height: "300" },
          { symbol: 'NASDAQ:GOOGL', width: "400", height: "300" }
        ];
        this.widgetsCripto = [
          { symbol: 'BITSTAMP:BTCUSD', width: "400", height: "300" },
          { symbol: 'BITSTAMP:ETHUSD', width: "400", height: "300" },
          { symbol: 'BINANCE:BNBUSDT', width: "400", height: "300" }
        ];
      } catch (err) {
        this.error = 'Error al obtener los widgets de TradingView';
      } finally {
        this.loading = false;
      }
    }
  }
});
