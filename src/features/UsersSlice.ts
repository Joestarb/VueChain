import { defineStore } from 'pinia'
import axios from 'axios'
import { baseUrl } from '@/utils/baseUrl'
import { useTokenStore } from '@/stores/TokenStore.ts'
import type { User } from '@/types/userInterface.ts'

export const useUsersSlice = defineStore('user', {
  actions: {
    async getUsers() {
      const tokenStore = useTokenStore()
      const token = tokenStore.getToken()?.token
      try {
        const response = await axios.get(`${baseUrl}/api/users/users `, {
          headers: { Authorization: `Bearer ${token}` },
        })
        return response.data
      } catch (error) {
        console.error('Error getting users:', error)
        throw error
      }
    },
    async deleteUser(id: number) {
      const tokenStore = useTokenStore()
      const token = tokenStore.getToken()?.token
      try {
        const response = await axios.delete(`${baseUrl}/api/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        return response.data
      } catch (error) {
        console.error('Error deleting user:', error)
        throw error
      }
    },

    async updateUser(user: User) {
      const tokenStore = useTokenStore()
      const token = tokenStore.getToken()?.token
      try {
        const response = await axios.put(`${baseUrl}/api/users/${user.id}`, user, {
          headers: { Authorization: `Bearer ${token}` },
        })
        return response.data
      } catch (error) {
        console.error('Error updating user:', error)
        throw error
      }
    }
  },
})
