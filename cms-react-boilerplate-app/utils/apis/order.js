import { axiosInstance } from '.'

const orderApi = {
  createOrder: async (payload) => {
    return (await axiosInstance.post('/order/create', { ...payload }))?.data
  },
  getOrder: async (orderId) => {
    return (await axiosInstance.get(`/order?order_id=${orderId}`))?.data
  },
  getOrderSummary: async (orderId) => {
    return (await axiosInstance.get(`/order/summary?order_id=${orderId}`))?.data
  },
  addItemToCart: async (payload) => {
    return (await axiosInstance.post('/order/cart/add', { ...payload }))?.data
  },
  updateItemQtyInCart: async (payload) => {
    return (await axiosInstance.patch('/order/cart/update', { ...payload }))?.data
  }
}

export default orderApi
