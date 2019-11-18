const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  userId: state => state.user.userId,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  permissions: state => state.user.permissions,
  currentRoles: state => state.user.currentRoles,
  setting: state => state.user.setting,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  errorLogs: state => state.errorLog.logs,
  messageList: state => state.sysMessages.messageList,
  // 需求线索池页面
  demandPageQuery: state => state.searchParams.demandPageQuery,
  // 历史回访记录页面搜索
  historyReviewPageQuery: state => state.searchParams.historyReviewPageQuery,
  // 限时回访记录页面搜索
  timeReviewPageQuery: state => state.searchParams.timeReviewPageQuery
}
export default getters
