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
    teamSelected: null,
    posts: []
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
      if (payload != null) {
        localStorage.setItem("useruid", payload.uid);
        localStorage.setItem("userName", payload.displayName);
        localStorage.setItem("avatar", payload.photoURL);
      }
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
      if (payload != null) {
        localStorage.setItem("favLeagueName", payload.league);
        localStorage.setItem("favLeagueBadge", payload.leagueImg);
        localStorage.setItem("favLeagueID", payload.leagueId);
        localStorage.setItem("favLeagueNamestr", payload.leagueName);
      } else {
        localStorage.removeItem("favLeagueName");
        localStorage.removeItem("favLeagueBadge");
        localStorage.removeItem("favLeagueID");
        localStorage.removeItem("favLeagueNamestr");
      }
    },
    setTeam(state, payload) {
      state.teamSelected = payload;
      if (payload != null) {
        localStorage.setItem("favTeamName", payload.team);
        localStorage.setItem("favTeamBadge", payload.badge);
        localStorage.setItem("favTeamID", payload.teamID);
      } else {
        localStorage.removeItem("favTeamName");
        localStorage.removeItem("favTeamBadge");
        localStorage.removeItem("favTeamID");
      }
    },
    setPosts(state, payload) {
      state.posts = payload;
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
          localStorage.clear();
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
        .child(state.user.uid + "/teams")
        .push(payload);
    },
    addChat({ state }, sbody) {
      let d = new Date();
      let postData = {
        name: state.user.displayName,
        body: sbody,
        date: d.toUTCString()
      };
      // Get a key for a new Post
      let newPostKey = firebase
        .database()
        .ref()
        .child("posts")
        .push().key;

      // Write the new post's data simultaneously in the posts list and the user's post list
      let updates = {};
      updates[newPostKey] = postData;

      firebase
        .database()
        .ref("posts")
        .update(updates);
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
    getPosts({ commit }) {
      return firebase
        .database()
        .ref("posts/")
        .on("value", snapshot => {
          commit("setPosts", snapshot.val());
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
    },
    getPosts(state) {
      return state.posts;
    }
  }
});
