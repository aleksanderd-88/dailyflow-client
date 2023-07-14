import axios, { type AxiosResponse } from 'axios'

const client = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  withCredentials: false,
  timeout: 60000
})

type ParamType = {
  data: Record<string, unknown>
}

export default {
  createProject(params: ParamType) {
    return client.post('/projects/create', params)
  },
  listProjects(): Promise<AxiosResponse> {
    return client.get('/projects/list')
  },
  getProject(id: string): Promise<AxiosResponse> {
    return client.get(`/projects/${ id }/get`)
  }
}