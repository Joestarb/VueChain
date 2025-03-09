<template>
  <div class="z-50">
    <form @submit.prevent="handleSubmit" class="text-white flex flex-col gap-2 z-50 bg-opacity-20 bg-purple-500/5 shadow-lg rounded-2xl p-6 w-96 border border-white/20">
      <p class="text-4xl text-center">Registro</p>
      <InputComponent placeholder="Jonh Doe" v-model="name" labelTittle="Name" :icon="User" />
      <InputComponent placeholder="example@example.com" v-model="email" labelTittle="Email" :icon="Mail" />
      <InputComponent placeholder="*****" v-model="password" labelTittle="Password" type="password" :icon="LockKeyhole" />
      <InputComponent placeholder="*****" v-model="passwordConfirmation" labelTittle="Password Confirmation" type="password" :icon="LockKeyhole" />
      <p class="text-gray-500">Ya tienes una cuenta? <span class="underline cursor-pointer">Inicia Sesion aquí</span></p>
      <ButtonComponent
        type="submit"
        own-style="w-full cursor-pointer"
        title="Registrarse"/>
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

const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const isOpen = ref(false)
const authStore = useAuthStore()

const handleSubmit = async () => {

  const arrayValues = [name.value, email.value, password.value, passwordConfirmation.value]

  const validations = {
    emptyFields: {
      condition: arrayValues.some(value => value.trim() === ''),
      message: 'Todos los campos son requeridos'
    },
    passwordsMismatch: {
      condition: password.value !== passwordConfirmation.value,
      message: 'Las contraseñas no coinciden'
    },
    passwordTooShort: {
      condition: password.value.length < 6,
      message: 'La contraseña debe tener al menos 6 caracteres'
    }
  }

  for (const key in validations) {
    if (validations[key].condition) {
      isOpen.value = true
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: validations[key].message,
      })
      return
    }
  }


  try {
    const response = await authStore.registerUser({
      username: name.value,
      password: password.value,
      email: email.value
    })
    const responseStatus = {
      200: {
        icon: 'success',
        title: 'Bienvenido!',
        text: 'enviado!',
      },
      400: {
        icon: 'error',
        title: 'Error',
        text: 'Correo ya registrado',
      },

      default: {
        icon: 'error',
        title: 'Error',
        text: 'Algo salio mal comuniquese con el administrador',
      }
    }
    Swal.fire(responseStatus[response.statusCode] || responseStatus.default)
    console.log(response)
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema con el registro',
    })
  }
}
</script>
