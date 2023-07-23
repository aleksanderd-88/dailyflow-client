<template>
  <div>
    <TheAppBar />
    <router-view />
    <AppLoader />
    <AppFeedback />
    <AppVersion />
  </div>
</template>

<script setup lang="ts">
import AppLoader from '@/components/atoms/AppLoader.vue';
import AppVersion from '@/components/atoms/AppVersion.vue';
import AppFeedback from '@/components/molecules/AppFeedback.vue';
import TheAppBar from '@/components/molecules/TheAppBar.vue'
</script>

<style scoped>

</style>