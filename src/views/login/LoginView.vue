<template>
  <div class="h-screen w-screen bg-black  shadow-lg rounded-2xl">

    <section class="grid lg:grid-cols-[40%_60%] bg-black h-screen">
      <div class=" lg:px-32">
        <div>
          <LoginForm />

        </div>
      </div>

      <div class="relative z-50">
        <img :src="sideImage" class="h-screen max-lg:hidden p-4 rounded-4xl" alt="bgimage" />
        <div class="md:absolute top-5 left-0 w-full z-50">
          <NavigationComponent />
        </div>
        <div class="md:absolute italic bottom-[5rem] left-[8%] text-white text-4xl left-0 w-full z-50">
          <p style="font-family: 'Mona Sans', sans-serif">
            "Explora el futuro de la tecnología y la descentralización."
          </p>
        </div>
      </div>

    </section>
  </div>
</template>
<script setup lang="ts">
import RegisterForm from '@/views/register/components/RegisterForm.vue'
import NavigationComponent from '@/components/layout/NavigationComponent.vue'
import bgLogin from '../../assets/bglogin.webp';
import  bgBlur from '../../assets/blur.png'
import LoginForm from '@/views/login/components/LoginForm.vue'
import sideImage from '@/assets/sideImage.jpg'
</script>
