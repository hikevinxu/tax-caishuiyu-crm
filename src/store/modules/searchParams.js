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
      areaCodeList: [],
      areaCode: '',
      visitType: '',
      status: '',
      opUserName: ''
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
      areaCodeList: [],
      areaCode: '',
      visitType: '',
      status: ''
    },
    // 限时回访任务页面搜索
    timeReviewPageQuery: {
      pageNum: 1,
      pageSize: 10
    },
    // 询价单管理列表页面搜索
    enquiryManagerPageQuery: {
      pageNum: 1,
      pageSize: 10,
      phone: '',
      companyNames: '',
      intentionCode: '',
      intentionCodeList: [],
      areaCodeList: [],
      areaCode: '',
      opUserName: '',
      searchStatus: '',
      merchantName: ''
    },
    // 客户管理列表页面搜索
    customerManagerPageQuery: {
      pageNum: 1,
      pageSize: 10,
      phone: ''
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
    },
    // 询价单管理列表页面搜索
    SAVE_ENQUIRYMANAGERPAGE_QUERY_INFO: (state, queryInfo) => {
      state.enquiryManagerPageQuery = queryInfo
    },
    // 客户管理列表页面搜索
    SAVE_CUSTOMERMANAGERPAGE_QUERY_INFO: (state, queryInfo) => {
      state.customerManagerPageQuery = queryInfo
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
    // 询价单管理列表页面搜索
    saveEnquiryManagerPageQueryInfo({ commit }, queryInfo) {
      commit('SAVE_ENQUIRYMANAGERPAGE_QUERY_INFO', queryInfo)
    },
    // 客户管理列表页面搜索
    saveCustomerManagerPageQueryInfo({ commit }, queryInfo) {
      commit('SAVE_CUSTOMERMANAGERPAGE_QUERY_INFO', queryInfo)
    }
  }
}

export default searchParams
