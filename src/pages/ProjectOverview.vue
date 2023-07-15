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

    <main class="project-overview__content l-base__content">
      <TaskList 
        :tasks="tasks"
        @edit="setEditMode($event)"
      />

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
        :input="task.description"
        :label="label"
        :editMode="isEditMode" 
        @close="closeForm()"
        @submit="createTask($event)"
      />
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onBeforeRouteLeave, useRouter } from 'vue-router';
import { useAPIStore } from '@/stores/api';
import { computed, ref, watch } from 'vue';
import { useLoadingStore } from '@/stores/app/loading'
import AppForm from '@/components/molecules/AppForm.vue';
import TaskList from '@/components/molecules/Task/TaskList.vue'

  type TaskType = {
    _id: string, 
    description: string, 
    completed: boolean, 
    projectId: string
  }

  const task = ref({} as TaskType)
  const isEditMode = ref(false)
  const router = useRouter()
  const searchbarIsVisible = ref(false)
  const resolvedTaskListIsVisible = ref(true)

  onBeforeRouteLeave((to, from) => {
    if ( searchbarIsVisible.value ) {
      searchbarIsVisible.value = false
      return false
    }
  })

  watch(() => searchbarIsVisible.value, (val) => {
    if ( !val ) {
      isEditMode.value = false
      task.value = {} as TaskType
    }
  })

  const label = computed(() => isEditMode.value ? 'Edit description' : 'Give your task a description')

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

    if ( isEditMode.value )
      return useAPIStore().editTask(task.value._id?.toString(), { data })

    useAPIStore().createTask({ data })
  }

  const setEditMode = (param: TaskType) => {
    searchbarIsVisible.value = true
    task.value = param
    isEditMode.value = true
  }

  const closeForm = () => searchbarIsVisible.value = false
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

      @media (min-width: 1024px) {
        padding-left: 4rem;
      }
    }

    &__content {
      height: 100%;
      min-height: calc(100vh - 210px);
      @media (min-width: 1024px) {
        width: 1024px;
        margin: auto;
      }
    }

    &__hide-resolved-btn {
      width: 100%;
      margin: 4rem auto;
      justify-content: center;
      padding: 10px 20px;
      border-radius: 40px;
      font-weight: 500;
      background-color: rgba(#C4ACFC, .2);
      color: #2D383D;

      @media (min-width: 400px) {
        width: 200px;
      }
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

      @media (min-width: 1024px) {
        right: 3rem;
        bottom: 2rem;
      }
    }
  }
</style>