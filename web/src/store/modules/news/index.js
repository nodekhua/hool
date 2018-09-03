import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

const state = {
  newsMainFeedItems: [],
  newsSidebarPopularItems: [],
  newsSidebarArchive: []
}

export default {
  state,
  actions,
  getters,
  mutations
}
