<template>
  <div>
    <TheAppBar />
    <router-view />
    <AppLoader />
  </div>
</template>

<script setup lang="ts">
import AppLoader from '@/components/molecules/AppLoader.vue';
import TheAppBar from '@/components/molecules/TheAppBar.vue'

</script>

<style scoped>

</style>