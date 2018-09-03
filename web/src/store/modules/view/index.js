import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

const state = {
  menuItems: [],
  currentView: {},
  currentViewContext: {},
  sidebarContents: {}
}

export default {
  state,
  actions,
  getters,
  mutations
}
