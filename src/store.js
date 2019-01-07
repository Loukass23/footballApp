import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    isAuthenticated: false,
    favTeam: [],
    errJoin: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
      router.push("/");
    },
    setErrJoin(state, payload) {
      state.errJoin = payload;
    },
    setIsAuthenticated(state, payload) {
      state.isAuthenticated = payload;
      router.push("/");
    },
    setUserFavTeams(state, payload) {
      state.favTeam = payload;
    }
  },
  actions: {
    userJoin({ commit }, { email, password, username }) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(err => {
          commit("setErrJoin", err.message);
          commit("setUser", null);
          commit("setIsAuthenticated", false);
        });

      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          user
            .updateProfile({
              displayName: username
            })
            .then(function() {
              commit("setUser", user);
              commit("setIsAuthenticated", true);
            });
        }
      });
    },
    signInWithGoogle({ commit }) {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          commit("setUser", result.user);
          commit("setIsAuthenticated", true);

          router.push("/");
        })
        .catch(() => {
          commit("setUser", null);
          commit("setIsAuthenticated", false);
        });
    },
    userLogin({ commit }, { email, password }) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          commit("setUser", user);
          commit("setIsAuthenticated", true);

          router.push("/");
        })
        .catch(() => {
          commit("setUser", null);
          commit("setIsAuthenticated", false);
        });
    },
    userSignOut({ commit }) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          commit("setIsAuthenticated", false);
          commit("setUser", null);
          commit("setUserFavTeams", null);
          router.push("/");
        })
        .catch(() => {
          commit("setUser", null);
          commit("setIsAuthenticated", false);
        });
    },
    addFavTeam({ state }, payload) {
      firebase
        .database()
        .ref("users")
        .child(state.user.uid)
        .push(payload);
    },
    getFavTeam({ state, commit }) {
      return firebase
        .database()
        .ref("users/" + state.user.uid)
        .once("value", snapshot => {
          commit("setUserFavTeams", snapshot.val());
        });
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated;
    },
    getUser(state) {
      return state.user;
    },
    getErrJoin(state) {
      return state.err;
    },
    getTeam(state) {
      return state.favTeam;
    }
  }
});
