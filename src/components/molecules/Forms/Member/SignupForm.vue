<template>
  <form @submit.prevent>
    <LvInput
      type="text" 
      v-model="credentials.name" 
      label="Email" 
      bottom-bar
      floating-label
    />

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

    <LvInput
      type="text" 
      v-model="credentials.confirmedPassword" 
      label="Repeat password" 
      bottom-bar
      floating-label
    />

    <LvButton 
      label="Login"
      type="submit" 
    />

    <router-link
      :style="{ textAlign: 'center', marginTop: '1rem', display: 'block' }" 
      :to="{ name: 'login' }"
    >
      Already have an account? Log in here.
    </router-link>
  </form>
</template>

<script setup lang="ts">
import LvInput from 'lightvue/input';
import LvButton from 'lightvue/button'
import { reactive } from 'vue';

  const input = {
    name: '',
    email: '',
    password: '',
    confirmedPassword: ''
  }

  const credentials = reactive({ ...input })
</script>

<style scoped>

</style>