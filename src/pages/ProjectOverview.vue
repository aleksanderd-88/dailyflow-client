<template>
  <div class="project-overview l-base">
    <header class="project-overview__info">

      <button type="button" class="project-overview__back-btn" @click="navigateBack()">
        <span class="material-symbols-outlined">
          arrow_left_alt
        </span>
      </button>

      <div class="horizontal-center-align">
        <h1 class="project-overview__name" v-if="!isLoading">{{ project?.name }}</h1>
        <p class="project-overview__task-count" v-if="taskCount">{{ `${ taskCount } ${(taskCount > 1 ? 'items' : 'item')}` }}</p>
      </div>

    </header>

    <main class="l-base__content">
      <TaskList :tasks="tasks" />

      <button
        v-if="resolvedTasks?.length"
        type="button" 
        class="project-overview__hide-resolved-btn"
        @click="resolvedTaskListIsVisible = !resolvedTaskListIsVisible"
      >
        {{ `${ resolvedTaskListIsVisible ? 'HIDE RESOLVED' : 'SHOW RESOLVED' }` }}
      </button>

      <TaskList :tasks="resolvedTasks" v-if="resolvedTaskListIsVisible" />
    </main>

    <footer>
      <button type="button" class="project-overview__action-btn" @click="searchbarIsVisible = true">
        <span class="material-symbols-outlined material-symbols-outlined--medium">
          add
        </span>
      </button>
      
      <AppForm 
        :is-visible="searchbarIsVisible"
        label="Give your task a description" 
        @close="searchbarIsVisible = false"
        @submit="createTask($event)"
      />
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAPIStore } from '@/stores/api';
import { computed, ref } from 'vue';
import { useLoadingStore } from '@/stores/app/loading'
import AppForm from '@/components/molecules/AppForm.vue';
import TaskList from '@/components/molecules/Task/TaskList.vue'

  const router = useRouter()
  const searchbarIsVisible = ref(false)
  const resolvedTaskListIsVisible = ref(true)

  const isLoading = computed(() => useLoadingStore().isLoading.value)

  const project = computed(() => useAPIStore().item)
  const tasks = computed(() => project.value?.tasks.filter(task => !task.completed) || [])
  const resolvedTasks = computed(() => project.value?.tasks.filter(task => task.completed))

  const taskCount = computed(() => project.value?.tasks.length)

  const navigateBack = () => router.go(-1)

  const createTask = (description: string) => {
    const data = {
      projectId: project.value?._id,
      description
    }

    useAPIStore().createTask({ data })
  }
</script>

<style lang="scss" scoped>
  .project-overview {
    background-color: #EFEFF5;
    &__info {
      height: 150px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 1rem;
      text-align: center;
    }

    &__back-btn {
      span {
        font-size: 3rem;
      }
    }

    &__content {
      text-align: center;
    }

    &__hide-resolved-btn {
      width: 50%;
      margin: 4rem auto;
      justify-content: center;
      padding: 10px 20px;
      border-radius: 40px;
      font-weight: 500;
      background-color: rgba(#C4ACFC, .2);
      color: #2D383D;
    }

    &__action-btn {
      position: fixed;
      bottom: 1rem;
      right: 1rem;
      width: 60px;
      height: 60px;
      color: #fff;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      background-color: #2D383D;
      box-shadow: 0 7px 12px -4px rgba(#000, .5);
    }
  }
</style>