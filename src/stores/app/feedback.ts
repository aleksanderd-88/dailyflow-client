import { defineStore } from "pinia";
import { ref, computed } from 'vue'

export const useFeedbackStore =  defineStore('feedback', () => {
  const is_visible = ref(false)
  const text = ref('')
  const mode = ref('')

  const setFeedbackVisibility = (value: boolean, text = 'No custom text was provided',  status = '') => {
    is_visible.value = value
    mode.value = status
    setFeedbackText(text)

    setTimeout(() => clearFeedback(), 5000);
  }

  const setFeedbackText = (value: string) => {
    text.value = value
  }

  const closeFeedback = () => clearFeedback()

  const clearFeedback = () => {
    is_visible.value = false
    text.value = ''
    mode.value = ''
  }


  const isVisible = computed(() => is_visible.value)
  const onError = computed(() => mode.value === 'error')

  return {
    setFeedbackVisibility,
    setFeedbackText,
    isVisible,
    text,
    onError,
    closeFeedback
  }
})