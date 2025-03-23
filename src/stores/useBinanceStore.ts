import { defineStore } from "pinia";
import axios from "axios";

export const useBinanceStore = defineStore("binance", {
  state: () => ({
    loading: false,
    error: null as string | null,
    orderResponse: null as any,
  }),

  actions: {
    async buyCrypto(symbol: string, quantity: number, price: number, userId: string) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.post("/Binance/buy", null, {
          params: { symbol, quantity, price, userId },
        });
        this.orderResponse = response.data;
      } catch (err: any) {
        this.error = err.response?.data?.message || "Error al realizar la compra.";
      } finally {
        this.loading = false;
      }
    },

    async sellCrypto(symbol: string, quantity: number, price: number, userId: string) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.post("/Binance/sell", null, {
          params: { symbol, quantity, price, userId },
        });
        this.orderResponse = response.data;
      } catch (err: any) {
        this.error = err.response?.data?.message || "Error al realizar la venta.";
      } finally {
        this.loading = false;
      }
    },

    async setPriceAlert(symbol: string, targetPrice: number, userId: string) {
      this.loading = true;
      this.error = null;
      try {
        await axios.post("/Binance/alert", null, {
          params: { symbol, targetPrice, userId },
        });
      } catch (err: any) {
        this.error = err.response?.data?.message || "Error al establecer la alerta.";
      } finally {
        this.loading = false;
      }
    },
  },
});
