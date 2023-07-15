<template>
  <AppOverlay :is-visible="isVisible" @close="$emit('close')">
    <div class="action-modal" :class="modifiedClass">
      <button type="button" class="close-btn" @click.stop="$emit('close')">
        <span class="material-symbols-outlined">
          close
        </span>
      </button>
      
      <section class="action-modal__actions">
        <h1 class="action-modal__headline">Choose following actions</h1>
        <button 
          type="button" 
          class="action-modal__action-btn action-modal__action-btn--edit-btn"
          @click="editTask(task)"
          :disabled="task.completed"
        >
          Edit
          <span class="material-symbols-outlined">
            edit_note
          </span>
        </button>
  
        <button 
          type="button" 
          class="action-modal__action-btn action-modal__action-btn--mark-resolved-btn"
          @click="markComplete(task._id, task.projectId)"
        >
          {{ task.completed ? 'Mark as un-resolved' : 'Mark resolved' }}
          <span class="material-symbols-outlined">
            done
          </span>
        </button>
  
        <button 
          type="button" 
          class="action-modal__action-btn action-modal__action-btn--delete-btn"
        >
          Delete
          <span class="material-symbols-outlined">
            delete
          </span>
        </button>
      </section>
    </div>
  </AppOverlay>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue';
import API from '@/services/api'
import { useAPIStore } from '@/stores/api';
import AppOverlay from '@/components/organisms/AppOverlay.vue';

  type TaskType = {
    _id: string, 
    description: string, 
    completed: boolean, 
    projectId: string
  }

  const props = defineProps({
    task: {
      type: Object as PropType<TaskType>,
      required: true
    },
    isVisible: {
      type: Boolean,
      default: false
    }
  })

  const emit = defineEmits<{
    (event: 'close'): void
    (event: 'edit', task: TaskType): void
  }>()

  const modifiedClass = computed(() => props.isVisible && 'action-modal--visible')

  const markComplete = (id: string, projectId: string) => {
    API.markComplete(id).then(() => useAPIStore().getProject(projectId))
    .catch((err) => console.log(err))
    .finally(() => emit('close'))
  }

  const editTask = (task: TaskType) => {
    emit('edit', task)
    emit('close')
  }
</script>

<style lang="scss" scoped>
  .action-modal {
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 95%;
    max-width: 250px;
    border-radius: 3px;
    opacity: 0;
    visibility: hidden;
    transform-origin: center;
    transform: translate(-50%, 1px);
    transition: transform .25s, visibility .25s, opacity .25s ease;

    &__headline {
      font-size: 1rem;
      width: 80%;
    }

    &__actions {
      gap: 1rem;
      display: flex;
      flex-direction: column;
      padding: 4rem 1rem 2rem;
    }

    &__action-btn {
      gap: 1rem;
      width: 100%;
      height: 40px;
      border-radius: 3px;
      color: #fff;
      justify-content: space-between;

      span {
        font-size: 1.2rem;
      }

      &--edit-btn {
        background-color: #00b0ff;
      }
      &--mark-resolved-btn {
        background-color: #00e676;
      }
      &--delete-btn {
        background-color: lighten(#ff3d00, 5%);
      }
    }

    &--visible {
      transform: translate(-50%, -50%);
      opacity: 1;
      visibility: visible;
    }
  }
</style>