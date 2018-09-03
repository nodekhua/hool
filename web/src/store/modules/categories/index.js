import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

const state = {
  loading: false,
  sidebarCategories: [],
  sidebarGroupProducts: {},
  sidebarGroupSubGroups: {},
  sidebarSubGroupProducts: {},
  activeProductGroupId: null,
  activeProductSubGroupId: null,
  productDetails: {}
}

export default{
  state,
  actions,
  getters,
  mutations
}
