import { defineStore } from "pinia";
import { getP2PSellers, getTransactions, simulateP2PBuy } from "@/utils/binanceService";

// Función para generar nombres aleatorios
const getRandomName = (usedNames: Set<string>) => {
  const firstNames = ['Carlos', 'Ana', 'Luis', 'Elena', 'Javier', 'Sofía', 'Andrés', 'Mariana', 'Ricardo', 'Valeria'];
  const lastNames = ['Gómez', 'Rodríguez', 'Fernández', 'López', 'Martínez', 'Pérez', 'García', 'Torres', 'Vargas', 'Jiménez'];

  let randomName = '';
  
  // Asegurarnos de que el nombre generado no esté repetido
  do {
    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    randomName = `${randomFirstName} ${randomLastName}`;
  } while (usedNames.has(randomName)); // Si el nombre ya está en el set, genera uno nuevo

  usedNames.add(randomName); // Agregar el nombre al set de nombres ya usados
  return randomName;
};

export const useBinanceStore = defineStore("binance", {
  state: () => ({
    transactions: [] as any[],
    sellers: [] as any[],
    loading: false,
    error: null as string | null,
    selectedSeller: null as any, // Para almacenar el vendedor seleccionado
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

    async fetchP2PSellers(symbol?: string) {
      this.loading = true;
      this.error = null;

      const usedNames = new Set<string>(); // Set para almacenar los nombres ya asignados

      try {
        this.sellers = await getP2PSellers(symbol);
        
        // Asignar nombres aleatorios a vendedores con el nombre "UsuarioSimulado"
        this.sellers = this.sellers.map(seller => ({
          ...seller,
          userName: seller.userName === "UsuarioSimulado" ? getRandomName(usedNames) : seller.userName
        }));

      } catch (err) {
        this.error = "Error al obtener vendedores P2P.";
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    async simulateBuy(symbol: string, quantity: number, price: number, userId: number) {
      try {
        await simulateP2PBuy(symbol, quantity, price, userId);
        await this.fetchTransactions();
      } catch (err) {
        this.error = "Error al simular compra.";
        console.error(err);
        throw err;
      }
    },
  },
});
