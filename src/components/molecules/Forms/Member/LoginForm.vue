<template>
  <form @submit.prevent>
    <LvInput
      type="text" 
      v-model="credentials.email" 
      label="Email" 
      bottom-bar
      floating-label
    />

    <LvInput
      type="text" 
      v-model="credentials.password" 
      label="Password" 
      bottom-bar
      floating-label 
    />

    <LvButton 
      label="Login"
      type="submit" 
    />

    <router-link
      :style="{ 
        textAlign: 'center', 
        marginTop: '1rem', 
        display: 'block',
        fontSize: '0.8rem'
      }"
      :to="{ name: 'signup' }"
    >
      Don't have an account? Sign up here.
    </router-link>
  </form>
</template>

<script setup lang="ts">
import LvInput from 'lightvue/input';
import LvButton from 'lightvue/button'
import { reactive } from 'vue';

  const input = {
    email: '',
    password: ''
  }

  const credentials = reactive({ ...input })
</script>

<style scoped>

</style>