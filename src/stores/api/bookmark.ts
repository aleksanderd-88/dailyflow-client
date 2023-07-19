import { defineStore } from "pinia";
import API from '@/services/api'
import { useLoadingStore } from "../app/loading";
import { computed, ref } from "vue";
import { useFeedbackStore } from "../app/feedback";

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
      .then(() => {
        listBookmark()
        useFeedbackStore().setFeedbackVisibility(true, 'Bookmark added.')
      })
      .catch(error => {
        console.log(error)
        useFeedbackStore().setFeedbackVisibility(true, 'Something went wrong ...', 'error')
      })
      .finally(() => useLoadingStore().setLoading(false))
  }

  const deleteBookmark = (id: string) => {
    useLoadingStore().setLoading(true)
    return API.deleteBookmark(id)
      .then(() => {
        listBookmark()
        useFeedbackStore().setFeedbackVisibility(true, 'Bookmark removed.')
      })
      .catch(error => {
        console.log(error)
        useFeedbackStore().setFeedbackVisibility(true, 'Something went wrong ...', 'error')
      })
      .finally(() => useLoadingStore().setLoading(false))
  }

  const listBookmark = () => {
    useLoadingStore().setLoading(true)
    return API.listBookmark()
      .then(({ data }) => bookmarks.value = data)
      .catch(err => console.log(err))
      .finally(() => useLoadingStore().setLoading(false))
  }

  const items = computed(() => bookmarks.value || [])
  const itemCount = computed(() => bookmarkCount.value)

  return {
    createBookmark,
    deleteBookmark,
    listBookmark,
    items,
    itemCount
  }
})