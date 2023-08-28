<template>
  <div class="app-overlay" :class="modifiedClass" @click.self="$emit('close')">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  }
})

const modifiedClass = computed(() => props.isVisible && 'app-overlay--visible')
</script>

<style lang="scss" scoped>
  .app-overlay {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    background-color: rgba(#000, .7);
    opacity: 0;
    z-index: 999;
    backdrop-filter: blur(5px);
    visibility: hidden;
    transition: opacity .25s, visibility .25s ease;

    &--visible {
      opacity: 1;
      visibility: visible;
    }

    body.dark-mode & {
      background-color: rgba(#000, .5);
    }
  }
</style>