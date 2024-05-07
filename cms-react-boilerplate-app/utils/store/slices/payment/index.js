import paymentApi from '../../../apis/payment'
import { getAxiosErrorData } from '../../../helpers/error-handler'

const paymentSlice = (set) => ({
  status: 'idle',
  clientSecret: null,
  reference: null,
  message: '',
  createPaymentIntent: async (payload) => {
    try {
      const { client_secret, reference } = await paymentApi.createPaymentIntent(payload)

      set((state) => ({ ...state, clientSecret: client_secret, reference }))
    } catch (error) {
      const message = getAxiosErrorData(error)
      set((state) => ({ ...state, status: 'error', message }))
    }
  },
  updatePaymentStatus: async (payload) => {
    set((state) => ({ ...state, membershipToken: null }))

    try {
      const { success, message } = await paymentApi.updatePaymentStatus(payload)

      if (success) {
        set((state) => ({ ...state, message }))
      }
    } catch (error) {
      const message = getAxiosErrorData(error)
      set((state) => ({ ...state, status: 'error', message }))
    }
  },
  reconcilePayment: async (payload) => {
    try {
      set((state) => ({ ...state, status: 'waiting for reconciliation' }))

      const { success, message } = await paymentApi.reconcilePayment(payload)

      if (success) {
        set((state) => ({ ...state, status: 'reconciliation success', message }))
      } else {
        set((state) => ({ ...state, status: 'reconciliation failed', message }))
      }
    } catch (error) {
      const message = getAxiosErrorData(error)
      set((state) => ({ ...state, status: 'error', message }))
    }
  }
})

export default paymentSlice
