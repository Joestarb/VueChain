import { defineStore } from 'pinia';

export const useTokenStore = defineStore('token', {
  state: () => ({}),
  actions: {
    getToken() {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        console.warn('No hay token almacenado');
        return null;
      }

      try {
        const parsedToken = JSON.parse(userToken);
        return parsedToken.token;
      } catch (error) {
        console.error('Error parsing token:', error);
        return null;
      }
    },

    removeToken() {
      localStorage.removeItem('token');
    }
  }
});
