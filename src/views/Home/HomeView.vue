<template>
  <div class="min-h-screen relative text-white">
    <!-- Fondo con imagen y degradado -->
    <div class="absolute inset-0 bg-cover bg-center bg-no-repeat"
         style="background-image: url('https://img.freepik.com/foto-gratis/ilustracion-bitcoin-ciberpunk_23-2151611191.jpg?t=st=1741881616~exp=1741885216~hmac=6796762f8dd6c685b00ac9bb5abd60769b3c12d7e6dc49d5dce7f86b7756df92&w=2000');">
    </div>
    <div class="absolute inset-0 bg-gradient-to-b from-black/60 to-purple-900/90"></div>

    <!-- Contenido -->
    <div class="relative z-10">
      <NavigationComponent />

      <!-- Sección de Introducción -->
      <section class="flex flex-col items-center text-center py-12 px-6">
        <h1 class="text-5xl md:text-6xl font-extrabold tracking-wide animate-fade-in">
          VueChain: Tu Plataforma de Criptomonedas
        </h1>
        <p class="mt-3 text-lg md:text-xl text-gray-300 max-w-2xl">
          Monitorea precios en tiempo real, analiza tendencias y simula operaciones sin riesgos.
        </p>
        <button 
          @click="$router.push('/login')" 
          class="mt-4 bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-500 hover:to-indigo-400 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transition-all">
          Iniciar Sesión
        </button>
      </section>

      <!-- Nueva Sección: Cómo Funciona VueChain -->
      <section class="py-8 px-6 text-center">
        <h2 class="text-3xl font-semibold mb-4">¿Cómo Funciona VueChain?</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="p-5 bg-white/10 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl">
            <i class="text-4xl text-yellow-400 fas fa-user-plus"></i>
            <h3 class="text-lg font-semibold mt-3">Regístrate Gratis</h3>
            <p class="text-gray-300 mt-1">Crea tu cuenta en segundos y accede a herramientas avanzadas.</p>
          </div>
          <div class="p-5 bg-white/10 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl">
            <i class="text-4xl text-blue-400 fas fa-chart-line"></i>
            <h3 class="text-lg font-semibold mt-3">Analiza el Mercado</h3>
            <p class="text-gray-300 mt-1">Monitorea criptomonedas en tiempo real con gráficos dinámicos.</p>
          </div>
          <div class="p-5 bg-white/10 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl">
            <i class="text-4xl text-green-400 fas fa-wallet"></i>
            <h3 class="text-lg font-semibold mt-3">Simula Inversiones</h3>
            <p class="text-gray-300 mt-1">Prueba estrategias sin riesgo y optimiza tus decisiones.</p>
          </div>
        </div>
      </section>

      <!-- Beneficios -->
      <section class="py-8 px-6 text-center">
        <h2 class="text-3xl font-semibold mb-4">¿Por qué elegir VueChain?</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="p-5 bg-white/10 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl">
            <i class="text-4xl text-blue-400 fas fa-shield-alt"></i>
            <h3 class="text-lg font-semibold mt-3">Seguridad Avanzada</h3>
            <p class="text-gray-300 mt-1">Protección con autenticación segura.</p>
          </div>
          <div class="p-5 bg-white/10 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl">
            <i class="text-4xl text-purple-400 fas fa-lightbulb"></i>
            <h3 class="text-lg font-semibold mt-3">Innovación</h3>
            <p class="text-gray-300 mt-1">Tecnología moderna y fácil de usar.</p>
          </div>
          <div class="p-5 bg-white/10 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl">
            <i class="text-4xl text-green-400 fas fa-coins"></i>
            <h3 class="text-lg font-semibold mt-3">Simulación de Inversión</h3>
            <p class="text-gray-300 mt-1">Prueba estrategias sin riesgo financiero.</p>
          </div>
        </div>
      </section>

      <!-- Llamado a la Acción -->
      <section class="text-center py-8">
        <h3 class="text-lg font-semibold">Empieza ahora con VueChain</h3>
        <button 
          @click="$router.push('/register')" 
          class="mt-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg text-lg shadow-lg hover:scale-105 transition-transform">
          Registrarse Gratis
        </button>
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
