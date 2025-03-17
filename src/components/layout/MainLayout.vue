<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar Component -->
    <SidebarComponent />

    <!-- Main Content -->
    <div class="flex-1 p-8 overflow-auto">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup lang="ts">
import SidebarComponent from '@/components/layout/SidebarComponent.vue';
</script>
