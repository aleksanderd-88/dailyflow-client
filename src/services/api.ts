import router from '@/router'
import { useFeedbackStore } from '@/stores/app/feedback'
import { useCurrentUserStore } from '@/stores/current-user'
import axios, { type AxiosResponse } from 'axios'

const client = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  withCredentials: false,
  timeout: 60000
})

type ParamType = {
  data: Record<string, unknown>
}

client.interceptors.request.use(req => {
  return req
}, err => {
  console.log(err);

  //- Send error feedback to user
  useFeedbackStore().setFeedbackVisibility(true, err.response.data, 'error', 5000)
  
  if ( [401, 403].includes(err.response.status) ) {
    //- Clear user data and redirect to login page
    useCurrentUserStore().clearCurrentUser()
    router.push('/')
  }
})

client.interceptors.response.use(res => {
  return res
}, err => {
  console.log(err);
  
  //- Send error feedback to user
  useFeedbackStore().setFeedbackVisibility(true, err.response.data, 'error', 5000)

  if ( [401, 403].includes(err.response.status) ) {
    //- Clear user data and redirect to login page
    useCurrentUserStore().clearCurrentUser()
    router.push('/')
  }
})

export default {
  client,
  // API version
  getAPIversion(): Promise<AxiosResponse> {
    return client.get('/version/get')
  },
  // Projects
  createProject(params: ParamType) {
    return client.post('/projects/create', params)
  },
  editProject(id: string, params: ParamType) {
    return client.patch(`/projects/${ id }/edit`, params)
  },
  listProjects(): Promise<AxiosResponse> {
    return client.get('/projects/list')
  },
  getProject(id: string): Promise<AxiosResponse> {
    return client.get(`/projects/${ id }/get`)
  },
  deleteProject(id: string): Promise<AxiosResponse> {
    return client.delete(`/projects/${ id }/delete`)
  },
  // Tasks
  createTask(params: ParamType) {
    return client.post('/tasks/create', params)
  },
  markComplete(id: string) {
    return client.patch(`/tasks/${ id }/mark-complete`)
  },
  editTask(id: string, params: ParamType) {
    return client.patch(`/tasks/${ id }/edit`, params)
  },
  deleteTask(id: string) {
    return client.delete(`/tasks/${ id }/delete`)
  },
  // Bookmarks
  createBookmark(params: ParamType) {
    return client.post('/bookmarks/create', params)
  },
  deleteBookmark(id: string) {
    return client.delete(`/bookmarks/${ id }/delete`)
  },
  listBookmark() {
    return client.get('/bookmarks/list')
  },
  // Users
  createUser(params: ParamType): Promise<AxiosResponse> {
    return client.post('/users/create', params)
  },
  authenticateUser(params: ParamType): Promise<AxiosResponse> {
    return client.patch('/users/auth', params)
  },
  updateUser(params: ParamType): Promise<AxiosResponse> {
    return client.patch('/users/update', params)
  }
}