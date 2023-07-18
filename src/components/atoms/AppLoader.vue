<template>
  <AppOverlay :is-visible="isLoading">
    <span class="loader"></span>
  </AppOverlay>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import AppOverlay from '../organisms/AppOverlay.vue';
import { useLoadingStore } from '@/stores/app/loading';

  const isLoading = computed(() => useLoadingStore().isLoading)
</script>

<style lang="scss" scoped>
.loader {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: block;
  margin:15px auto;
  position: relative;
  color: #fff;
  box-sizing: border-box;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: animloader 1s linear infinite alternate;
}

@keyframes animloader {
  0% {
    box-shadow: -38px -6px, -14px 6px,  14px -6px;
  }
  33% {
    box-shadow: -38px 6px, -14px -6px,  14px 6px;
  }
  66% {
    box-shadow: -38px -6px, -14px 6px, 14px -6px;
  }
  100% {
    box-shadow: -38px 6px, -14px -6px, 14px 6px;
  }
}
</style>