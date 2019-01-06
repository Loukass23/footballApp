<template>
  <div>
     <v-container grid-list-md text-xs-center >
         
    <v-layout row wrap  align-center justify-center fill-height>
    <v-flex v-for="team  in teams" :key="team.id" >
      <v-card color="grey lighten-3"  width="150">
        <v-img v-bind:src= team.strTeamBadge  height="150"  
            contains></v-img>

        <v-card-title primary-title>
          <div>
            <h4 >{{team.strTeam}}</h4>
          </div>
        </v-card-title>

        <v-card-actions>
            
              <v-spacer></v-spacer>
              <v-btn icon>
                    <v-icon>map</v-icon>
                  </v-btn>
          <v-btn @click="addTeam(team.strTeam)" icon>
                    <v-icon>favorite</v-icon>
                  </v-btn>
           <v-btn icon>
                    <v-icon>share</v-icon>
                  </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
     </v-container>
  </div>

 
</template>

<script>
import axios from "axios";
export default {
  name: "Teams",
  components: "",
  data() {
    return {
      teams: [],
      ligueUK: [
        "English%20Premier%20League",
        "https://www.thesportsdb.com/images/media/league/badge/xyrpuy1467456595.png"
      ],
      ligueFR: "French%20Ligue%201",
      ligueDE: "German%20Bundesliga"
    };
  },
  methods: {
    getTeams() {
      axios
        .get(
          "https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=" +
            this.ligueUK[0]
        )
        .then(response => {
          response = response.data;
          this.teams = response.teams;

          console.log(this.teams);
        })
        .catch(() => {
          this.teams = [];
        });
    },
    addTeam(item) {
        if (this.isAuthenticated) {
            this.$store.dispatch('addFavTeam', item);
        } else {
            this.$router.push('/sign-in');
        }
    }

  },
   computed: {
        favTeam() {
            return this.$store.state.favTeam;
        },
        isAuthenticated() {
            return this.$store.getters.isAuthenticated;
        }
   },
  created() {
    this.getTeams();
  }
};
</script>

<style scoped>
</style>
