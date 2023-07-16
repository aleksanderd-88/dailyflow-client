import { defineStore } from "pinia";
import API from '@/services/api'
import { useLoadingStore } from "../app/loading";

export const useBookmarkStore = defineStore('bookmark', () => {

  const createBookmark = (params: { data: Record<string, unknown> } ) => {
    useLoadingStore().setLoading(true)
    return API.createBookmark(params)
      .then(({ data }) => console.log(data))
      .catch(err => console.log(err))
      .finally(() => useLoadingStore().setLoading(false))
  }

  const deleteBookmark = (id: string) => {
    useLoadingStore().setLoading(true)
    return API.deleteBookmark(id)
      .then(({ data }) => console.log(data))
      .catch(err => console.log(err))
      .finally(() => useLoadingStore().setLoading(false))
  }

  return {
    createBookmark,
    deleteBookmark
  }
})