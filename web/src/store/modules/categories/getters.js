export const getSidebarProductGroups = state => state.sidebarCategories

export const getSidebarSubgroupsGroups = state => state.sidebarGroupSubGroups

export const getSidebaractiveProductGroupId = state => state.activeProductGroupId

export const getSubCategoryProducts = state => (id) => {
  return state.sidebarGroupProducts[id]
}

export const getsidebarGroupProductsById = (state, getters) => (id) => {
  return state.sidebarGroupProducts[id]
}

export const getsidebarGroupSubgroupsById = (state, getters) => id => state.sidebarGroupSubGroups[id]

export const getsidebarSubGroupProductsById = (state, getters) => (id) => {
  return state.sidebarSubGroupProducts[id]
}
