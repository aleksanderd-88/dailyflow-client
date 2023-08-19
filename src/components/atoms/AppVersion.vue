<template>
  <section class="app-version">
    <p class="app-version__client">Client version &middot; {{ appVersion() }}</p>
    <p class="app-version__api">API version &middot; {{ apiVersion }}</p>
  </section>
</template>

<script setup lang="ts">
import { appVersion } from '@/utils/version/getVersion'
import API from '@/services/api'
import { ref } from 'vue';

const apiVersion = ref<number | string | null>(null)

const getAPIversion = async () => {
  return API.getAPIversion().then(({ data }) => apiVersion.value = data)
  .catch(err => console.log(err))
}

getAPIversion()

</script>

<style lang="scss" scoped>
  .app-version {
    font-size: .7rem;
    padding: .25rem 0 0;
    width: 100%;
    display: flex;
    margin-top: 2rem;
    flex-direction: column;
    justify-content: flex-end;
    letter-spacing: .05em;
  }
</style>