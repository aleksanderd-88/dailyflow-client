import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useLoadingStore = defineStore('app', () => {

  const is_loading = ref(false)

  const setLoading = (value: boolean) => is_loading.value = value

  const isLoading = computed(() => is_loading.value)
  
  return {
    setLoading,
    isLoading
  }
})