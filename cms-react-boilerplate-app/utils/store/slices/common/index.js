const commonSlice = (set) => ({
  cartExpirationCountDown: null,
  displayFullPageLoader: false,
  setCartExpirationCountDown: async (remainingInSeconds) => {
    set((state) => ({
      ...state,
      cartExpirationCountDown: remainingInSeconds
    }))
  },
  setDisplayFullPageLoader: (show) => {
    set((state) => ({
      ...state,
      displayFullPageLoader: show
    }))
  }
})

export default commonSlice
