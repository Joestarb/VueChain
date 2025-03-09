import { defineStore } from "pinia"
import axios from 'axios'
import { baseUrl } from '@/utils/baseUrl'
import type { User } from '../types/userInterface'

export const useAuthStore = defineStore('auth', {
  actions: {
    async registerUser(user: User) {
      try {
        const response = await axios.post(`${baseUrl}/api/Auth/register`, {
          username: user.username,
          password: user.password,
          email: user.email
        });

        return response.data;
      } catch (error) {
        console.error('Error registering user:', error);
        throw error;
      }
    }
  }
});
