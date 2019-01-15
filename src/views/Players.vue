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
      <div v-if="players">
        

        <v-container grid-list-md pa-0 ma-auto>

         
          <v-layout  row wrap pa-0 ma-0>
          <v-flex  pa-0 ma-0 v-for="player  in players" :key="player.id">
              <player-card  v-bind:player=player v-bind:league=getLeague></player-card>
        </v-flex> 
          </v-layout>
        </v-container>

      </div>
      <div v-else>
          select team 
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
        selectedLeague: null
      }
    },
    methods: {
     
      getPlayers(team, badge) {
        this.loading = true
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
      
      
        this.getPlayers(this.selectedTeam.team, this.selectedTeam.badge)
        
      
    }
  };
</script>

<style scoped>
</style>