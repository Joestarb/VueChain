<template>
  <div>
    <button :class="[ownStyle , ,'text-white', 'p-2','rounded-lg',' bg-[#211C84]','hover:bg-[#205781]','focus:outline-none', 'cursor-pointer', 'transition', 'duration-500']">
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
