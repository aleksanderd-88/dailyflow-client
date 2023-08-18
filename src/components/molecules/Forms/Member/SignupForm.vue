<template>
  <form @submit.prevent="createUser()">
    <LvInput
      type="text" 
      v-model="credentials.name" 
      label="Name" 
      bottom-bar
      floating-label
    />

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
    />

    <LvInput
      type="password" 
      v-model="credentials.confirmedPassword" 
      label="Repeat password" 
      bottom-bar
      floating-label
    />

    <LvButton 
      label="Sign up"
      type="submit" 
    />

    <router-link
      :style="{ 
        textAlign: 'center', 
        marginTop: '1rem', 
        display: 'block',
        fontSize: '0.8rem'
      }" 
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
import { useCurrentUserStore } from '@/stores/current-user'
import { useRouter } from 'vue-router';

  const input = {
    name: '',
    email: '',
    password: '',
    confirmedPassword: ''
  }

  const credentials = reactive({ ...input })

  const userStore = useCurrentUserStore()
  const router = useRouter()

  const createUser = () => {
    const isNotValid = Boolean(!credentials || Object.values(credentials).some(c => c === ''))
    if ( isNotValid ) return

    return userStore.createUser(credentials)
      .then(() => router.replace({ name: 'overview' }))
  }
</script>

<style scoped>

</style>