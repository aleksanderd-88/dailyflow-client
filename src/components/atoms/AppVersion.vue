<template>
  <p class="app-version">Version &middot; {{ appVersion() }}</p>
</template>

<script setup lang="ts">
import { appVersion } from '@/utils/version/getVersion'

</script>

<style lang="scss" scoped>
  .app-version {
    position: absolute;
    bottom: 0;
    left: 50%;
    text-align: center;
    transform: translateX(-50%);
    font-size: .7rem;
    padding: 1rem 0;
    letter-spacing: .05em;
  }
</style>