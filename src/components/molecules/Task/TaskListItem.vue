<template>
  <button type="button" class="task-item" :class="modifiedClass">
    <div class="flex-content">
      <span class="material-symbols-outlined" v-if="task.completed">
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

      <span class="material-symbols-outlined">
        grade
      </span>

    </button>
  </button>
</template>

<script setup lang="ts">
import { type PropType, computed } from 'vue'
import { useBookmarkStore } from '@/stores/api/bookmark';
import { useAPIStore } from '@/stores/api';

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

  const modifiedClass = computed(() => {

    let className = ''

    if ( props.task.isBookmarked ) {
      className += 'task-item--bookmark'
    }
    if ( props.task.completed ) {
      className += ' task-item--complete'
    }
    return className
  })

  const bookmark = (task: TaskType) => {

    if ( task.isBookmarked ) {
      return useBookmarkStore().deleteBookmark(task._id)
        .then(() => useAPIStore().getProject(task.projectId))
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
    padding: 0 1rem;

    &__description {
      font-size: .8rem;
    }

    &--bookmark {
      #{$root}__action-btn {
        span {
          color: #ffc400;
        }
      }
    }

    &--complete {
      #{$root}__description {
        color: #ccc;
        text-decoration: line-through;
      }
    }
  }
</style>