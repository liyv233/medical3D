import Vue from "vue";
import vuex from "vuex";
Vue.use(vuex);

export default new vuex.Store({
  state: {
    isCollapse: true,
  },
  mutations: {
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse;
    },
  },
});
