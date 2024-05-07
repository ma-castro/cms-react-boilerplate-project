import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import authSlice from './slices/auth'
import commonSlice from './slices/common'
import eventSlice from './slices/event'
import membershipSlice from './slices/membership'
import orderSlice from './slices/order'
import paymentSlice from './slices/payment'

const useStore = create()(
  devtools((...a) => ({
    ...authSlice(...a),
    ...commonSlice(...a),
    ...eventSlice(...a),
    ...orderSlice(...a),
    ...paymentSlice(...a),
    ...membershipSlice(...a)
  }))
)

export default useStore
