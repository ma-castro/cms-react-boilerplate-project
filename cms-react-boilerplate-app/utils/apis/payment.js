import { axiosInstance } from '.'

const paymentApi = {
  createPaymentIntent: async (payload) => {
    return (await axiosInstance.post('/payment/create-payment-intent', { ...payload }))?.data
  },
  updatePaymentStatus: async (payload) => {
    return (await axiosInstance.post('/payment/update-payment-status', { ...payload }))?.data
  },
  reconcilePayment: async (payload) => {
    return (await axiosInstance.post('/payment/reconcile-payment', { ...payload }))?.data
  }
}

export default paymentApi
