import axios from 'axios';

const API_URL = 'http://localhost:5245/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});


apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Funciones para consumir los endpoints

export const authService = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },
  logout: async (token: string) => {
    await apiClient.delete('/auth/logout', { data: { token } });
  },
  verifyToken: async (token: string) => {
    const response = await apiClient.post('/auth/verify-token', { token });
    return response.data;
  }
};

export const tradingService = {
  getStockData: async () => {
    const response = await apiClient.get('/tradingview/bolsa');
    return response.data;
  },
  getCryptoData: async () => {
    const response = await apiClient.get('/tradingview/cripto-currency');
    return response.data;
  },
  getCompanies: async () => {
    const response = await apiClient.get('/tradingview/get-companies');
    return response.data;
  }
};
