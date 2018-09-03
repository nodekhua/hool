import {
  SET_APP_LOADING,
  SET_PRODUCT_DETAIL,
  GET_CART_PRODUCTS,
  SET_LANG
} from './mutation-type'

import http from '@/service'

const DELTA = 900
let started
export const setAppLoading = ({commit}, isLoading) => {
  if (isLoading) {
    if (!started) {
      started = Date.now()
      commit(SET_APP_LOADING, {isLoading})
    }
  } else {
    const ended = Date.now()
    const delta = ended - started
    if (delta > DELTA) {
      started = null
      commit(SET_APP_LOADING, {isLoading})
    } else {
      setTimeout(() => {
        started = null
        commit(SET_APP_LOADING, {isLoading})
      }, DELTA - delta)
    }
  }
}

export const fetchProductDetail = async ({commit, dispatch}, {name}) => {
  try {
    dispatch('setAppLoading', true)
    const product = await http.fetchProductDetail({name})
    product.variations = product.products.filter(({ type }) => type === 'Version')
    product.accessories = product.products.filter(({ type }) => type === 'Accessory')
    delete product.products
    name = name.replace('%2F', '/')

    commit(SET_PRODUCT_DETAIL, {name, product})
    return product
  } catch (e) {
    console.error('fetchProductDetail', e)
  } finally {
    dispatch('setAppLoading', false)
  }
}

// export const authenticate = async ({commit}, {username, password}) => {
//   try {
//     const res = await http.authenticate({username, password})
//     console.log(res)
//     // commit(SET_SIDEBAR_GROUP_PRODUCTS, {activeProductGroupId, products})
//   } catch (e) {
//     console.error('authenticate', e)
//   } finally {

//   }
// }

export const authenticate = async ({commit}, {email, password, language}) => {
  try {
    const res = await http.authenticate({email, password, language})
    return res
  } catch (e) {
    return e
  } finally {

  }
}

export const authenticateByToken = async ({commit}, {token}) => {
  try {
    const res = await http.authenticateByToken({token})
    return res
  } catch (e) {
    return e
  } finally {

  }
}

export const signUp = async ({commit}, { email, password, first_name, last_name, company_name, vat_number, language }) => {
  try {
    const result = await http.signUp({ email, password, first_name, last_name, company_name, vat_number, language })
    return result
  } catch (e) {
    return e
  } finally {

  }
}

export const reset = async ({commit}, { email, language }) => {
  try {
    const response = await http.reset({ email, language })
    return response
  } catch (e) {
    return e
  } finally {

  }
}

export const setLang = async ({commit}, payload) => {
  commit(SET_LANG, payload)
}

export const SetNewPassword = async ({commit}, { token, password, language }) => {
  try {
    const response = await http.SetNewPassword({ token, password, language })
    return response
  } catch (e) {
    return e
  } finally {

  }
}

export const getProductFromCart = async ({commit, dispatch}, {userId}) => {
  try {
    const products = await http.getProductFromCart({userId})
    commit(GET_CART_PRODUCTS, {userId, products})
    return products
  } catch (e) {
    console.error('getProductFromCart', e)
  } finally {
    dispatch('setAppLoading', false)
  }
}

export const getFee = async ({commit}, { price, authenticated }) => {
  const response = await http.getFee({ price, authenticated })
  return response
}

export const getDiscounts = async ({commit}, { price, authenticated }) => {
  const response = await http.getDiscounts({ price, authenticated })
  return response
}

export const deleteFromCart = async ({commit, dispatch}, {id}) => {
  try {
    const res = await http.deleteFromCart({id})
    return res
  } catch (e) {
    console.error('deleteFromCart', e)
  } finally {
    dispatch('setAppLoading', false)
  }
}

export const storeOrder = async ({commit}, { userId, language }) => {
  try {
    const response = await http.storeOrder({userId, language})
    return response
  } catch (e) {
    return e
  } finally {

  }
}

export const getCatgoryProducts = async ({commit}, id) => {
  try {
    const products = await http.getCatgoryProducts({id})
    return products
  } catch (e) {
    console.error('getCatgoryProducts', e)
  } finally {

  }
}

export const changeCategoriesOrder = async ({commit}, {id, oldOrder, newOrder, parent_category}) => {
  try {
    await http.changeCategoriesOrder({id, oldOrder, newOrder, parent_category})
  } catch (e) {
    console.error('changeCategoriesOrder', e)
  } finally {

  }
}

export const createCategory = async ({commit}, {name, nameEt, nameFi, parentCategoryId}) => {
  try {
    await http.createCategory({name, nameEt, nameFi, parentCategoryId})
  } catch (e) {
    console.error('createCategory', e)
  } finally {

  }
}

export const deleteCategory = async ({commit}, {id}) => {
  try {
    await http.deleteCategory({id})
  } catch (e) {
    console.error('deleteCategory', e)
  } finally {

  }
}

export const getCategoryList = async ({commit}) => {
  try {
    const result = await http.getCategoryList()
    return result
  } catch (e) {
    console.error('getCategoryList', e)
  } finally {

  }
}

export const moveCategory = async ({commit}, {id, new_parent, type}) => {
  try {
    const result = await http.moveCategory({id, new_parent, type})
    return result
  } catch (e) {
    console.error('moveCategory', e)
  } finally {

  }
}
