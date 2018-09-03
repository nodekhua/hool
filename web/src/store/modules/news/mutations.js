import {
  SET_NEWS_MAIN_FEED,
  SET_NEWS_SIDEBAR_ARCHIVE,
  SET_NEWS_SIDEBAR_POPULAR
} from './mutation-type'

const mutations = {
  [SET_NEWS_MAIN_FEED] (state, { newsItems }) {
    console.log(SET_NEWS_MAIN_FEED, newsItems)
    state.newsMainFeedItems = newsItems
  },
  [SET_NEWS_SIDEBAR_POPULAR] (state, { newsItems }) {
    console.log(SET_NEWS_SIDEBAR_POPULAR, newsItems)
    state.newsSidebarPopularItems = newsItems
  },
  [SET_NEWS_SIDEBAR_ARCHIVE] (state, { newsItems }) {
    console.log(SET_NEWS_SIDEBAR_ARCHIVE, newsItems)
    state.newsSidebarArchive = newsItems
  }
}

export default mutations
