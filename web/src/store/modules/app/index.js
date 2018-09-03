import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

const state = {
  isLoading: false,
  productDetails: {}
}

export default{
  state,
  actions,
  getters,
  mutations
}
