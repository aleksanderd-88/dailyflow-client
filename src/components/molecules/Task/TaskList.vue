<template>
  <div class="task-list">
    <TaskListItem 
      v-for="task in tasks" :key="task._id"
      :task="task"
    />
  </div>
</template>

<script setup lang="ts">
import { type PropType } from 'vue'
import TaskListItem from './TaskListItem.vue';

  defineProps({
    tasks: {
      type: Array as PropType<{ _id: string, description: string, completed: boolean }[]>,
      default: () => ([])
    }
  })

</script>

<style lang="scss" scoped>
  .task-list {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }
</style>