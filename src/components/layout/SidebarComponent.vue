<template>
  <aside class="w-64 bg-gray-800 text-white p-5 flex flex-col">
    <h2 class="text-2xl font-bold mb-6">Dashboard</h2>
    <nav class="flex-1">
      <ul>
        <li class="mb-4">
          <RouterLink
            to="/dashboard"
            class="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            active-class="bg-blue-600"
          >

              <Home class="mr-2" />

            <span class="material-icons mr-2">Dashboard</span>
          </RouterLink>
        </li>
        <li class="mb-4">
          <RouterLink
            to="/profile"
            class="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            active-class="bg-blue-600"
          >
            <User class="mr-2" />
            <span class="material-icons mr-2">Example</span>
          </RouterLink>
        </li>
        <li class="mb-4">
          <RouterLink
            to="/settings"
            class="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            active-class="bg-blue-600"
          >
            <Settings class="mr-2" />
            <span class="material-icons mr-2">settings</span>
          </RouterLink>
        </li>
      </ul>
    </nav>
    <ButtonComponent
      @click="logout"
      title="Cerrar Sesión"
      own-style="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg w-full transition-colors duration-200"
    />
  </aside>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/features/authSlice.ts';
import { useTokenStore } from '@/stores/TokenStore.ts';
import { useRouter } from 'vue-router';
import { Home,User,Settings } from 'lucide-vue-next';
import ButtonComponent from '@/components/common/ButtonComponent.vue';

const tokenStore = useTokenStore();
const authStore = useAuthStore();
const navigate = useRouter();

const logout = async () => {
  try {
    await authStore.logout(tokenStore.getToken()?.token);
    tokenStore.removeToken();
    navigate.push('/');
  } catch (error) {
    console.error('Error al cerrar sesión', error);
  }
};
</script>

<style scoped>
/* Estilos adicionales si es necesario */
.router-link-active {
  background-color: #2563eb; /* Color de fondo para la ruta activa */
}

.router-link-exact-active {
  background-color: #2563eb; /* Color de fondo para la ruta exacta */
}
</style>
