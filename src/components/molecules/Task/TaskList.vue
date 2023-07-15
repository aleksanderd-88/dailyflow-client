<template>
  <div class="task-list">
    <TaskListItem 
      v-for="task in tasks" :key="task._id"
      :task="task"
      @click="showActionModal(task)"
    />

    <TaskActionModal 
      :task="task" 
      :is-visible="actionModalIsVisible" 
      @close="actionModalIsVisible = false"
    />
  </div>
</template>

<script setup lang="ts">
import { type PropType, ref } from 'vue'
import TaskListItem from './TaskListItem.vue';
import TaskActionModal from './TaskActionModal.vue';

  type TaskType = {
    _id: string, 
    description: string, 
    completed: boolean, 
    projectId: string
  }

  defineProps({
    tasks: {
      type: Array as PropType<TaskType[]>,
      default: () => ([])
    }
  })

  const actionModalIsVisible = ref(false)
  const task = ref<TaskType>({} as TaskType)

  const showActionModal = (param: TaskType) => {
    task.value = param
    actionModalIsVisible.value = true
  }

</script>

<style lang="scss" scoped>
  .task-list {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }
</style>