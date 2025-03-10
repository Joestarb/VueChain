import { defineStore } from "pinia"
import axios from 'axios'
import { baseUrl } from '@/utils/baseUrl'
import type { User } from '../types/userInterface'
import type { Login } from '../types/userInterface'

export const useAuthStore = defineStore('auth', {
  actions: {
    async registerUser(user: User) {
      try {
        const response = await axios.post(`${baseUrl}/api/Auth/register`, {
          username: user.username,
          password: user.password,
          email: user.email,
          role: user.role
        });

        return response.data;
      } catch (error) {
        console.error('Error registering user:', error);
        throw error;
      }
    },

    async login(login: Login) {
      try {
        const response = await axios.post(`${baseUrl}/api/Auth/login`, {
          password: login.password,
          email: login.email
        });

        return response.data;
      } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
      }
    },


    async logout(token: string) {
      try {
        const response = await axios.delete(`${baseUrl}/api/Auth/logout`, {
          data: { token: token }
        });
        return response.data;
      } catch (error) {
        console.error('Error logging out user:', error);
        throw error;
      }
    },
    async verifyToken(token: string) {
      try {
        const response = await axios.post(`${baseUrl}/api/Auth/verify-token`,{
          token: token,
        });
        return response.data;
      } catch (error) {
        console.error('Error no found token:', error);
        throw error;

      }
    }
  }
});
