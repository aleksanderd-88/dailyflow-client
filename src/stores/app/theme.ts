import { defineStore } from "pinia";
import { ref, computed, watchEffect } from 'vue'
import { useFeedbackStore } from "./feedback";
import { userIsLoggedIn } from "@/utils/authentication";
import API from '@/services/api'
import { useLoadingStore } from "./loading";
import { useCurrentUserStore } from "../current-user";

export const useThemeStore = defineStore('theme', () => {
  
  const isThemeDark = computed(() => Boolean(useCurrentUserStore().currentUser?.darkMode))
  const darkMode = ref(false)

  const toggleTheme = () => {
    useLoadingStore().setLoading(true)

    if ( !isThemeDark.value ) {
      darkMode.value = true
    } else {
      darkMode.value = false
    }

    const params = { data: { darkMode: darkMode.value } }
    const id = useCurrentUserStore().currentUser?._id as string

    API.updateUser(id, params).then(({ data }) => {
      useFeedbackStore().setFeedbackVisibility(true, `Theme has been set to ${ data.darkMode ? 'dark' : 'light' } mode`)
      useCurrentUserStore().setCurrentUser(data)
    })
    .catch(err => {
      console.log(err)
      useFeedbackStore().setFeedbackVisibility(true, 'Something went wrong ...', 'error', 5000)
    })
    .finally(() => useLoadingStore().setLoading(false))
  }

  watchEffect(() => {

    //- Always remove dark mode styles when not logged in
    if ( !userIsLoggedIn() )
      return document.body.classList.remove('dark-mode')

    if ( isThemeDark.value ) {
      darkMode.value = isThemeDark.value
      return document.body.classList.add('dark-mode')
    }

    document.body.classList.remove('dark-mode')
  })

  return {
    darkMode,
    toggleTheme
  }
})