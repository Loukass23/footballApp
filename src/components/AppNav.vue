<template>
  <span>
    <v-navigation-drawer fixed clipped class="primary lighten-2" app v-model="drawer">
      <v-list dense class="primary lighten-2">
        <template v-for="(item, i) in items">
          <v-divider dark v-if="item.divider" class="my-3" :key="i"></v-divider>
          <v-list-tile :key="i" v-else router :to="item.route">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="black--text">{{ item.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
        <!-- <v-text-field solo-inverted flat label="Search" prepend-icon="search"></v-text-field> -->
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="primary lighten-1" app absolute clipped-left>
      <v-layout ml-0 mr-2 align-center justify-center>
        <v-layout ml-0 justify-start align-center>
          <v-flex xs2 mx-0>
            <v-toolbar-side-icon @click.native="drawer = !drawer"></v-toolbar-side-icon>
          </v-flex>
          <v-flex @click="$router.push('/')" xs8>
            <span class="title ml-3 mr-5">
              Football&nbsp;
              <span class="text">App</span>
            </span>
          </v-flex>
        </v-layout>
        <v-spacer></v-spacer>
        <v-layout mx-1 px-1 row justify-end align-center v-if="isAuthenticated">
          <v-flex xs2>
            <v-avatar v-if="getUser.photoURL" size="35">
              <img v-bind:src="getUser.photoURL" alt="avatar">
            </v-avatar>
          </v-flex>
          <v-flex pl-1 xs6>
            <v-card-title>{{this.getUser.displayName}}</v-card-title>
          </v-flex>
          <v-flex xs1>
            <v-btn icon flat v-on:click="logout()">
              <v-icon>exit_to_app</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>

        <v-layout row align-center v-else>
          <v-btn icon flat to="/join">
            <v-icon>add_circle</v-icon>
          </v-btn>
          <v-btn icon flat to="/sign-in">
            <v-icon>account_circle</v-icon>
          </v-btn>
        </v-layout>
      </v-layout>
    </v-toolbar>
  </span>
</template>

<script>
export default {
  name: "AppNav",
  data: () => ({
    drawer: null,
    items: [
      {
        icon: "home",
        text: "Home",
        route: "/"
      },
      {
        icon: "group",
        text: "Teams",
        route: "/teams"
      },
      {
        icon: "person",
        text: "Players",
        route: "/players"
      },
      {
        icon: "date_range",
        text: "Events",
        route: "/events"
      },
      {
        icon: "favorite",
        text: "My Favorites",
        route: "/favteams"
      },
      {
        divider: true
      },
      {
        icon: "account_circle",
        text: "Log In",
        route: "/sign-in"
      },
      {
        icon: "add_circle",
        text: "Join",
        route: "/join"
      },
      {
        icon: "chat_bubble",
        text: "Chat",
        route: "/chat"
      }
    ]
  }),
  props: {
    source: String
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    getUser() {
      return this.$store.getters.getUser;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("userSignOut");
    }
  }
};
</script>

<style scoped>
#keep main .container {
  height: 660px;
}

.navigation-drawer__border {
  display: none;
}

.text {
  font-weight: 400;
}
</style>