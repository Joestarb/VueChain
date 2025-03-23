<template>
  <form @submit.prevent="handleSubmit" class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
    <div class="mb-4">
      <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
      <input
        v-model="user.username"
        id="username"
        type="text"
        required
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
    <div class="mb-4">
      <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
      <input
        v-model="user.password"
        id="password"
        type="password"
        required
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
    <div class="mb-4">
      <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
      <input
        v-model="user.email"
        id="email"
        type="email"
        required
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
    <div class="mb-6">
      <label for="role" class="block text-sm font-medium text-gray-700">Role</label>
      <select
        v-model="user.role"
        id="role"
        required
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="USER">User</option>
        <option value="admin">Admin</option>
      </select>
    </div>
    <button
      type="submit"
      class="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      Actualizar Usuario
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'
import { useUsersSlice } from '@/features/UsersSlice.ts'
import Swal from 'sweetalert2'

const props = defineProps({
  user: Object
})

const emit = defineEmits(['userUpdated'])

const user = ref({ ...props.user, password: props.user.passwordHash })

watch(() => props.user, (newUser) => {
  user.value = { ...newUser, password: newUser.passwordHash }
})

const usersStore = useUsersSlice()

const handleSubmit = async () => {
  try {
    await usersStore.updateUser(user.value)
    emit('userUpdated')
    Swal.fire({
      icon: 'success',
      title: 'Usuario actualizado',
      text: 'El usuario ha sido actualizado correctamente.',
    })
  } catch (error) {
    console.error('Error al actualizar el usuario:', error)
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un error al actualizar el usuario.',
    })
  }
}
</script>
