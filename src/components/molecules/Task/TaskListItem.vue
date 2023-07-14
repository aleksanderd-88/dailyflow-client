<template>
  <button type="button" class="task-item" :class="modifiedClass">
    <p class="task-item__description">
      {{ task.description }}
    </p>
    
    <button 
      type="button" 
      class="task-item__action-btn" 
      @click.stop="taskBookmarked = !taskBookmarked">

      <span class="material-symbols-outlined">
        grade
      </span>

    </button>
  </button>
</template>

<script setup lang="ts">
import { ref, type PropType, computed } from 'vue'
  const props = defineProps({
    task: {
      type: Object as PropType<{ _id: string, description: string, completed: boolean }>,
      default: () => ({})
    }
  })

  const taskBookmarked = ref(false)

  const modifiedClass = computed(() => {

    let className = ''

    if ( taskBookmarked.value ) {
      className += 'task-item--bookmark'
    }
    if ( props.task.completed ) {
      className += ' task-item--complete'
    }
    return className
  })
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