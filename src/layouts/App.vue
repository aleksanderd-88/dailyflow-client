<template>
  <div>
    <TheAppBar />
    <AppLoader />

    <router-view />
    
    <AppFeedback />
  </div>
</template>

<script setup lang="ts">
import AppLoader from '@/components/atoms/AppLoader.vue';
import AppFeedback from '@/components/molecules/AppFeedback.vue';
import TheAppBar from '@/components/molecules/TheAppBar.vue'
import { useCurrentUserStore } from '@/stores/current-user';
import { ref, watchEffect } from 'vue';
import { userIsLoggedIn } from '@/utils/authentication';
import { useAPIStore } from '@/stores/api';
import { useRouter } from 'vue-router';

const router = useRouter()
const seconds = ref(0)
const sessionTimeLimit = ref(300) //- Defined in seconds
const isInactive = ref(false)
const timerId = ref<NodeJS.Timer>()

const logout = () => {
  useAPIStore().clearData()
  useCurrentUserStore().clearCurrentUser()
  document.removeEventListener('mousemove', onMouseMove)
  router.replace('/')
}

const setIntervalCounter = () => seconds.value++

const resetTimer = () => {
  seconds.value = 0
  clearInterval(timerId.value)
  timerId.value = setInterval(() => setIntervalCounter(), 1000)
}

const onMouseMove = () => resetTimer()

watchEffect(() => {
  if ( userIsLoggedIn() ) {
    //- Logged in
    document.addEventListener('mousemove', onMouseMove)

    if ( seconds.value === sessionTimeLimit.value ) {
      isInactive.value = true
      clearInterval(timerId.value)

      if ( isInactive.value ) {
        if ( !confirm('You have been inactive for 5 minutes and your session has ended. Continue signing out?') ) {
          clearInterval(timerId.value)
          return
        } 

        isInactive.value = false
        logout()
      }
    }
  } else {
    //- Not logged in
    clearInterval(timerId.value)
    document.removeEventListener('mousemove', onMouseMove) //- Make sure to remove event listener
  }
})
</script>

<style scoped>

</style>