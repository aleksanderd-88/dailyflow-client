<template>
  <p class="app-version">Version &middot; {{ appVersion() }}</p>
</template>

<script setup lang="ts">
import { appVersion } from '@/utils/version/getVersion'

</script>

<style lang="scss" scoped>
  .app-version {
    text-align: center;
    font-size: .7rem;
    padding: .25rem 0 0;
    width: 100%;
    display: flex;
    margin-top: 2rem;
    justify-content: flex-end;
    letter-spacing: .05em;
  }
</style>