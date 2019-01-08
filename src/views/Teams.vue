<template>
  
    <div v-if="selectedLeague">
     <v-responsive> 
      <v-toolbar color="white" flat>
          <v-btn icon light>
            <v-icon large @click="clearLeague()" color="grey darken-2">arrow_back</v-icon>
          </v-btn>

          <v-toolbar-title ></v-toolbar-title>
          <v-spacer></v-spacer>
<h1> Teams</h1>
<v-avatar
          
          color="grey lighten-4"
        >
          <img v-bind:src= this.selectedLeague alt="avatar">
        </v-avatar>
          <v-spacer></v-spacer>

        
        </v-toolbar>
     </v-responsive>
     <v-container grid-list-md text-xs-center >
         
    <v-layout row wrap  align-center justify-center fill-height>
    <v-flex v-for="team  in teams" :key="team.id" >
      <team-card v-bind:team= team v-bind:league= getLeague></team-card>
    </v-flex>
</v-layout>
     </v-container>
  </div> 
   
    <div v-else>
        <v-toolbar>
  <v-icon large color="grey darken-2">group</v-icon>
  <v-toolbar-title>Select League</v-toolbar-title>
  </v-toolbar>
  
<v-container grid-list-md text-xs-center >
<v-layout row wrap  align-center justify-center fill-height>
  <v-flex v-for="ligue  in ligues.ligues" :key="ligue.id" >
      <v-card color="grey lighten-3"  width="150">
        <v-img v-bind:src= ligue.img  height="150"  
            contains></v-img>

        <v-card-title primary-title>
          <div>
            <h4 >{{ligue.name}}</h4>
          </div>
        </v-card-title>
        <v-card-actions>
            
              <v-spacer></v-spacer>
            <v-btn @click="getTeams(ligue.nameStr , ligue.name, ligue.img)" large icon>
                        <v-icon>done</v-icon>
                    </v-btn>
          
        </v-card-actions>
      </v-card> 
    </v-flex>

  </v-layout>
   </v-container>
  </div>

 
</template>

<script>
import TeamCard from '@/components/TeamCard.vue';
import axios from "axios";
export default {
  name: "Teams",
  components: {TeamCard},
  data() {
    return {
      teams: [],
      selectedLeague: null,
      ligues: {
         "ligues": [
    { "name":"English Premier League", "nameStr":"English%20Premier%20League", "img":"https://www.thesportsdb.com/images/media/league/badge/xyrpuy1467456595.png" },
    { "name":"French Ligue 1", "nameStr":"French%20Ligue%201", "img": "https://www.thesportsdb.com/images/media/league/badge/8f5jmf1516458074.png" },
    { "name":"German Bundesliga","nameStr":"German%20Bundesliga", "img":"https://www.thesportsdb.com/images/media/league/badge/0j55yv1534764799.png" }
  ]

      }
    };
  },
  methods: {
    getTeams(league, leagueName, leagueImg) {
      axios
        .get(
          "https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=" +
            league
        )
        .then(response => {
          response = response.data;
          this.teams = response.teams;
          this.$store.dispatch('addLeague', leagueName)
          this.selectedLeague = leagueImg
        })
        .catch(() => {
          this.teams = [];
        });
    },
    addTeam(item) {
        if (this.isAuthenticated) {
          // console.log(item);
            this.$store.dispatch('addFavTeam', item);
        } else {
            this.$router.push('/sign-in');
        }
    },
    clearLeague() {
       this.$store.dispatch('addLeague', null)
       this.selectedLeague = null
    }

  },
   computed: {
        
        isAuthenticated() {
            return this.$store.getters.isAuthenticated;
        },
         getLeague() {
            return this.$store.getters.getLeague;
        }

   },
  created() {
   
  }
};
</script>

<style scoped>
</style>
