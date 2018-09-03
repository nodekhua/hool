export const getProductDetail = (state) => (id) => {
  return state.productDetails[id]
}

export const isAppLoading = (state) => {
  return state.isLoading
}
