import Vue from 'vue'

import {
  OPEN_CATEGORY_SIDEBAR_CATEGORY,
  OPEN_SUBCATEGORY_SIDEBAR_CATEGORY,
  SET_SIDEBAR_CATEGORIES,
  SET_SIDEBAR_GROUP_PRODUCTS,
  SET_ACTIVE_PRODUCTGROUP_ID,
  SET_PRODUCT_DETAIL,
  SET_SIDEBAR_SUBGROUP_PRODUCTS,
  SET_ACTIVE_PRODUCTSUBGROUP_ID,
  SET_SIDEBAR_SUB_CATEGORIES
} from './mutation-type'

const mutations = {
  [OPEN_CATEGORY_SIDEBAR_CATEGORY] (state, category) {
    state.sidebarCategories = state.sidebarCategories.map(cat => {
      if (cat.id === category.id) {
        cat.open = !cat.open
      } else {
        cat.open = false
      }
      return cat
    })
  },
  [OPEN_SUBCATEGORY_SIDEBAR_CATEGORY] (state, category) {
    state.sidebarGroupSubGroups[state.activeProductGroupId] = state.sidebarGroupSubGroups[state.activeProductGroupId].map(cat => {
      if (cat.id === category.id) {
        cat.open = !cat.open
      } else {
        cat.open = false
      }
      return cat
    })
  },
  [SET_SIDEBAR_CATEGORIES] (state, {categories}) {
    state.sidebarCategories = categories
  },
  [SET_SIDEBAR_GROUP_PRODUCTS] (state, {id, products}) {
    Vue.set(state.sidebarGroupProducts, id, products)
  },
  [SET_ACTIVE_PRODUCTGROUP_ID] (state, {id}) {
    state.activeProductGroupId = id
  },
  [SET_PRODUCT_DETAIL] (state, {id, product}) {
    Vue.set(state.productDetails, id, product)
  },
  [SET_ACTIVE_PRODUCTSUBGROUP_ID] (state, { id }) {
    state.activeProductSubGroupId = id
  },
  [SET_SIDEBAR_SUBGROUP_PRODUCTS] (state, { id, products }) {
    Vue.set(state.sidebarSubGroupProducts, id, products)
  },
  [SET_SIDEBAR_SUB_CATEGORIES] (state, { id, categories }) {
    Vue.set(state.sidebarGroupSubGroups, id, categories)
  }
}

export default mutations
