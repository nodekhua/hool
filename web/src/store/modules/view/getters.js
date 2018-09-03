export const getMenuItems = state => state.menuItems

export const currentView = state => state.currentView

export const getSidebars = state => {
  try {
    return state.currentView.filter(filterSidebar)
  } catch (e) {
    return []
  }
}

export const getHeaders = state => {
  try {
    return state.currentView.filter(filterHeader)
  } catch (e) {
    return []
  }
}

export const getFooters = state => {
  try {
    return state.currentView.filter(filterFooter)
  } catch (e) {
    return []
  }
}

export const getContentNodes = state => {
  try {
    return state.currentView.filter(filterContent)
  } catch (e) {
    return []
  }
}

export const getAbstractPageNodes = state => {
  return state.currentView
}

export const getSidebarContentsById = (state, getters) => (id) => {
  return state.sidebarContents[id]
}

export const getPageName = state => {
  try {
    return state.currentViewContext.title[0].value
  } catch (e) {
    return 'getPageName returned null'
  }
}

function filterSidebar (relation) {
  return relation.type[0].target_id.indexOf('sidebar') > -1
}

function filterFooter (relation) {
  return relation.type[0].target_id.indexOf('footer') > -1
}

function filterHeader (relation) {
  return relation.type[0].target_id.indexOf('header') > -1
}

function filterContent (relation) {
  return !filterSidebar(relation) && !filterFooter(relation) && !filterHeader(relation)
}
