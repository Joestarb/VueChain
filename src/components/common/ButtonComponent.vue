<template>
  <div>
    <button :class="[ownStyle ,' w-full' ,'text-white', 'p-2','rounded-lg',' bg-[#3D8D7A]','hover:bg-[#155747]','focus:outline-none', 'cursor-pointer', 'transition', 'duration-500']">
      {{ title }}
    </button>
  </div>
</template>

<script setup lang="ts">

defineProps<{
  title: string
  ownStyle: string | string[]
}>()
</script>
