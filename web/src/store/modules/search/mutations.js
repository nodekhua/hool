import {
  SET_SEARCH_RESULTS,
  SET_SEARCH_QUERY,
  SET_SEARCH_LOADING
} from './mutation-type'

const mutations = {
  [SET_SEARCH_RESULTS] (state, {products}) {
    state.results = products
  },
  [SET_SEARCH_QUERY] (state, {query}) {
    state.query = query
  },
  [SET_SEARCH_LOADING] (state, {isLoading}) {
    state.loading = isLoading
  }
}

export default mutations
