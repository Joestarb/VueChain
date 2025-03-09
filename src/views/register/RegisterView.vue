<template>
  <section class="   bg-black h-screen">
    <NavigationComponent/>
      <div  class="  w-screen    h-[90%] flex justify-center items-center m-auto">
        <RegisterForm />
        <div class="  absolute   bottom-[0rem]   ">
          <img :src="bgBlur" alt="bgimage"   />
        </div>
      </div>
  </section>
</template>
<script setup lang="ts">
import RegisterForm from '@/views/register/components/RegisterForm.vue'
import NavigationComponent from '@/components/layout/NavigationComponent.vue'
import bgLogin from '../../assets/bglogin.webp';
import  bgBlur from '../../assets/blur.png'
</script>
