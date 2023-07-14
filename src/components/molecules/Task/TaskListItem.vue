<template>
  <div class="task-item">
    <p class="task-item__description">
      {{ task.description }}
    </p>
    
    <button 
      type="button" 
      class="task-item__action-btn" 
      :class="modifiedClass" 
      @click="taskBookmarked = !taskBookmarked">

      <span class="material-symbols-outlined">
        grade
      </span>
      
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, type PropType, computed } from 'vue'
  defineProps({
    task: {
      type: Object as PropType<{ _id: string, description: string, completed: boolean }>,
      default: () => ({})
    }
  })

  const taskBookmarked = ref(false)

  const modifiedClass = computed(() => taskBookmarked.value && 'task-item__action-btn--bookmark')
</script>

<style lang="scss" scoped>
  .task-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;

    &__description {
      font-size: .8rem;
    }

    &__action-btn {
      &--bookmark {
        span {
          color: #ffeb3b;
        }
      }
    }
  }
</style>