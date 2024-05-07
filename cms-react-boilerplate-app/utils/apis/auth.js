import { axiosInstance } from '.'

const authApi = {
  verifyToken: async (payload) => {
    return (await axiosInstance.post('/auth/verify-email', { ...payload }))?.data
  },
  validateLogin: async (payload) => {
    return (await axiosInstance.post('/auth/validate-login', { ...payload }))?.data
  },
  signup: async (payload) => {
    return (await axiosInstance.post('/auth/signup', { ...payload }))?.data
  },
  login: async (payload) => {
    return (await axiosInstance.post('/auth/login', { ...payload }))?.data
  },
  me: async () => {
    return (await axiosInstance.get('/auth/me'))?.data
  }
}

export default authApi
