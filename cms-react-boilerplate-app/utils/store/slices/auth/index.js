/* eslint-disable no-console */
import authApi from '../../../apis/auth'
import { getAxiosErrorData } from '../../../helpers/error-handler'

const authSlice = (set) => ({
  // token verification
  loadingTokenVerification: false,
  messageTokenVerification: null,
  successTokenVerification: false,
  errorTokenVerification: false,
  // login validation
  loadingLoginValidation: false,
  messageLoginValidation: null,
  successLoginValidation: false,
  errorLoginValidation: false,
  // signup
  loadingSignup: false,
  messageSignup: null,
  successSignup: false,
  errorSignup: false,
  // login
  loadingLogin: false,
  messageLogin: null,
  successLogin: false,
  errorLogin: false,
  verifyToken: async (payload) => {
    set((state) => ({ ...state, loadingTokenVerification: true }))

    try {
      const { success, message } = await authApi.verifyToken(payload)

      set((state) => ({
        ...state,
        loadingTokenVerification: false,
        messageTokenVerification: message,
        successTokenVerification: success
      }))
    } catch (error) {
      const errorMessage = getAxiosErrorData(error)

      set((state) => ({ ...state, loadingTokenVerification: false, errorTokenVerification: errorMessage, successTokenVerification: false }))
    }
  },
  validateLogin: async (payload) => {
    set((state) => ({ ...state, loadingLoginValidation: true }))

    try {
      const { success, message } = await authApi.validateLogin(payload)

      set((state) => ({
        ...state,
        loadingLoginValidation: false,
        messageLoginValidation: message,
        successLoginValidation: success
      }))
    } catch (error) {
      const errorMessage = getAxiosErrorData(error)

      set((state) => ({ ...state, loadingLoginValidation: false, errorLoginValidation: errorMessage, successLoginValidation: false }))
    }
  },
  signup: async (payload) => {
    set((state) => ({ ...state, loadingSignup: true }))

    try {
      const { success, message } = await authApi.signup(payload)

      set((state) => ({
        ...state,
        loadingSignup: false,
        messageSignup: message,
        successSignup: success
      }))
    } catch (error) {
      const errorMessage = getAxiosErrorData(error)

      set((state) => ({ ...state, loadingSignup: false, errorSignup: errorMessage, successSignup: false }))
    }
  },
  login: async (payload) => {
    set((state) => ({ ...state, loadingLogin: true }))

    try {
      const { success, message } = await authApi.login(payload)

      set((state) => ({
        ...state,
        loadingLogin: false,
        messageLogin: message,
        successLogin: success
      }))
    } catch (error) {
      const errorMessage = getAxiosErrorData(error)

      set((state) => ({ ...state, loadingLogin: false, errorLogin: errorMessage, successLogin: false }))
    }
  }
})

export default authSlice
