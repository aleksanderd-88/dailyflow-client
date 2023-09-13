<template>
  <div>
    <TheAppBar />
    <AppLoader />

    <router-view />
    
    <AppFeedback />

    <AppConfirmation 
      headline="Logout"
      text="You have been inactive for 5 minutes and your session has ended. Continue signing out?"
      :is-visible="confirmationIsVisible"
      @close="confirmationIsVisible = false"
      @confirm="logout()"
    />
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
import AppConfirmation from '@/components/molecules/AppConfirmation.vue';

const seconds = ref(0)
const sessionTimeLimit = ref(300) //- Defined in seconds
const isInactive = ref(false)
const timerId = ref<NodeJS.Timer>()
const confirmationIsVisible = ref(false)

const logout = () => {
  useAPIStore().clearData()
  useCurrentUserStore().clearCurrentUser()
  document.removeEventListener('mousemove', onMouseMove)
  location.reload() //- Reload page to prevent it from getting stuck at protected route(s)
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

    //-Do NOT reset timer IF confirmation dialog is open and user has been inactive
    if ( confirmationIsVisible.value )
      document.removeEventListener('mousemove', onMouseMove)
    else document.addEventListener('mousemove', onMouseMove)

    if ( seconds.value === sessionTimeLimit.value ) {
      isInactive.value = true
      confirmationIsVisible.value = true
      sessionTimeLimit.value = 60
      seconds.value = 0
    }

    if ( (seconds.value + 1) === sessionTimeLimit.value && confirmationIsVisible.value )
      return logout()
    
  } else {
    //- Not logged in
    isInactive.value = false
    seconds.value = 0
    clearInterval(timerId.value)
    document.removeEventListener('mousemove', onMouseMove) //- Make sure to remove event listener
  }
})
</script>

<style scoped>

</style>