<template>
<div v-if="!selectedLeague">
 <v-toolbar>
      <v-icon large color="grey darken-2">date_range</v-icon>
      <v-toolbar-title>Select League</v-toolbar-title>
    </v-toolbar>
<v-container grid-list-md text-xs-center >
<v-layout row wrap  align-center justify-center fill-height>
  <v-flex v-for="ligue  in ligues.ligues" :key="ligue.id" >
        <v-hover>
            <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto"  @click="getEvents(ligue.id, ligue.name, ligue.img)" 
              color="grey lighten-3" width="200">
      
        <v-img v-bind:src= ligue.img  height="150"  
            contains></v-img>

        <v-card-title primary-title>
          <div>
            <h4 >{{ligue.name}}</h4>
          </div>
        </v-card-title>
       
      </v-card> 
        </v-hover>
    </v-flex>
  </v-layout>
   </v-container>
  </div>
 <div v-else>
   
      <v-toolbar>
          <v-btn icon light>
            <v-icon large @click="clearLeague()" color="grey darken-2">arrow_back</v-icon>
          </v-btn>

         
          <v-spacer></v-spacer>

<v-toolbar-title>Events</v-toolbar-title>
 <v-avatar
          :tile="tile"
          :size="avatarSize"
          color="grey lighten-4"
        >
          <img :src= selectedLeague alt="avatar">
        </v-avatar>
          <v-spacer></v-spacer>

        
        </v-toolbar>

   <v-container text-xs-center >
   <v-timeline >
    <v-timeline-item
      v-for="event in events"
      :key="event.id" 
      color="primary darken-2"
      
    > 
    
        <v-card-text slot="opposite" >
         
          <v-icon>date_range</v-icon>
           {{event.dateEvent}}   
        </v-card-text>
   <v-flex>
     
      <v-card class="elevation-2" color="primary lighten-1">
          
        <v-card-title >{{event.strHomeTeam}} - {{event.strAwayTeam}}</v-card-title>
        <v-btn 
      color="primary"
      dark
      @click="dialog = true"
    large icon>
                        <v-icon >map</v-icon>
                    </v-btn>
          
      </v-card>
      </v-flex>
    </v-timeline-item>
  </v-timeline>
  </v-container>
    <v-dialog
      v-model="dialog"
      max-width="290"
    >
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4856.819352453805!2d13.32876897078897!3d52.50792467230733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a84fbd52021f6b%3A0x99e9b329f2a01778!2sUbiqum+Code+Academy+Berlin!5e0!3m2!1sfr!2sde!4v1546606531045" width="300" height="250" frameborder="0" style="border:0" allowfullscreen></iframe> 

    </v-dialog>
 </div>
 

</template>

<script>
import axios from "axios";
export default {
  name: "Schedule",
  data() {
    return {
      events: [],
      dialog: false,
      selectedLeague: null,
       ligues: {
         "ligues": [
    { "name":"English Premier League", "id":"4328", "img":"https://www.thesportsdb.com/images/media/league/badge/xyrpuy1467456595.png" },
    { "name":"French Ligue 1", "id":"4334", "img": "https://www.thesportsdb.com/images/media/league/badge/8f5jmf1516458074.png" },
    { "name":"German Bundesliga","id":"4331", "img":"https://www.thesportsdb.com/images/media/league/badge/0j55yv1534764799.png" }
  ]

      }
    };
  },
  methods: {
    getEvents(leagueid, leagueName, leagueImg) {
      axios
        .get(
          "https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id="+leagueid,
          {
            params: {}
          }
        )
        .then(response => {
          response = response.data;
          this.events = response.events;
          this.selectedLeague = leagueImg;
           this.$store.dispatch('addLeague', leagueName)
        })
        .catch(() => {
          this.events = [];
        });
    },
    clearLeague() {
      this.selectedLeague = null;
      this.$store.dispatch('addLeague', null)
    }
  },
  
 computed: {
         getLeague() {
            return this.$store.getters.getLeague;
        }
 },
 created() {
   if(getLeague){
     getTeams
   }
 }
};
</script>

<style scoped>
</style>
