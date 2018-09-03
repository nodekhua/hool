import {
  SET_SEARCH_RESULTS,
  SET_SEARCH_QUERY,
  SET_SEARCH_LOADING
} from './mutation-type'

import http from '@/service'

export const fetchSearchProducts = async ({commit, dispatch}, query) => {
  try {
    commit(SET_SEARCH_QUERY, {query})
    commit(SET_SEARCH_LOADING, {isLoading: true})
    const products = await http.fetchSearchProducts({name: query})
    commit(SET_SEARCH_RESULTS, {products})
  } catch (e) {
    console.error('fetchSearchProducts', e)
  } finally {
    commit(SET_SEARCH_LOADING, {isLoading: false})
  }
}
