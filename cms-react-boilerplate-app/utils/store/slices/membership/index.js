/* eslint-disable no-console */
import membershipApi from '../../../apis/membership'
import { getAxiosErrorData } from '../../../helpers/error-handler'

const membershipSlice = (set) => ({
  loadingMembershipProduct: false,
  messageMembershipProduct: null,
  successMembershipProduct: false,
  errorMembershipProduct: false,
  membershipProducts: [],
  createMembershipProducts: async (payload) => {
    set((state) => ({ ...state, loadingTokenVerification: true }))

    try {
      const { success, message, membershipProducts } = await membershipApi.createMembershipProducts(payload)

      set((state) => ({
        ...state,
        loadingMembershipProduct: false,
        messageMembershipProduct: message,
        successMembershipProduct: success,
        membershipProducts
      }))
    } catch (error) {
      const errorMessage = getAxiosErrorData(error)

      set((state) => ({ ...state, loadingMembershipProduct: false, errorMembershipProduct: errorMessage, successMembershipProduct: false }))
    }
  },
  getMembershipProducts: async (token) => {
    set((state) => ({ ...state, loadingTokenVerification: true }))

    try {
      const { success, message, membershipProducts } = await membershipApi.getMembershipProducts(token)

      set((state) => ({
        ...state,
        loadingMembershipProduct: false,
        messageMembershipProduct: message,
        successMembershipProduct: success,
        membershipProducts
      }))
    } catch (error) {
      const errorMessage = getAxiosErrorData(error)

      set((state) => ({ ...state, loadingMembershipProduct: false, errorMembershipProduct: errorMessage, successMembershipProduct: false }))
    }
  }
})

export default membershipSlice
