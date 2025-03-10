<template>
  <div >
    <transition name="fade" mode="out-in">
      <div
        v-if="isOpen"
        class="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-lg z-50"
      >
        <div ref="closeModal"
             class="bg-white p-6 rounded-2xl shadow-xl border border-white/20">
          <slot />

          <ButtonComponent
            title="Cerrar Modal" @click="handleClose" :ownStyle="['mt-4','w-full']" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import ButtonComponent from '@/components/common/ButtonComponent.vue'
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['is-open'])

const closeModal = ref(null);
onClickOutside(closeModal, () => {
  emit('is-open', false)
})

const handleClose = () => {
  emit('is-open', false)
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
