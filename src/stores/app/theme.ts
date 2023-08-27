import { defineStore } from "pinia";
import { ref, computed, watch } from 'vue'
import { useFeedbackStore } from "./feedback";
import { userIsLoggedIn } from "@/utils/authentication";

export const useThemeStore = defineStore('theme', () => {
  const themeMode = ref(JSON.parse(localStorage.getItem('__dark-mode__') as string) || false)
  const isDarkMode = computed(() => themeMode.value)

  watch(() => isDarkMode.value, (value: boolean) => {
    document.body.classList.toggle('dark-mode')
    localStorage.setItem('__dark-mode__', JSON.stringify(value))
  }, { immediate: true })

  watch(() => userIsLoggedIn(), val => {
    if ( !val ) {
      resetThemeMode()
    }
  }, { immediate: true })

  const setTheme = () => {
    themeMode.value = !themeMode.value
    useFeedbackStore().setFeedbackVisibility(true, `Theme has been set to ${ isDarkMode.value ? 'dark' : 'light' } mode`)
  }

  const resetThemeMode = () => {
    document.body.classList.remove('dark-mode')
    themeMode.value = false
  }

  return {
    isDarkMode,
    setTheme
  }
})