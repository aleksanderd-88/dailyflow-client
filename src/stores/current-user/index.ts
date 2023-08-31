import { defineStore } from "pinia";
import { computed, ref } from 'vue'
import { useLoadingStore } from "../app/loading";
import API from '@/services/api'
import { useAPIStore } from "../api";
import { useBookmarkStore } from "../api/bookmark";

type UserProps = {
  name: string
  email: string
  token: string
  password: string
  confirmedPassword: string
}

export const useCurrentUserStore = defineStore('currentUser', () => {
  const user = ref<UserProps | null>({} as UserProps)

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

  const setCurrentUser = (params: UserProps | null) => {
    user.value = params
    localStorage.setItem('__user__', JSON.stringify(params))
    API.client.defaults.headers.common['Authorization'] = `Bearer ${ params?.token }`
  }

  const clearCurrentUser = () => {
    useAPIStore().clearData()
    useBookmarkStore().clearBookmarks()
    localStorage.removeItem('__user__')
    setCurrentUser(null)
  }

  const currentUser = computed(() => user.value)

  return {
    createUser,
    currentUser,
    authenticateUser,
    setCurrentUser,
    clearCurrentUser
  }
})