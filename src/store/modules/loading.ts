export default {
  namespace: true,
  state: {
    Loading: false
  },
  mutations: {
    setLoading(state: any, payload: any) {
      state.Loading = payload;
    }
  },
  actions: {
    setLoadingAsync(context: any, data: any) {
      context.commit('setLoading', data)
    }
  }
}