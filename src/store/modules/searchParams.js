const searchParams = {
  state: {
    // 需求线索池页面搜索
    demandPageQuery: {
      pageNum: 1,
      pageSize: 10,
      phone: '',
      date: '',
      startDate: '',
      endDate: '',
      intentionCodeList: [],
      intentionCode: '',
      areaCode: ''
    },
    // 历史回访记录页面搜索
    historyReviewPageQuery: {
      pageNum: 1,
      pageSize: 10,
      phone: '',
      date: '',
      startDate: '',
      endDate: '',
      intentionCodeList: [],
      intentionCode: '',
      areaCode: ''
    },
    // 限时回访任务页面搜索
    timeReviewPageQuery: {
      pageNum: 1,
      pageSize: 10
    }
  },
  mutations: {
    // 需求线索池页面搜索
    SAVE_DEMANDPAGE_QUERY_INFO: (state, queryInfo) => {
      state.demandPageQuery = queryInfo
    },
    // 历史回访记录页面搜索
    SAVE_HOISTORYREVIEWPAGE_QUERY_INFO: (state, queryInfo) => {
      state.historyReviewPageQuery = queryInfo
    },
    // 限时回访任务页面搜索
    SAVE_TIMEREVIEWPAGE_QUERY_INFO: (state, queryInfo) => {
      state.historyReviewPageQuery = queryInfo
    }
  },
  actions: {
    // 需求线索池页面搜索
    saveDemandPageQueryInfo({ commit }, queryInfo) {
      commit('SAVE_DEMANDPAGE_QUERY_INFO', queryInfo)
    },
    // 历史回访记录页面搜索
    saveHistoryReviewPageQueryInfo({ commit }, queryInfo) {
      commit('SAVE_HOISTORYREVIEWPAGE_QUERY_INFO', queryInfo)
    },
    // 限时回访任务页面搜索
    saveTimeReviewPageQueryInfo({ commit }, queryInfo) {
      commit('SAVE_TIMEREVIEWPAGE_QUERY_INFO', queryInfo)
    },
  }
}

export default searchParams
