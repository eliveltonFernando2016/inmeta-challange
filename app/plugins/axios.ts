import type { AxiosInstance, CreateAxiosDefaults } from 'axios'
import axios from 'axios'

export default defineNuxtPlugin(() => {
  const {
    public: { axios: axiosConfig },
  } = useRuntimeConfig()

  const defaultAxios: CreateAxiosDefaults = {
    ...axiosConfig,
  }

  const Axios: AxiosInstance = axios.create(defaultAxios)

  Axios.interceptors.request.use(
    (config) => {
      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )

  return {
    provide: {
      axios: Axios,
    },
  }
})