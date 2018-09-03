import Vue from 'vue'
import {app} from '../../../main'

import {
  SET_PRODUCT_DETAIL,
  SET_APP_LOADING,
  SET_LANG
} from './mutation-type'

const mutations = {
  [SET_PRODUCT_DETAIL] (state, {name, product}) {
    Vue.set(state.productDetails, name, product)
  },
  [SET_APP_LOADING] (state, {isLoading}) {
    state.isLoading = isLoading
  },
  [SET_LANG] (state, payload) {
    app.$i18n.locale = payload
  }
}

export default mutations
