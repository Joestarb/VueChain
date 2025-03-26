import axios from "axios";

const API_BASE_URL = "http://localhost:5245/Binance"; // Cambia la URL si el backend usa otro puerto
const API_KEY = "HI6uW8jn58XSFhD2kerlILmcYjIti1PQAi5pq6t1qFUFL2JepSMsdezcXPx3QIdz"; // API Key Directa

export const getP2PSellers = async (symbol: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/p2p/sellers`, {
      params: { symbol },
      headers: { "X-MBX-APIKEY": API_KEY },
    });
    return response.data;
  } catch (error) {
    console.error("Error obteniendo vendedores P2P:", error);
    throw error;
  }
};

export const simulateP2PBuy = async (symbol: string, quantity: number, price: number, userId: number) => {
  try {
    await axios.post(
      `${API_BASE_URL}/simulate-p2p-buy?userId=${userId}`, // Se agrega el userId en la URL
      { symbol, quantity, price },
      { headers: { "X-MBX-APIKEY": API_KEY } }
    );
  } catch (error) {
    console.error("Error simulando compra P2P:", error);
    throw error;
  }
};



export const getTransactions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/transactions`, {
      headers: { "X-MBX-APIKEY": API_KEY },
    });
    return response.data;
  } catch (error) {
    console.error("Error obteniendo transacciones:", error);
    throw error;
  }
};
