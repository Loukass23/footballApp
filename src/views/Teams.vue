<template>
  <div>
   <team-selector></team-selector>

    <div>
<div v-if="loading">
          <v-container>
            <scale-loader></scale-loader>
          </v-container>
        </div>
 <div v-else>       
      <div v-if="getLeague">
        

        <v-container grid-list-md pa-0 ma-auto>

          <v-layout row wrap pa-0 ma-0>
            <v-flex  pa-0 ma-0 v-for="team  in teams" :key="team.id">
              <team-card  v-bind:team=team v-bind:league=getLeague></team-card>
            </v-flex>
          </v-layout>
          <v-layout else row wrap pa-0 ma-0>
            
          </v-layout>
        </v-container>

      </div>
      <div v-else>
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
        
 </div>
    </div>
  </div>
</template>

<script>
  import ScaleLoader from '@/components/ScaleLoader.vue'
  import TeamCard from '@/components/TeamCard.vue';
  import PlayerCard from '@/components/PlayerCard.vue';
  import TeamSelector from '@/components/TeamSelector.vue';

  import axios from "axios";
  export default {
    name: "Teams",
    components: {
      TeamCard,
      PlayerCard,
      ScaleLoader,
      TeamSelector
    },
    data() {
      return {
        teams: [],
        players: null,
        loading: false,
        selectedLeague: null,
        ligues: {
          "ligues": [{
              "name": "English Premier League",
              "id": "4328",
              "nameStr": "English%20Premier%20League",
              "img": "https://www.thesportsdb.com/images/media/league/badge/xyrpuy1467456595.png"
            },
            {
              "name": "French Ligue 1",
              "id": "4334",
              "nameStr": "French%20Ligue%201",
              "img": "https://www.thesportsdb.com/images/media/league/badge/8f5jmf1516458074.png"
            },
            {
              "name": "German Bundesliga",
              "id": "4331",
              "nameStr": "German%20Bundesliga",
              "img": "https://www.thesportsdb.com/images/media/league/badge/0j55yv1534764799.png"
            },
            {
              "name": "Spanish La Liga",
              "id": "4335",
              "nameStr": "Spanish%20La%20Liga",
              "img": "https://www.thesportsdb.com/images/media/league/badge/7onmyv1534768460.png"
            }
          ]


        }
      };
    },
    methods: {
      getTeams(league, leagueId, leagueName, leagueImg) {
        this.loading = true;
        axios
          .get(
            "https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=" +
            league
          )
          .then(response => {
            response = response.data;
            this.teams = response.teams;
             console.log(this.teams)
            this.$store.dispatch('addLeague', {
              league,
              leagueId,
              leagueName,
              leagueImg
            })
            this.selectedLeague = leagueImg
            this.loading = false;
          })
          .catch(() => {
            this.teams = [];
          });
      },
      getPlayers(team, badge) {
        
        axios
          .get(
            "https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?t="+ team
            
          )
          .then(response => {
            response = response.data;
            this.players = response.player;
            console.log(this.players)
            this.setSelTeam(team, badge)
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
        this.clearTeam()
        this.$store.dispatch('addLeague', null)
        this.selectedLeague = null
      },
      clearTeam() {
        this.$store.dispatch('addTeam', null)
        this.selectedTeam = null
        this.players= null
      },
      
            setSelTeam(team, badge){
                             this.$store.dispatch('addTeam', {team, badge})

            }

    },
    computed: {

      isAuthenticated() {
        return this.$store.getters.isAuthenticated;
      },
      getLeague() {

        return this.$store.getters.getLeague;
      },
      selectedTeam() {
        return this.$store.getters.selTeam;
      }

    },
    created() {
      
      if (this.getLeague) {

        let league = this.getLeague
        this.getTeams(league.league, league.leagueId, league.leagueName, league.leagueImg)
        
      }
    }
  };
</script>

<style scoped>
</style>