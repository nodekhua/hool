import view from '@/services/view'
import cloneDeep from 'lodash/cloneDeep'
import {
  SET_NEWS_MAIN_FEED,
  SET_NEWS_SIDEBAR_POPULAR,
  SET_NEWS_SIDEBAR_ARCHIVE
} from './mutation-type'

function newsFeedNodeFilter (node) {
  if (node.field_resource_type) {
    return node.field_resource_type[0].value === 'todo--news'
  } else {
    return false
  }
}

export const fetchMainNewsFeed = async ({commit}, { node }) => {
  try {
    const path = node.field_resource_url[0].value
    const newsItems = await view.fetchResourceNode({path})
    commit(SET_NEWS_MAIN_FEED, { newsItems })
  } catch (e) {
    console.error('fetchMainNewsFeed', e)
  } finally {

  }
}

export const fetchSidebarNewsFeed = async ({commit}, { node }) => {
  try {
    const path = node.field_resource_url[0].value
    const newsItems = await view.fetchResourceNode({path})
    commit(SET_NEWS_SIDEBAR_POPULAR, { newsItems })
  } catch (e) {
    console.error('fetchSidebarNewsFeed', e)
  } finally {

  }
}

export const fetchSidebarArchive = async ({commit}, { node }) => {
  try {
    const path = node.field_resource_url[0].value
    const newsItems = await view.fetchResourceNode({path})
    commit(SET_NEWS_SIDEBAR_ARCHIVE, { newsItems })
  } catch (e) {
    console.error('fetchSidebarArchive', e)
  } finally {

  }
}

export const fetchNewsItemsFromArchive = async ({commit, getters, dispatch}, { item }) => {
  try {
    const created = Object.keys(item)[0]
    const newsFeedNode = getters.currentView
            .find(newsFeedNodeFilter)
    const node = cloneDeep(newsFeedNode)
    node.field_resource_url[0].value += `/${created}`
    dispatch('fetchMainNewsFeed', {node})
  } catch (e) {
    console.error('fetchNewsItemsFromArchive', e)
  } finally {

  }
}
