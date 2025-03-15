<template>
    <div class="min-h-screen relative text-white">
      <!-- Fondo con imagen y degradado -->
      <div class="absolute inset-0 bg-cover bg-center bg-no-repeat"
           style="background-image: url('https://img.freepik.com/foto-gratis/hermoso-diseno-holograma-criptomonedas_23-2149250217.jpg?t=st=1741887787~exp=1741891387~hmac=a1087ac141fa969ae46b85291068e9b2596840c2cfee109fb7d5aa92d0d4a91b&w=2000');">
      </div>
      <div class="absolute inset-0 bg-gradient-to-b from-black/60 to-purple-900/90"></div>
  
      <!-- Contenido -->
      <div class="relative z-10">
        <NavigationComponent />
  
        <!-- Sección de Contacto -->
        <section class="flex flex-col items-center text-center py-8 px-6">
          <h1 class="text-5xl md:text-6xl font-extrabold tracking-wide animate-fade-in">
            Contáctanos
          </h1>
          <p class="mt-3 text-lg md:text-xl text-gray-300 max-w-2xl">
            Estamos aquí para resolver todas tus dudas y brindarte la mejor experiencia en VueChain.
          </p>
        </section>
  
        <!-- Tarjeta de Información de VueChain -->
        <section class="py-6 px-6 flex justify-center">
          <div class="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg w-full max-w-2xl text-center border border-white/20">
            <h2 class="text-2xl font-semibold mb-3">Información de VueChain</h2>
            <div class="space-y-2 text-gray-300 text-lg">
              <p>📍 <strong>Sede Central:</strong> Avenida Blockchain 101, CriptoCiudad, Metaverso.</p>
              <p>📞 <strong>Teléfono:</strong> +1 234 567 890</p>
              <p>📧 <strong>Correo:</strong> soporte@vuechain.io</p>
              <p>🕒 <strong>Horario de Atención:</strong> Lunes - Viernes, 9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </section>
  
        <!-- Sección de Redes Sociales con Tarjetas -->
        <section class="text-center py-6">
          <h2 class="text-3xl font-semibold mb-4">Síguenos en nuestras redes</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 px-6">
            <div class="p-5 bg-white/10 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl cursor-pointer flex flex-col items-center">
              <i class="text-5xl text-blue-400 fab fa-facebook"></i>
              <h3 class="text-xl font-semibold mt-3">Facebook</h3>
              <p class="text-gray-300 mt-1 text-sm">Únete a nuestra comunidad y mantente informado.</p>
            </div>
            <div class="p-5 bg-white/10 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl cursor-pointer flex flex-col items-center">
              <i class="text-5xl text-blue-500 fab fa-twitter"></i>
              <h3 class="text-xl font-semibold mt-3">Twitter</h3>
              <p class="text-gray-300 mt-1 text-sm">Descubre las últimas actualizaciones y tendencias.</p>
            </div>
            <div class="p-5 bg-white/10 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl cursor-pointer flex flex-col items-center">
              <i class="text-5xl text-pink-400 fab fa-instagram"></i>
              <h3 class="text-xl font-semibold mt-3">Instagram</h3>
              <p class="text-gray-300 mt-1 text-sm">Explora contenido exclusivo sobre VueChain.</p>
            </div>
          </div>
        </section>
  
        <!-- Sección de Preguntas Frecuentes -->
        <section class="py-6 px-6 text-center">
          <h2 class="text-3xl font-semibold mb-4">Preguntas Frecuentes</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-5 bg-white/10 rounded-lg shadow-lg text-left">
              <h3 class="text-lg font-semibold">¿VueChain permite realizar compras de criptomonedas?</h3>
              <p class="text-gray-300 mt-1 text-sm">No, VueChain solo proporciona herramientas avanzadas para análisis y simulación de inversiones.</p>
            </div>
            <div class="p-5 bg-white/10 rounded-lg shadow-lg text-left">
              <h3 class="text-lg font-semibold">¿Cómo puedo registrarme?</h3>
              <p class="text-gray-300 mt-1 text-sm">Solo necesitas hacer clic en el botón "Registrarse Gratis" y completar el formulario con tus datos.</p>
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
  