export const getMainFeedNewsItems = state => state.newsMainFeedItems
export const getPopularNewsItems = state => state.newsSidebarPopularItems

export const getArchiveNewsItems = state => {
  return state.newsSidebarArchive.reduce((accumulator, current) => {
    const year = current.created_1.substr(0, 4)
    const month = current.created_1.substr(4)
    if (accumulator[year]) {
      if (accumulator[year][month]) {
        accumulator[year][month].count = accumulator[year][month].count + 1
      } else {
        accumulator[year][month] = {
          count: 1,
          month: current.created
        }
      }
    } else {
      accumulator[year] = {
        [month]: {
          count: 1,
          month: current.created
        }
      }
    }
    return accumulator
  }, {})
}
