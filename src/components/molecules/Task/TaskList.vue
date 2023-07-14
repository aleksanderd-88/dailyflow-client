<template>
  <div class="task-list">
    <TaskListItem 
      v-for="task in tasks" :key="task._id"
      :task="task"
      @click="markComplete(task._id, task.projectId, task.completed)"
    />
  </div>
</template>

<script setup lang="ts">
import { type PropType } from 'vue'
import TaskListItem from './TaskListItem.vue';
import API from '@/services/api'
import { useAPIStore } from '@/stores/api';

  defineProps({
    tasks: {
      type: Array as PropType<{ _id: string, description: string, completed: boolean, projectId: string }[]>,
      default: () => ([])
    }
  })

  const markComplete = (id: string, projectId: string, completed = false) => {
    let text = 'Mark as resolved?'
    if ( completed ) 
      text = 'Mark as un-resolved?'

    if ( !confirm(text) ) return
    
    API.markComplete(id).then(() => useAPIStore().getProject(projectId))
    .catch((err) => console.log(err))
  }

</script>

<style lang="scss" scoped>
  .task-list {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }
</style>