<template>
  <form @submit.prevent="authUser()">
    <LvInput
      type="text" 
      v-model="credentials.email" 
      label="Email" 
      bottom-bar
      floating-label
      data-test="email"
    />

    <LvInput
      type="password" 
      v-model="credentials.password" 
      label="Password" 
      bottom-bar
      floating-label
      data-password
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
import { useCurrentUserStore } from '@/stores/current-user'
import { useRouter } from 'vue-router';

  const input = {
    email: '',
    password: ''
  }

  const userStore = useCurrentUserStore()
  const router = useRouter()

  const credentials = reactive({ ...input })

  const authUser = () => {
    const isNotValid = Boolean(!credentials || Object.values(credentials).some(c => c === ''))
    if ( isNotValid ) return

    return userStore.authenticateUser(credentials)
      .then(() => router.replace({ name: 'overview' }))
  }
</script>

<style scoped>

</style>