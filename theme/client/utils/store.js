import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      category: '',
      tags: '',
      pageHeader: 'home'
    }
  },
  mutations: {
    updateCategory(state,category) {
      state.category = category;
    },
    updateTags(state,tags) {
      state.tags = tags;
    },
    updatePageHeader(state,pageHeader) {
      state.pageHeader = pageHeader;
    },
  }
})
export default store;