<template>
  <div>
    <h1>Dashboard</h1>
    <ButtonComponent @click="logout" title="Cerrar Sesion" own-style=""/>
  </div>
</template>
<script setup lang="ts">
import { useTokenStore } from '@/stores/TokenStore.ts'
import ButtonComponent from '@/components/common/ButtonComponent.vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/features/authSlice.ts'

const authStore = useAuthStore()
const navigate = useRouter()

const tokenStore = useTokenStore()
const token = tokenStore.getToken()


const logout = () => {
  tokenStore.removeToken()
  authStore.logout(token.token)
  navigate.push('/')

}

</script>
