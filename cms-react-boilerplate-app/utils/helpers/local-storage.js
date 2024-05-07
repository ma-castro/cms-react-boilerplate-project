export const STORAGE_NAME = 'racinghub'

export const STORED_EVENTS_LIST = 'events'
export const STORED_EVENT = 'event'
export const STORED_EVENT_PRODUCTS = 'event-products'

export const STORED_CART_DATA = 'cart-data'
export const STORED_CART_EXPIRATION = 'cart-expiration'
export const STORED_MEMBERSHIP_TOKEN = 'membership-token'
export const STORED_HAS_MEMBERSHIP_PRODUCT = 'has-membership-product'

export const setStorageData = (key, data) => {
  const storedName = `${STORAGE_NAME}:${key}`

  localStorage.setItem(storedName, JSON.stringify(data))
}

export const getStorageData = (key) => {
  const storedName = `${STORAGE_NAME}:${key}`

  return JSON.parse(localStorage.getItem(storedName))
}

export const removeStorageData = (key) => {
  const storedName = `${STORAGE_NAME}:${key}`

  return localStorage.removeItem(storedName)
}
