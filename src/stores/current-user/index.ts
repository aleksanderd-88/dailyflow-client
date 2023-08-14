import { defineStore } from "pinia";
import { computed, ref } from 'vue'
import { useLoadingStore } from "../app/loading";
import API from '@/services/api'

type UserProps = {
  name: string
  email: string
  token: string
  password: string
  confirmedPassword: string
}

export const useCurrentUserStore = defineStore('currentUser', () => {
  const user = ref({} as UserProps)

  const createUser = (params: Partial<UserProps>) => {
    useLoadingStore().setLoading(true)
    return API.createUser({ data: params })
      .then(({ data }) => setCurrentUser(data))
      .catch(err => {
        console.log(err)
        clearCurrentUser() //- Clear current user
      })
      .finally(() => useLoadingStore().setLoading(false))
  }

  const authenticateUser = (params: Partial<UserProps>) => {
    useLoadingStore().setLoading(true)
    return API.authenticateUser({ data: params })
      .then(({ data }) => setCurrentUser(data))
      .catch(err => {
        console.log(err)
        clearCurrentUser() //- Clear current user
      })
      .finally(() => useLoadingStore().setLoading(false))
  }

  const setCurrentUser = (params: UserProps) => {
    user.value = params
    localStorage.setItem('__user__', JSON.stringify(params))
    API.client.defaults.headers.common['Authorization'] = `Bearer ${ params?.token }`
  }

  const clearCurrentUser = () => {
    localStorage.removeItem('__user__')
    setCurrentUser({} as UserProps)
  }

  const currentUser = computed(() => user.value)

  return {
    createUser,
    currentUser,
    authenticateUser,
    setCurrentUser
  }
})