<template>
  <div class="relative w-full">
    <label class="block text-sm font-medium text-white">
      <span>{{ labelTittle }}</span>
    </label>
    <div class="relative flex items-center w-full">
      <component
        v-if="icon"
        :is="icon"
        class="absolute left-3 text-gray-400"
        size="20"
      />
      <input
        :required="required"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        :class="[`${classes}`,'  w-full px-4 py-5 rounded-xl border  border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none',
            icon ? 'pl-10' : '']"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="$emit('blur', $event)"
        @change="$emit('change', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  labelTittle: {
    type: String,
    default: '',
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  classes: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: [Object, Function],
    default: null,
  }
})

defineEmits(['update:modelValue', 'blur', 'change'])
</script>
