<template>
  <div>
    <v-container justify-center align-content-center my-0 mx-auto pa-0>
      <team-selector></team-selector>
      <v-parallax
        pt-0
        my-0
        dark
        height="200"
        src="https://res.cloudinary.com/ds3w3iwbk/image/upload/v1547570066/paralax3.png"
      >
        <v-layout align-center column justify-center>
          <h1 class="display-2 font-weight-bold black--text">Football App</h1>
          <h4 class="subheading black--text">All you need to know about football!</h4>
        </v-layout>
      </v-parallax>

      <!-- log in card -->
      <v-layout my-2 v-if="!isAuthenticated" align-content-center justify-center align-center>
        <v-flex align-self-center xs12>
          <v-alert v-model="info" type="info" icon="account_circle">
            <v-btn small flat to="/sign-in">Log in get personalized feed</v-btn>
          </v-alert>
        </v-flex>
      </v-layout>

      <!-- welcome back card -->
      <v-layout column my-2 v-if="isAuthenticated">
        <v-card elevation="6" color="secondary" xs12>
          <v-card-title>Hi {{getUser.displayName}}, it is nice to see you again</v-card-title>
        </v-card>
      </v-layout>

      <!-- shortcuts card -->
      <v-layout column my-2 v-if="getLeague && selectedTeam">
        <v-card elevation="6" color="grey lighten-4" xs12>
          <v-card-text
            class="justify-center"
          >Great choice! Now what would you wanna know about that?</v-card-text>
          <v-card-actions>
            <v-layout mx-auto justify-space-around align-center>
              <v-flex class="justify-center" xs3 align-self-center>
                <v-btn color="primary" @click="$router.push('players')" outline>Players</v-btn>
              </v-flex>
              <v-flex xs3 align-self-center>
                <v-btn color="primary" @click="$router.push('events')" outline>events</v-btn>
              </v-flex>
              <v-flex xs3 align-self-center>
                <v-btn color="primary" @click="$router.push('teams')" outline>Teams</v-btn>
              </v-flex>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-layout>

      <!-- favorite teams card -->
      <v-layout column my-3 v-if="isAuthenticated">
        <v-card elevation="6" color="teal lighten-1" my-4 xs12>
          <f-team></f-team>
        </v-card>
      </v-layout>

      <!-- last game league card -->
      <v-layout my-3 column xs12 align-content-center justify-center v-if="getLeague">
        <v-card elevation="6" height="300" color="primary">
          <v-layout row justify-center align-center>
            <v-flex xs2>
              <v-avatar size="35">
                <img v-bind:src="getLeague.leagueImg" alt="avatar">
              </v-avatar>
            </v-flex>
            <v-flex align-self-center xs6>
              <v-card-title class="font-weight-bold black--text primary text-xs-center">
                Last game
                {{getLeague.leagueName}}
              </v-card-title>
            </v-flex>
            <v-flex xs2>
              <v-btn @click="setType('pastleague')" small align-self-center flat>more</v-btn>
            </v-flex>
          </v-layout>
          <event :id="getLeague.leagueId" :number="1" :next="'pastleague'"></event>
        </v-card>
      </v-layout>
      <!-- last game team card -->
      <v-layout my-3 column xs12 align-content-center justify-center v-if="selectedTeam">
        <v-card elevation="6" height="300" color="teal">
          <v-layout row justify-center align-center>
            <v-flex xs2>
              <v-avatar size="35">
                <img v-bind:src="selectedTeam.badge" alt="avatar">
              </v-avatar>
            </v-flex>
            <v-flex align-self-center xs6>
              <v-card-title class="font-weight-bold black--text teal text-xs-center">
                Last game
                {{selectedTeam.team}}
              </v-card-title>
            </v-flex>
            <v-flex xs2>
              <v-btn @click="setType('last')" small align-self-center flat>more</v-btn>
            </v-flex>
          </v-layout>
          <event :id="selectedTeam.teamID" :number="1" :next="'last'"></event>
        </v-card>
      </v-layout>

      <!-- select team card -->
      <v-layout column my-2 v-else>
        <v-card elevation="6" color="green600 lighten-2">
          <v-layout align-content-center justify-center>
            <v-flex xs6>
              <v-card-title>For more content</v-card-title>
            </v-flex>
            <v-flex align-self-center xs4>
              <v-btn small outline color="primary" @click="$router.push('teams')">Select League</v-btn>
            </v-flex>
          </v-layout>
        </v-card>
      </v-layout>

      <!-- next game card -->
      <v-layout wrap my-2 column xs12 align-content-center justify-center v-if="getLeague">
        <v-card elevation="6" height="300" color="primary">
          <v-layout row justify-center align-center>
            <v-flex xs2>
              <v-avatar size="35">
                <img v-bind:src="getLeague.leagueImg" alt="avatar">
              </v-avatar>
            </v-flex>
            <v-flex align-self-center xs6>
              <v-card-title class="font-weight-bold black--text text-xs-center">
                Next game
                {{getLeague.leagueName}}
              </v-card-title>
            </v-flex>
            <v-flex xs2>
              <v-btn @click="setType('nextleague')" small align-self-center flat>more</v-btn>
            </v-flex>
          </v-layout>
          <event :id="getLeague.leagueId" :number="1" :next="'nextleague'"></event>
        </v-card>
      </v-layout>
      <!-- next game team card -->
      <v-layout my-3 column xs12 align-content-center justify-center v-if="selectedTeam">
        <v-card elevation="6" height="300" color="teal">
          <v-layout row justify-center align-center>
            <v-flex xs2>
              <v-avatar size="35">
                <img v-bind:src="selectedTeam.badge" alt="avatar">
              </v-avatar>
            </v-flex>
            <v-flex align-self-center xs6>
              <v-card-title class="font-weight-bold black--text teal text-xs-center">
                Next game
                {{selectedTeam.team}}
              </v-card-title>
            </v-flex>
            <v-flex xs2>
              <v-btn @click="setType('next')" small align-self-center flat>more</v-btn>
            </v-flex>
          </v-layout>
          <event :id="selectedTeam.teamID" :number="1" :next="'next'"></event>
        </v-card>
      </v-layout>

      <!-- join chat card -->
      <v-layout row my-2 align-content-center justify-center>
        <v-flex xs12 align-self-center>
          <v-card elevation="6" color="secondary" @click="$router.push('chat')">
            <v-layout align-center justify-center>
              <v-flex xs2 align-self-center>
                <v-icon>chat_bubble</v-icon>
              </v-flex>
              <v-flex xs8 align-self-center>
                <v-card-text>
                  <p class="text-xs-center">Come and join the chat</p>
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import FTeam from "@/components/FTeam.vue";
import TeamSelector from "@/components/TeamSelector.vue";
import Event from "@/components/Event.vue";

export default {
  name: "Home",
  components: {
    FTeam,
    TeamSelector,
    Event
  },
  data() {
    return {
      info: true
    };
  },

  computed: {
    getLeague() {
      return this.$store.getters.getLeague;
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    getUser() {
      return this.$store.getters.getUser;
    },
    selectedTeam() {
      return this.$store.getters.selTeam;
    }
  },
  methods: {
    setType(type) {
      localStorage.setItem("type", type);
      this.$router.push("events");
    }
  }
};
</script>


<style scoped>
.v-card__actions {
  display: inline;
}
</style>