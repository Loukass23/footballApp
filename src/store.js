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
    leagueSelected: null,
    teamSelected: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
      if (payload.uid != null) {
        localStorage.setItem("useruid", payload.uid);
        localStorage.setItem("userName", payload.displayName);
      }
      console.log(payload);
      router.push("/");
    },
    setIsAuthenticated(state, payload) {
      state.isAuthenticated = payload;
      router.push("/");
    },
    setUserFavTeams(state, payload) {
      state.favTeam = payload;
    },
    setLeague(state, payload) {
      state.leagueSelected = payload;
    },
    setTeam(state, payload) {
      state.teamSelected = payload;
    }
  },
  actions: {
    userJoin({ commit }, { email, password, username }) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(() => {
          commit("setUser", null);
          commit("setIsAuthenticated", false);
          alert("adress is alresady used");
          router.push("/sign-in");
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
          localStorage.clear();
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
        .child(state.user.uid + "/teams")
        .push(payload);
    },
    addLeague({ commit }, payload) {
      commit("setLeague", payload);
    },
    addTeam({ commit }, payload) {
      commit("setTeam", payload);
    },
    getFavTeam({ state, commit }) {
      return firebase
        .database()
        .ref("users/" + state.user.uid + "/teams")
        .once("value", snapshot => {
          commit("setUserFavTeams", snapshot.val());
        });
    },
    removeFavTeam({ state }, key) {
      return firebase
        .database()
        .ref("users/" + state.user.uid + "/teams/" + key)
        .remove();
    },
    addUserCookies({ commit }, payload) {
      commit("setUser", payload);
      commit("setIsAuthenticated", true);
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
    },
    getLeague(state) {
      return state.leagueSelected;
    },
    selTeam(state) {
      return state.teamSelected;
    }
  }
});
