<template>
<div>
<team-selector></team-selector>
<v-parallax my-0
    dark
    height="200"
    src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
   >
    <v-layout
      align-center
      column
      justify-center
      
    >
  
      <h1 class="display-2 font-weight-bold black--text">Football App</h1>
      <h4 class="subheading black--text">All you need about football!</h4>
    </v-layout>
  </v-parallax>
  

    <v-layout  v-if="!isAuthenticated" align-content-center justify-center>
     <v-flex align-self-center xs12 >   
    <v-alert 
      v-model="info"
      dismissible
      type="info"
      icon="account_circle"
    >
     
    <v-btn small flat  to="/sign-in">
      Log in get personalized feed</v-btn>
     
      </v-alert>
    </v-flex>
    </v-layout >
    <div v-if="isAuthenticated">   
     <v-layout>
         <v-card>
         <v-card-title>Hi {{getUser.displayName}}, it is nice to see you again, here is what you missed </v-card-title>
         </v-card>
     </v-layout>
<f-team></f-team> 
      </div>
    <v-layout column xs12 align-content-center justify-center v-if="getLeague">
   <v-card color="primary lighten-4">
         <v-card-title class="font-weight-bold ">Last game {{getLeague.leagueName}}</v-card-title>

      <event :league='getLeague' :number=1 :next='false'></event>
      <v-card-title class="font-weight-bold ">Next game {{getLeague.leagueName}}</v-card-title>

      <event :league='getLeague' :number=1 :next='true'></event>
      <v-btn>see more results</v-btn>
      </v-card>
    </v-layout>

 
      
<!-- <odd-cards></odd-cards> -->

</div>
</template>

<script>
import OddCards from '@/components/OddCards.vue';
import FTeam from '@/components/FTeam.vue';
import TeamCard from '@/components/TeamCard.vue';
import TeamSelector from '@/components/TeamSelector.vue';
import Event from '@/components/Event.vue';

export default {
    name: 'Home',
    components: {OddCards,
    FTeam, TeamCard, TeamSelector, Event
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
        }
    }
};
</script>
