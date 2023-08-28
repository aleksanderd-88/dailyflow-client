<template>
  <button type="button" class="task-item" :class="modifiedClass">
    <div class="flex-content">
      <span class="material-symbols-outlined task-item__complete-icon" v-if="task.completed">
        done
      </span>
      
      <p class="task-item__description">
        {{ task.description }}
      </p>
    </div>
    
    <button
      type="button" 
      class="task-item__action-btn" 
      @click.stop="bookmark(task)">

      <span class="material-symbols-outlined task-item__bookmark-icon">
        grade
      </span>

    </button>
  </button>
</template>

<script setup lang="ts">
import { type PropType, computed, ref, watch } from 'vue'
import { useBookmarkStore } from '@/stores/api/bookmark';
import { useAPIStore } from '@/stores/api';
import { useRoute, useRouter } from 'vue-router';

  type TaskType = {
    _id: string, 
    description: string, 
    completed: boolean, 
    projectId: string
    isBookmarked: boolean
  }

  const props = defineProps({
    task: {
      type: Object as PropType<TaskType>,
      default: () => ({})
    }
  })

  const route = useRoute()
  const router = useRouter()
  const isHighlighted = ref(false)

  watch(() => route.params.taskId, val => {
    if (val && props.task._id === val) {
      isHighlighted.value = true

      const timerId = setTimeout(() => {
        isHighlighted.value = false
        clearTimeout(timerId)
      }, 2500);
    }
  }, { immediate: true })

  const modifiedClass = computed(() => {

    let className = ''

    if ( props.task.isBookmarked ) {
      className += 'task-item--bookmark'
    }
    if ( props.task.completed ) {
      className += ' task-item--complete'
    }
    if ( isHighlighted.value ) {
      className += ' task-item--highlight'
    }
    return className
  })

  const bookmark = (task: TaskType) => {

    if ( task.isBookmarked ) {
      return useBookmarkStore().deleteBookmark(task._id)
        .then(() => {
          router.replace({ name: 'projectOverview', params: { taskId: '' } })
          useAPIStore().getProject(task.projectId)
        })
    }

    const data = {
      description: task.description,
      projectId: task.projectId,
      isBookmarked: true,
      taskId: task._id,
      markedAsRead: true
    }

    useBookmarkStore().createBookmark({ data })
      .then(() => useAPIStore().getProject(task.projectId))
  }
</script>

<style lang="scss" scoped>
  .task-item {
    $root: &;

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 1rem;
    border-radius: 3px;
    text-align: left;
    transition: background-color .25s ease;

    &__description {
      font-size: .8rem;
    }

    &--complete {
      #{$root}__description {
        color: #ccc;
        text-decoration: line-through;
      }
    }

    &--highlight {
      background-color: rgba(#C4ACFC, .15);
    }

    @media (min-width: 1024px) {
      &:hover {
        background-color: darken(#EFEFF5, 2%)
      }
    }

    body.dark-mode & {

      &__complete-icon {
        color: $themeWhite;
      }

      &__description {
        color: $themeWhite;
      }

      @media (min-width: 1024px) {
        &:hover {
          background-color: $darkColor
        }
      }

      &__bookmark-icon {
        color: $themeWhite;
      }
    }

    &--bookmark {
      #{$root}__action-btn {
        span {
          color: #ffc400;
        }
      }
    }
  }
</style>