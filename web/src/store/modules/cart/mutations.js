import Vue from 'vue'

import {
  SET_PRODUCT_CART,
  TOGGLE_SHOPPING_CART_SIDEBAR
} from './mutation-type'

const mutations = {
  [SET_PRODUCT_CART] (state, {product, count}) {
    Vue.set(state.shoppingCart, product.productID, {
      count, product
    })
  },
  [TOGGLE_SHOPPING_CART_SIDEBAR] (state, open) {
    state.sidebarOpen = (typeof (open) === 'boolean' && open) || !state.sidebarOpen
  }
}

export default mutations
