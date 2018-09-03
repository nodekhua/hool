import {
  SET_PRODUCT_CART,
  TOGGLE_SHOPPING_CART_SIDEBAR
} from './mutation-type'

import http from '@/service'

export const addToCart = async ({commit}, { userId, product, quantity, language }) => {
  commit(SET_PRODUCT_CART, {userId, product, quantity})
  try {
    const response = await http.addToCart({ userId, product, quantity, language })
    return response
  } catch (e) {
    return e
  } finally {

  }
}

export const toggleShoppingCartSidebar = ({commit}, open) => {
  commit(TOGGLE_SHOPPING_CART_SIDEBAR, open)
}
