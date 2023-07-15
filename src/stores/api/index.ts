import { defineStore } from "pinia";
import { computed, ref } from "vue";
import API from '@/services/api'
import { useLoadingStore } from "../app/loading";

type TaskType = {
  _id: string, 
  description: string, 
  completed: boolean, 
  projectId: string
}

export const useAPIStore = defineStore('api', () => {
  const projects = ref<{ name: string, _id: string, tasks: TaskType[] }[]>([])
  const project = ref<{ name: string, _id: string, tasks: TaskType[] }>()

  const createProject = async (params: { data: Record<string, unknown>}) => {
    useLoadingStore().setLoading(true)
    return API.createProject(params).then(() => listProjects())
    .catch(err => console.log(err))
    .finally(() => useLoadingStore().setLoading(false))
  }

  const listProjects = () => {
    useLoadingStore().setLoading(true)
    API.listProjects().then(({ data }) => projects.value = data)
    .catch(error => console.log(error))
    .finally(() => useLoadingStore().setLoading(false))
  } 

  const getProject = (id: string) => {
    useLoadingStore().setLoading(true)
    return API.getProject(id).then(({ data }) => {
      project.value = data
      return data
    })
    .catch(error => console.log(error))
    .finally(() => useLoadingStore().setLoading(false))
  } 

  const deleteProject = (id: string) => {
    useLoadingStore().setLoading(true)
    return API.deleteProject(id).then(() => listProjects())
    .catch(error => console.log(error))
    .finally(() => useLoadingStore().setLoading(false))
  } 

  const createTask = (params: { data: Record<string, unknown>}) => {
    useLoadingStore().setLoading(true)
    return API.createTask(params).then(({ data }) => getProject(data.projectId))
    .catch(error => console.log(error))
    .finally(() => useLoadingStore().setLoading(false))
  } 

  const editTask = (id: string, params: { data: Record<string, unknown>}) => {
    useLoadingStore().setLoading(true)
    return API.editTask(id, params).then(() => getProject(project.value?._id.toString() as string))
    .catch(error => console.log(error))
    .finally(() => useLoadingStore().setLoading(false))
  } 
  
  const deleteTask = (id: string) => {
    useLoadingStore().setLoading(true)
    return API.deleteTask(id).then(() => getProject(project.value?._id.toString() as string))
    .catch(error => console.log(error))
    .finally(() => useLoadingStore().setLoading(false))
  } 

  const clearData = () => {
    project.value = { name: '', _id: '', tasks: [] }
  }

  const items = computed(() => projects.value)
  const item = computed(() => project.value)

  return {
    createProject,
    listProjects,
    getProject,
    deleteProject,
    deleteTask,
    createTask,
    editTask,
    clearData,
    items,
    item
  }
})