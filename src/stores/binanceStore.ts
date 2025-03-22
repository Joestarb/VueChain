import { defineStore } from "pinia";
import { getP2PSellers, getTransactions, simulateP2PBuy } from "@/utils/binanceService";

export const useBinanceStore = defineStore("binance", {
  state: () => ({
    transactions: [] as any[],
    sellers: [] as any[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchTransactions() {
      this.loading = true;
      try {
        this.transactions = await getTransactions();
      } catch (err) {
        this.error = "Error al obtener transacciones.";
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    async fetchP2PSellers(symbol?: string) { // Hacerlo opcional
        this.loading = true;
        this.error = null;
      
        try {
          this.sellers = await getP2PSellers(symbol); // Pasar el símbolo solo si está definido
        } catch (err) {
          this.error = "Error al obtener vendedores P2P.";
          console.error(err);
        } finally {
          this.loading = false;
        }
      },
      

    async simulateBuy(symbol: string, quantity: number, price: number, userId: number) {
      try {
        await simulateP2PBuy(symbol, quantity, price, userId,);
        await this.fetchTransactions();
      } catch (err) {
        this.error = "Error al simular compra.";
        console.error(err);
        throw err;
      }
    },
  },
});
