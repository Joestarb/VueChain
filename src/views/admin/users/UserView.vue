<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Lista de Usuarios</h1>
    <ButtonComponent title="Añadir Usuario" @click="isModalOpen = true" />
    <ModalComponent :isOpen="isModalOpen" @is-open="isModalOpen = $event">
      <AddUserForm @userRegistered="fetchUsers" />
    </ModalComponent>
    <table class="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden">
      <thead class="bg-gray-100">
      <tr>
        <th class="py-3 px-4 border-b text-left">ID</th>
        <th class="py-3 px-4 border-b text-left">Username</th>
        <th class="py-3 px-4 border-b text-left">Email</th>
        <th class="py-3 px-4 border-b text-left">Role</th>
        <th class="py-3 px-4 border-b text-left">Acciones</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50 transition-colors">
        <td class="py-3 px-4 border-b">{{ user.id }}</td>
        <td class="py-3 px-4 border-b">{{ user.username }}</td>

        <td class="py-3 px-4 border-b">{{ user.email }}</td>
        <td class="py-3 px-4 border-b">{{ user.role }}</td>
        <td class="py-3 px-4 border-b">
          <button @click="editUser(user)" class="text-blue-500 hover:text-blue-700">Editar</button>
          <button @click="deleteUser(user.id)" class="text-red-500 hover:text-red-700">Eliminar</button>
        </td>
      </tr>
      </tbody>
    </table>
    <ModalComponent :isOpen="isEditModalOpen" @is-open="isEditModalOpen = $event">
      <EditUserForm :user="selectedUser" @userUpdated="fetchUsers" />
    </ModalComponent>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUsersSlice } from '@/features/UsersSlice.ts'
import ModalComponent from '@/components/common/ModalComponent.vue'
import AddUserForm from '@/views/admin/users/components/AddUserForm.vue'
import EditUserForm from '@/views/admin/users/components/EditUserForm.vue'
import ButtonComponent from '@/components/common/ButtonComponent.vue'
import Swal from 'sweetalert2'

const usersStore = useUsersSlice()
const users = ref([])
const isModalOpen = ref(false)
const isEditModalOpen = ref(false)
const selectedUser = ref(null)

const fetchUsers = async () => {
  try {
    const data = await usersStore.getUsers()
    users.value = data
  } catch (error) {
    console.error('Error al cargar los usuarios:', error)
  }
}

const deleteUser = async (id: number) => {
  try {
    await usersStore.deleteUser(id)
    fetchUsers()
    Swal.fire({
      icon: 'success',
      title: 'Usuario eliminado',
      text: 'El usuario ha sido eliminado correctamente.',
    })
  } catch (error) {
    console.error('Error al eliminar el usuario:', error)
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un error al eliminar el usuario.',
    })
  }
}

const editUser = (user) => {
  selectedUser.value = { ...user }
  isEditModalOpen.value = true
}

onMounted(fetchUsers)
</script>
