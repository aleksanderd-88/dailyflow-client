<template>
  <AppOverlay :is-visible="isVisible" @close="close()">
    <div class="action-modal" :class="modifiedClass">
      <AppCloseButton @close="close()" />
      
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
          :style="task.completed ? { backgroundColor: '#ffc400' } : {}"
          @click="markComplete(task._id, task.projectId)"
        >
          {{ task.completed ? 'Mark as un-resolved' : 'Mark as resolved' }}
          <span class="material-symbols-outlined">
            {{ task.completed ? 'remove_done' : 'done' }}
          </span>
        </button>
  
        <button 
          type="button" 
          class="action-modal__action-btn action-modal__action-btn--delete-btn"
          @click="deleteTask(task._id)"
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
import AppCloseButton from '@/components/atoms/AppCloseButton.vue'
import { useLoadingStore } from '@/stores/app/loading';

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

  const isLoading = computed(() => useLoadingStore().isLoading)

  const modifiedClass = computed(() => {
    let className = ''
    if ( props.isVisible )
      className += ' action-modal--visible'
    if ( isLoading.value )
      className += ' action-modal--disabled'

    return className
  })

  const markComplete = (id: string, projectId: string) => {
    API.markComplete(id).then(() => useAPIStore().getProject(projectId))
    .catch((err) => console.log(err))
    .finally(() => close())
  }

  const editTask = (task: TaskType) => {
    emit('edit', task)
    close()
  }

  const deleteTask = (id: string) => {
    if ( !confirm('You are about to delete this task. Do you wish to continue?') ) return

    useAPIStore().deleteTask(id).then(() => close())
  }

  const close = () => {
    if ( isLoading.value ) return
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
        background-color: darken(#00e676, 5%);
      }
      &--delete-btn {
        background-color: lighten(#ff3d00, 5%);
      }
    }

    &--disabled {
      &::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
      }
    }

    &--visible {
      transform: translate(-50%, -50%);
      opacity: 1;
      visibility: visible;
    }
  }
</style>