import view from '@/services/view'
import {
  MENU_ITEMS,
  SET_PAGE_VIEW,
  SET_SIDEBAR_CONTENTS
} from './mutation-type'

export const fetchMenuItems = async ({commit}) => {
  try {
    const items = await view.fetchMenuItems()
    commit(MENU_ITEMS, { items })
  } catch (e) {
    console.error('fetchMenuItems', e)
  } finally {

  }
}

export const fetchViewNodesContext = async ({commit, dispatch}, {path}) => {
  try {
    const viewContext = await view.fetchViewNodesContext({path})
    const relations = viewContext.field_view_content
    const pageView = await view.fetchViewNodes({relations})
    dispatch('setBreadcrumbs', {breadcrumbs: viewContext.field_custom_breadcrumbs})
    commit(SET_PAGE_VIEW, { viewContext, pageView })
  } catch (e) {
    console.error('fetchViewNodesContext', e)
  } finally {

  }
}

export const fetchDetailViewContext = async ({commit}, {path, name}) => {
  try {
    let template
    switch (name) {
      case 'ContactDetail':
        template = await view.fetchViewNodesContext({path: '/template/contact'})
        break
      case 'NewsDetail':
        template = await view.fetchViewNodesContext({path: '/template/news'})
        break
      case 'ExerciseDetail':
        template = await view.fetchViewNodesContext({path: '/template/exercise'})
        break
      default:
        console.error(`fetchDetailViewContext not supported: ${name} `)
    }
    template.field_view_content
            .forEach(node => {
              if (node.content_type === 'resource_detail') {
                node.url = path
              }
            })
    const data = template.field_view_content
    const pageView = await view.fetchViewNodes({relations: data})
    commit(SET_PAGE_VIEW, { pageView })
  } catch (e) {
    console.error('fetchDetailViewContext', e)
  } finally {

  }
}

export const fetchSidebarContents = async ({commit}, {sidebar}) => {
  try {
    const data = sidebar.field_sidebar_content
    const contents = await view.fetchViewNodes({relations: data})
    commit(SET_SIDEBAR_CONTENTS, { sidebar, contents })
  } catch (e) {
    console.error('fetchSidebarContents', e)
  } finally {

  }
}
