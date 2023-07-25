import { defineStore } from "pinia";
import { computed, ref } from "vue";
import API from '@/services/api'
import { useLoadingStore } from "../app/loading";
import { useFeedbackStore } from "../app/feedback";
import { useBookmarkStore } from "./bookmark";

type TaskType = {
  _id: string, 
  description: string, 
  completed: boolean, 
  projectId: string
  isBookmarked: boolean
}

type ProjectType = { 
  name: string, 
  _id: string, 
  tasks: TaskType[], 
  createdAt: string 
}

type ProjectsType = ProjectType[]

export const useAPIStore = defineStore('api', () => {
  const projects = ref<ProjectsType>([])
  const project = ref<ProjectType>()

  const createProject = async (params: { data: Record<string, unknown>}) => {
    useLoadingStore().setLoading(true)
    return API.createProject(params).then(() => {
      listProjects()
      useFeedbackStore().setFeedbackVisibility(true, 'Project created.')
    })
    .catch(err => {
      console.log(err)
      useFeedbackStore().setFeedbackVisibility(true, 'Something went wrong ...', 'error')
    })
    .finally(() => useLoadingStore().setLoading(false))
  }

  const editProject = async (id: string, params: { data: Record<string, unknown>}) => {
    useLoadingStore().setLoading(true)
    return API.editProject(id, params).then(() => {
      listProjects()
      useFeedbackStore().setFeedbackVisibility(true, 'Project edited.')
    })
    .catch(err => {
      console.log(err)
      useFeedbackStore().setFeedbackVisibility(true, 'Something went wrong ...', 'error')
    })
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
    return API.deleteProject(id).then(() => {
      listProjects()
      useBookmarkStore().listBookmark()
      useFeedbackStore().setFeedbackVisibility(true, 'Project deleted.')
    })
    .catch(error => {
      console.log(error)
      useFeedbackStore().setFeedbackVisibility(true, 'Something went wrong ...', 'error')
    })
    .finally(() => useLoadingStore().setLoading(false))
  } 

  const createTask = (params: { data: Record<string, unknown>}) => {
    useLoadingStore().setLoading(true)
    return API.createTask(params).then(({ data }) => {
      getProject(data.projectId)
      useFeedbackStore().setFeedbackVisibility(true, 'Task created.')
    })
    .catch(error => {
      console.log(error)
      useFeedbackStore().setFeedbackVisibility(true, 'Something went wrong ...', 'error')
    })
    .finally(() => useLoadingStore().setLoading(false))
  } 

  const editTask = (id: string, params: { data: Record<string, unknown>}) => {
    useLoadingStore().setLoading(true)
    return API.editTask(id, params).then(() => {
      getProject(project.value?._id.toString() as string)
      useFeedbackStore().setFeedbackVisibility(true, 'Task edited.')
    })
    .catch(error => {
      console.log(error)
      useFeedbackStore().setFeedbackVisibility(true, 'Something went wrong ...', 'error')
    })
    .finally(() => useLoadingStore().setLoading(false))
  } 
  
  const deleteTask = (id: string) => {
    useLoadingStore().setLoading(true)
    return API.deleteTask(id).then(() => {
      getProject(project.value?._id.toString() as string)
      useBookmarkStore().listBookmark()
      useFeedbackStore().setFeedbackVisibility(true, 'Task deleted.')
    })
    .catch(error => {
      console.log(error)
      useFeedbackStore().setFeedbackVisibility(true, 'Something went wrong ...', 'error')
    })
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
    item,
    editProject
  }
})