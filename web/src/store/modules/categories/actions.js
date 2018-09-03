import {
  OPEN_CATEGORY_SIDEBAR_CATEGORY,
  OPEN_SUBCATEGORY_SIDEBAR_CATEGORY,
  SET_SIDEBAR_CATEGORIES,
  SET_SIDEBAR_SUB_CATEGORIES,
  SET_ACTIVE_PRODUCTGROUP_ID,
  SET_SIDEBAR_GROUP_PRODUCTS,
  SET_PRODUCT_DETAIL,
  SET_ACTIVE_PRODUCTSUBGROUP_ID,
  SET_SIDEBAR_SUBGROUP_PRODUCTS
} from './mutation-type'

import http from '@/service'

export const toggleCategory = ({commit}, category) => {
  commit(OPEN_CATEGORY_SIDEBAR_CATEGORY, category)
}

export const toggleSubCategory = ({commit}, category) => {
  commit(OPEN_SUBCATEGORY_SIDEBAR_CATEGORY, category)
}

export const onChooseCategoryProduct = async ({commit, dispatch}, product) => {
  try {
    dispatch('setAppLoading', true)
    const id = product.id
    const products = await http.fetchProductDetail({id})
    commit(SET_PRODUCT_DETAIL, {id, product: products[0]})
  } catch (e) {
    console.error('fetchProductDetail', e)
  } finally {
    dispatch('setAppLoading', false)
  }
}

export const fetchProductGroups = async ({commit, dispatch}) => {
  try {
    dispatch('setAppLoading', true)
    let categories = await http.fetchProductGroups()
    categories = categories.map(cat => ({
      ...cat,
      open: false
    }))
    commit(SET_SIDEBAR_CATEGORIES, {categories})
  } catch (e) {
    console.error('fetchProductGroups', e)
  } finally {
    dispatch('setAppLoading', false)
  }
}

export const fetchSubGroupProducts = async ({commit, dispatch}, { id }) => {
  try {
    dispatch('setAppLoading', true)
    let categories = await http.fetchProductSubGroups({id})
    categories = categories.map(cat => ({
      ...cat,
      open: false
    }))
    commit(SET_SIDEBAR_SUB_CATEGORIES, {categories, id})
    commit(SET_ACTIVE_PRODUCTGROUP_ID, {id})
  } catch (e) {
    console.error('fetchSubGroupProducts', e)
  } finally {
    dispatch('setAppLoading', false)
  }
}

export const fetchGroupProducts = async ({commit, dispatch}, group) => {
  const { id } = group
  try {
    dispatch('setAppLoading', true)
    let products = await http.fetchGroupProducts({id})
    commit(SET_ACTIVE_PRODUCTSUBGROUP_ID, {id})
    commit(SET_SIDEBAR_SUBGROUP_PRODUCTS, {id, products})
  } catch (e) {
    console.error('fetchProductGroups', e)
  } finally {
    dispatch('setAppLoading', false)
  }
}

export const toggleLvl2Category = async ({commit}, subCategory) => {
  try {
    const categoryId = subCategory.id
    const products = await http.fetchCategoryProducts({categoryId})
    console.log(products)
    commit(SET_ACTIVE_PRODUCTGROUP_ID, {categoryId})
    commit(SET_SIDEBAR_GROUP_PRODUCTS, {categoryId, products})
  } catch (e) {
    console.error('fetchSidebarSubCategory', e)
  } finally {

  }
}
