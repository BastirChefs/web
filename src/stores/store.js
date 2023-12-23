import { createStore } from 'vuex';

export default createStore({
  state: {
    dataLoaded: false,
  },
  mutations: {
    setDataLoaded(state, value) {
      state.dataLoaded = value;
    },
  },
});