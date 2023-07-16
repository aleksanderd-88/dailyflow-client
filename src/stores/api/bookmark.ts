import { defineStore } from "pinia";
import API from '@/services/api'
import { useLoadingStore } from "../app/loading";
import { computed, ref } from "vue";

type BookmarkType = {
  description: string
  projectId: string
  isBookmarked: boolean
  taskId: string
  markedAsRead: boolean
}

export const useBookmarkStore = defineStore('bookmark', () => {

  const bookmarks = ref<BookmarkType[]>()
  const bookmarkCount = computed(() => bookmarks.value?.length || 0)

  const createBookmark = (params: { data: Record<string, unknown> } ) => {
    useLoadingStore().setLoading(true)
    return API.createBookmark(params)
      .then(() => listBookmark())
      .catch(err => console.log(err))
      .finally(() => useLoadingStore().setLoading(false))
  }

  const deleteBookmark = (id: string) => {
    useLoadingStore().setLoading(true)
    return API.deleteBookmark(id)
      .then(() => listBookmark())
      .catch(err => console.log(err))
      .finally(() => useLoadingStore().setLoading(false))
  }

  const listBookmark = () => {
    useLoadingStore().setLoading(true)
    return API.listBookmark()
      .then(({ data }) => bookmarks.value = data)
      .catch(err => console.log(err))
      .finally(() => useLoadingStore().setLoading(false))
  }

  return {
    createBookmark,
    deleteBookmark,
    listBookmark,
    bookmarkCount
  }
})