<template>
  <button class="bookmark-item" @click="navigateTo()">
    <p class="bookmark-item__description">{{ bookmark?.description }}</p>
    <span class="material-symbols-outlined">
      visibility
    </span>
  </button>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import { useRouter } from 'vue-router';

  type BookmarkType = {
    description: string
    projectId: string
    isBookmarked: boolean
    taskId: string
    markedAsRead: boolean
  }

  const props = defineProps({
    bookmark: {
      type: Object as PropType<BookmarkType>,
      default: () => ({})
    }
  })

  const emit = defineEmits<{
    (event: 'close'): void
  }>()

  const router = useRouter()

  const navigateTo = () => {
    router.push({
      name: 'projectOverview',
      params: {
        id: props.bookmark.projectId,
        taskId: props.bookmark.taskId
      }
    })
    emit('close')
  }
</script>

<style lang="scss" scoped>
  .bookmark-item {
    display: flex;
    padding: 0;
    justify-content: space-between;
    align-items: center;
    text-align: left;

    &__description {
      font-weight: 200;
      letter-spacing: .05em;
    }
  }
</style>