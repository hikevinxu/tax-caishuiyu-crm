const sysMessages = {
  state: {
    messageList: [],
  },
  mutations: {
    SET_MESSAGELIST: (state, messageList) => {
      state.messageList = messageList
    },
  },
  actions: {
    setMessageList({ commit }, messageList) {
      commit('SET_MESSAGELIST', messageList)
    }
  }
}

export default sysMessages
