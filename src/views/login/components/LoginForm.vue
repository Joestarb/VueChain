<template>
  <div class="z-50">
    <form @submit.prevent="handleSubmit" class="text-white flex flex-col gap-2 z-50 bg-opacity-20 bg-purple-500/5 shadow-lg rounded-2xl p-6 w-96 border border-white/20">
      <p class="text-4xl text-center">Iniciar Sesion</p>
      <InputComponent placeholder="example@example.com" v-model="email" labelTittle="Email" :icon="Mail" />
      <InputComponent placeholder="*****" v-model="password" labelTittle="Password" type="password" :icon="LockKeyhole" />
      <p class="text-gray-500">Aun no tienes una cuenta? <RouterLink to="/register" class="underline cursor-pointer">Registrate aquí</RouterLink></p>
      <ButtonComponent
        type="submit"
        own-style="w-full cursor-pointer"
        title="Iniciar sesion"/>
    </form>
  </div>
</template>

<script setup lang="ts">
import InputComponent from '@/components/common/InputComponent.vue'
import { Mail, LockKeyhole, User } from 'lucide-vue-next'
import { ref } from 'vue'
import ButtonComponent from '@/components/common/ButtonComponent.vue'
import Swal from 'sweetalert2'
import { useAuthStore } from '@/features/authSlice'
import { RouterLink } from 'vue-router'
const email = ref('')
const password = ref('')
const authStore = useAuthStore()

const handleSubmit = async () => {

  const arrayValues = [ email.value, password.value, ]

  const validations = {
    emptyFields: {
      condition: arrayValues.some(value => value.trim() === ''),
      message: 'Todos los campos son requeridos'
    },
  }

  for (const key in validations) {
    if (validations[key].condition) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: validations[key].message,
      })
      return
    }
  }


  try {
    const response = await authStore.login({
      password: password.value,
      email: email.value
    })
    const responseStatus = {
      token: {
        icon: 'success',
        title: 'Bienvenido!',
        text: 'enviado!',
      },

      default: {
        icon: 'error',
        title: 'Error',
        text: 'Algo salio mal verifique sus credenciales ',
      }
    }

    if (response.token) {
      // console.log('respuesta', response)

      localStorage.setItem('userToken', JSON.stringify(response));

      Swal.fire(responseStatus.token)
    } else {
      Swal.fire(responseStatus.default)
    }


  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema con el registro',
    })
  }
}



</script>
