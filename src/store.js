import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: "Not loggued in",
    isAuthenticated: false
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload.user.email;
      console.log(state.user);
      router.push("/");
    },
  setIsAuthenticated(state, payload) {
      state.isAuthenticated = payload;
      router.push("/");
  }
  },
  actions: {
    userJoin({ commit }, { email, password }) {
      firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(user => {
          commit("setUser", user);
          commit("setIsAuthenticated", true);
        })
        .catch(() => {
          commit("setUser", null);
          commit("setIsAuthenticated", false);
        });
    }
  },
  getters: {
    isAuthenticated(state) {
        return state.isAuthenticated;
    },
    getUser(state) {
      return state.user;
  }
  }
});
