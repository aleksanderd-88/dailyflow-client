import { defineStore } from "pinia";
import { ref, computed, watchEffect } from 'vue'
import { useFeedbackStore } from "./feedback";
import { userIsLoggedIn } from "@/utils/authentication";

export const useThemeStore = defineStore('theme', () => {
  
  const isThemeDark = computed(() => Boolean(JSON.parse(localStorage.getItem('__dark-mode__') as string)))
  const darkMode = ref(isThemeDark.value || false)

  const toggleTheme = () => {
    if ( !darkMode.value ) {
      darkMode.value = true
    } else {
      darkMode.value = false
    }

    localStorage.setItem('__dark-mode__', JSON.stringify(darkMode.value))
    useFeedbackStore().setFeedbackVisibility(true, `Theme has been set to ${ darkMode.value ? 'dark' : 'light' } mode`)
  }

  watchEffect(() => {

    //- Always remove dark mode styles when not logged in
    if ( !userIsLoggedIn() )
      return document.body.classList.remove('dark-mode')

    //- Store setting in local storage
    localStorage.setItem('__dark-mode__', JSON.stringify(darkMode.value))

    if ( darkMode.value )
      return document.body.classList.add('dark-mode')

    document.body.classList.remove('dark-mode')
  })

  return {
    darkMode,
    toggleTheme
  }
})