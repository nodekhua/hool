import Vue from 'vue'

import {
  MENU_ITEMS,
  SET_PAGE_VIEW,
  SET_DETAIL_VIEW_CONTEXT,
  SET_SIDEBAR_CONTENTS
} from './mutation-type'

const mutations = {
  [MENU_ITEMS] (state, { items }) {
    state.menuItems = items
  },
  [SET_PAGE_VIEW] (state, { viewContext, pageView }) {
    state.currentViewContext = viewContext
    state.currentView = pageView
  },
  [SET_DETAIL_VIEW_CONTEXT] (state, { pageView, name, nodeId }) {
    switch (name) {
      case 'ContactDetail':
        console.log('SET_DETAIL_VIEW_CONTEXT: ContactDetail', nodeId, name, pageView)
        break
      default:
      // state.currentView = pageView
    }
  },
  [SET_SIDEBAR_CONTENTS] (state, {sidebar, contents}) {
    const id = sidebar.uuid[0].value
    console.log('SET_SIDEBAR_CONTENTS', id, contents)
    Vue.set(state.sidebarContents, id, contents)
  }
}

export default mutations
