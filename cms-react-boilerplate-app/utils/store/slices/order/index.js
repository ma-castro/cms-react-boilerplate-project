import Cookies from 'js-cookie'

import orderApi from '../../../apis/order'
import { getAxiosErrorData } from '../../../helpers/error-handler'
import {
  STORED_CART_DATA,
  STORED_CART_EXPIRATION,
  STORED_HAS_MEMBERSHIP_PRODUCT,
  getStorageData,
  removeStorageData,
  setStorageData
} from '../../../helpers/local-storage'

const orderSlice = (set, get) => ({
  status: 'idle',
  message: '',
  addingToCart: false,
  displayMiniCart: false,
  addToCartMessage: '',
  cartItems: [],
  order: null,
  cartExpiration: null,
  createAndAddItemCart: async (payload) => {
    set((state) => ({ ...state, addingToCart: true }))

    try {
      const { success, data } = await orderApi.createAndAddItemCart(payload)

      const { message, cart_expiration, hasMembershipProduct, ...response } = data ?? {}

      if (success) {
        setStorageData(STORED_CART_DATA, response)
        setStorageData(STORED_CART_EXPIRATION, cart_expiration)

        if (hasMembershipProduct) {
          setStorageData(STORED_HAS_MEMBERSHIP_PRODUCT, hasMembershipProduct)
        }

        set((state) => ({ ...state, status: 'fetched', addingToCart: false, cartItems: response, cartExpiration: cart_expiration }))
      } else {
        set((state) => ({ ...state, status: 'fetched', addingToCart: false, addToCartMessage: message }))
      }
    } catch (error) {
      const errorMessage = getAxiosErrorData(error)
      set((state) => ({ ...state, status: 'error', addingToCart: false, errorMessage }))
    }
  },
  updateAndAddItemCart: async (payload) => {
    set((state) => ({ ...state, addingToCart: true }))

    try {
      const { success, data } = await orderApi.updateAndAddItemCart(payload)

      const { message, hasMembershipProduct, ...response } = data ?? {}

      if (success) {
        setStorageData(STORED_CART_DATA, response)

        if (hasMembershipProduct) {
          setStorageData(STORED_HAS_MEMBERSHIP_PRODUCT, hasMembershipProduct)
        }

        set((state) => ({ ...state, status: 'fetched', addingToCart: false, cartItems: response }))
      } else {
        set((state) => ({ ...state, status: 'fetched', addingToCart: false, addToCartMessage: message }))
      }
    } catch (error) {
      const errorMessage = getAxiosErrorData(error)
      set((state) => ({ ...state, status: 'error', addingToCart: false, errorMessage }))
    }
  },
  getOrder: async (orderId) => {
    set((state) => ({ ...state, addingToCart: true }))

    try {
      const { success, message, data } = await orderApi.getOrder(orderId)

      if (success) {
        set((state) => ({ ...state, order: data }))
      } else {
        set((state) => ({ ...state, message }))
      }
    } catch (error) {
      const errorMessage = getAxiosErrorData(error)
      set((state) => ({ ...state, status: 'error', addingToCart: false, errorMessage }))
    }
  },
  getCartData: async () => {
    const cartItems = getStorageData(STORED_CART_DATA)
    const cartExpiration = getStorageData(STORED_CART_EXPIRATION)

    set((state) => ({ ...state, status: 'fetched', cartItems, cartExpiration }))
  },
  setDisplayMiniCart: async (show) => {
    set((state) => ({
      ...state,
      displayMiniCart: show
    }))
  },
  triggerCartExpiration: async () => {
    removeStorageData(STORED_CART_DATA)
    removeStorageData(STORED_CART_EXPIRATION)
    get().setDisplayMiniCart(false)
    Cookies.remove('ft-order_id')
  }
})

export default orderSlice
