import { defineStore } from "pinia";
import { computed, ref } from "vue";
import API from '@/services/api'

export const useAPIStore = defineStore('api', () => {
  const projects = ref<{ name: string, _id: string }[]>([])

  const createProject = async (params: { data: Record<string, unknown>}) => {
    return API.createProject(params).then(() => listProjects())
    .catch(err => console.log(err))
  }

  const listProjects = () => {
    API.listProjects().then(({ data }) => projects.value = data)
    .catch(error => console.log(error))
  } 

  const items = computed(() => projects.value)

  return {
    createProject,
    listProjects,
    items
  }
})