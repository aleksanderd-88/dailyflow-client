<template>
  <LvProgressBar 
    mode="indeterminate" 
    color="#2D383D" 
    v-if="isLoading" 
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useLoadingStore } from '@/stores/app/loading';

  const isLoading = computed(() => useLoadingStore().isLoading)
</script>

<style lang="scss" scoped>
</style>