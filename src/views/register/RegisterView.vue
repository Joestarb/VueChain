<template>
  <div class="h-screen w-screen bg-black bg-opacity-20 bg-purple-500/5 shadow-lg rounded-2xl">
    <section class="grid lg:grid-cols-[60%_40%] bg-black h-screen">
      <div class="relative">
        <img :src="sideImage" class="h-screen max-lg:hidden p-4 rounded-4xl" alt="bgimage" />
        <div class="md:absolute top-5 left-0 w-full z-50">
          <NavigationComponent />
        </div>
        <div class="md:absolute  max-md:hidden italic bottom-[5rem] left-[8%] text-white text-4xl left-0 w-full z-50">
          <p style="font-family: 'Mona Sans', sans-serif">
            "Explora el futuro de la tecnología y la descentralización."
          </p>
        </div>
      </div>
      <div class="z-50 lg:px-32">
        <RegisterForm />

      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import RegisterForm from '@/views/register/components/RegisterForm.vue'
import NavigationComponent from '@/components/layout/NavigationComponent.vue'
import sideImage from '../../assets/sideImage.jpg'
import bgBlur from '../../assets/blur.png'
</script>
