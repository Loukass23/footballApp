<template>

  <div v-if="getLeague">
<div v-if="loading">
  <v-container>
  <scale-loader></scale-loader>
  </v-container>
</div>
<div v-else>
<v-flex justify-center >
    <v-toolbar>
      <v-btn icon light>
        <v-icon large @click="clearLeague()" color="grey darken-2">arrow_back</v-icon>
      </v-btn>
<v-spacer></v-spacer>
      <v-toolbar-title>Teams </v-toolbar-title>
      <v-avatar color="grey lighten-4">
        <img v-bind:src=this.selectedLeague alt="avatar">
      </v-avatar>
    </v-toolbar>

</v-flex>
    <v-container grid-list-md pa-0 ma-auto >

      <v-layout row wrap pa-0 ma-0>
        <v-flex pa-0 ma-0 v-for="team  in teams" :key="team.id">
          <team-card v-bind:team=team v-bind:league=getLeague></team-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
  </div>
  <div v-else>
    <v-toolbar>
      <v-icon large color="grey darken-2">group</v-icon>
      <v-toolbar-title>Select League</v-toolbar-title>
    </v-toolbar>

    <v-container grid-list-md text-xs-center>
      <v-layout row wrap align-center justify-center fill-height>
        <v-flex v-for="ligue  in ligues.ligues" :key="ligue.idx">
          <v-hover>
            <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto" @click="getTeams(ligue.nameStr, ligue.id , ligue.name, ligue.img)"
              color="grey lighten-3" width="200">
              <v-img v-bind:src=ligue.img height="150" contains></v-img>

              <v-card-title primary-title>
                <div>
                  <h4>{{ligue.name}}</h4>
                </div>
              </v-card-title>

            </v-card>
          </v-hover>
        </v-flex>

      </v-layout>
    </v-container>
  </div>


</template>

<script>
import ScaleLoader from '@/components/ScaleLoader.vue'
  import TeamCard from '@/components/TeamCard.vue';
  import axios from "axios";
  export default {
    name: "Teams",
    components: {
      TeamCard, ScaleLoader
    },
    data() {
      return {
        teams: [],
        loading: true ,
        selectedLeague: null,
        ligues: {
          "ligues": [{
              "name": "English Premier League",
              "id":"4328",
              "nameStr": "English%20Premier%20League",
              "img": "https://www.thesportsdb.com/images/media/league/badge/xyrpuy1467456595.png"
            },
            {
              "name": "French Ligue 1",
              "id":"4334",
              "nameStr": "French%20Ligue%201",
              "img": "https://www.thesportsdb.com/images/media/league/badge/8f5jmf1516458074.png"
            },
            {
              "name": "German Bundesliga",
              "id":"4331",
              "nameStr": "German%20Bundesliga",
              "img": "https://www.thesportsdb.com/images/media/league/badge/0j55yv1534764799.png"
            } ,
            {
              "name": "Spanish La Liga",
              "id":"4335",
              "nameStr": "Spanish%20La%20Liga",
              "img": "https://www.thesportsdb.com/images/media/league/badge/7onmyv1534768460.png"
            }
          ]
            

        }
      };
    },
    methods: {
      getTeams(league, leagueId, leagueName, leagueImg) {
        axios
          .get(
            "https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=" +
            league
          )
          .then(response => {
            response = response.data;
            this.teams = response.teams;
            this.$store.dispatch('addLeague', {league, leagueId, leagueName, leagueImg})
            this.selectedLeague = leagueImg
            this.loading = false;
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
if(this.getLeague){
  let league = this.getLeague
  this.getTeams(league.league,league.leagueId, league.leagueName, league.leagueImg)
}
    }
  };
</script>

<style scoped>
</style>