import { createStore } from "vuex";
import { product } from "./modules/product";

export default createStore({
  state: { isLoggedin: false, username: "" },
  mutations: {
    setIsLoggedin(state, value) {
      state.isLoggedin = value;
    },
    setUsername(state, value) {
      state.username = value;
    },
  },
  actions: {
    Login({ commit }, credential) {
      commit("setUsername", credential.username);
      commit("setIsLoggedin", true);
    },
    Logout({ commit }) {
      commit("setUsername", "");
      commit("setIsLoggedin", false);
    },
  },
  modules: { product },
});
