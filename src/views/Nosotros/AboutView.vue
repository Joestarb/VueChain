<template>
    <div class="min-h-screen relative text-white">
      <!-- Fondo con imagen y degradado -->
      <div class="absolute inset-0 bg-cover bg-center bg-no-repeat"
           style="background-image: url('https://img.freepik.com/foto-gratis/ilustracion-bitcoin-ciberpunk_23-2151611154.jpg?t=st=1741886577~exp=1741890177~hmac=90a8f425d17de9467755843798e1794e45f51d4d46fd0b18d3eef351fc50b81f&w=2000');">
      </div>
      <div class="absolute inset-0 bg-gradient-to-b from-black/60 to-purple-900/80"></div>
  
      <!-- Contenido -->
      <div class="relative z-10">
        <!-- Barra de Navegación -->
        <NavigationComponent />
  
        <!-- Sección de Introducción -->
        <section class="text-center py-10 px-6">
          <h1 class="text-5xl font-extrabold tracking-wide animate-fade-in">
            Sobre VueChain
          </h1>
          <p class="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
            VueChain es una plataforma moderna diseñada para simplificar la gestión y análisis de criptomonedas, combinando seguridad, eficiencia e innovación.
          </p>
        </section>
  
        <!-- Sección Compacta: Filosofía (Misión y Visión) -->
        <section class="py-6 px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-white/10 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105">
            <i class="text-3xl text-yellow-400 fas fa-bullseye"></i>
            <h3 class="text-2xl font-semibold mt-3">Nuestra Misión</h3>
            <p class="text-gray-300 mt-2">
              Democratizar el acceso a herramientas avanzadas para el análisis de criptomonedas, permitiendo a todos tomar decisiones informadas y seguras.
            </p>
          </div>
          <div class="bg-white/10 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105">
            <i class="text-3xl text-green-400 fas fa-eye"></i>
            <h3 class="text-2xl font-semibold mt-3">Nuestra Visión</h3>
            <p class="text-gray-300 mt-2">
              Convertirnos en la plataforma líder en el análisis de criptomonedas, garantizando seguridad, accesibilidad y facilidad de uso.
            </p>
          </div>
        </section>
  
        <!-- Sección Compacta: Valores -->
        <section class="py-6 px-6 text-center">
          <h2 class="text-3xl font-semibold mb-4">Nuestros Valores</h2>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div class="p-4 bg-white/10 rounded-lg shadow-lg hover:scale-105 transition-transform">
              <i class="text-3xl text-blue-400 fas fa-lock"></i>
              <h3 class="text-lg font-semibold mt-2">Seguridad</h3>
            </div>
            <div class="p-4 bg-white/10 rounded-lg shadow-lg hover:scale-105 transition-transform">
              <i class="text-3xl text-purple-400 fas fa-lightbulb"></i>
              <h3 class="text-lg font-semibold mt-2">Innovación</h3>
            </div>
            <div class="p-4 bg-white/10 rounded-lg shadow-lg hover:scale-105 transition-transform">
              <i class="text-3xl text-red-400 fas fa-users"></i>
              <h3 class="text-lg font-semibold mt-2">Comunidad</h3>
            </div>
          </div>
        </section>
  
        <!-- Sección Compacta: Nuestro Equipo -->
        <section class="py-6 px-6 text-center">
          <h2 class="text-3xl font-semibold mb-4">Nuestro Equipo</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Fila superior -->
            <div class="p-5 bg-white/10 rounded-lg shadow-lg hover:scale-105 transition-transform">
              <h3 class="text-xl font-semibold">Arbey</h3>
              <p class="text-gray-300 mt-2">Líder del proyecto, encargado de la coordinación y supervisión general.</p>
            </div>
            <div class="p-5 bg-white/10 rounded-lg shadow-lg hover:scale-105 transition-transform">
              <h3 class="text-xl font-semibold">Angel</h3>
              <p class="text-gray-300 mt-2">Responsable del backend, manejando la integración de la API de Binance y la lógica del servidor.</p>
            </div>
            <div class="p-5 bg-white/10 rounded-lg shadow-lg hover:scale-105 transition-transform">
              <h3 class="text-xl font-semibold">Ross</h3>
              <p class="text-gray-300 mt-2">Encargado del backend, colaborando en la gestión de la base de datos y la conexión con la API.</p>
            </div>
          </div>
          <!-- Fila inferior centrada con mejor tamaño -->
          <div class="flex justify-center gap-4 mt-4">
            <div class="p-5 w-[40%] bg-white/10 rounded-lg shadow-lg hover:scale-105 transition-transform">
              <h3 class="text-xl font-semibold">Soto</h3>
              <p class="text-gray-300 mt-2">Responsable del frontend, desarrollando la interfaz de usuario en Vue.js.</p>
            </div>
            <div class="p-5 w-[40%] bg-white/10 rounded-lg shadow-lg hover:scale-105 transition-transform">
              <h3 class="text-xl font-semibold">Gopar</h3>
              <p class="text-gray-300 mt-2">Colaborador en el frontend, apoyando en la implementación de vistas y la visualización de datos.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </template>
  
  <script setup>
  import NavigationComponent from '@/components/layout/NavigationComponent.vue';
  </script>
  
  <style>
  /* Animación para fade-in del título */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fadeIn 1s ease-out;
  }
  </style>
  