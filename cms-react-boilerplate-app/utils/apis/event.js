import { axiosInstance } from '.'

const eventApi = {
  getEvents: async () => {
    return (await axiosInstance.get('/events'))?.data
  },
  getEvent: async (id) => {
    return (await axiosInstance.get(`/event?id=${id}`))?.data
  }
}

export default eventApi
