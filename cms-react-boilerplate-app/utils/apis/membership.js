import { axiosInstance } from '.'

const membershipApi = {
  createMembershipProducts: async (payload) => {
    return (await axiosInstance.post('/membership/create-membership-products', { ...payload }))?.data
  },
  getMembershipProducts: async (token) => {
    return (await axiosInstance.get(`/membership/get-membership-products?token=${token}`))?.data
  },
  activateMembership: async () => {
    return (await axiosInstance.post('/membership/activate-membership'))?.data
  },
  createMembership: async (payload) => {
    return (await axiosInstance.post('/membership/create-membership', { ...payload }))?.data
  }
}

export default membershipApi
