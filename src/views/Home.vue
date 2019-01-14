<template>
<div>
<team-selector></team-selector>
<v-container mx-0 px-0 >
    <v-layout  v-if="!isAuthenticated" align-content-center justify-center>
     <v-flex align-self-center xs12 >   
    <v-alert 
      v-model="info"
      dismissible
      type="info"
      icon="account_circle"
    >
     
    <v-btn small flat  to="/sign-in">
      Log in get personalized info</v-btn>
     
      </v-alert>
    </v-flex>
    </v-layout>
  <v-parallax
    dark
    height="200"
   >
    <v-layout
      align-center
      column
      justify-start
      
    >
    <v-icon x-large>add</v-icon>
      <h1 class="display-2 font-weight-thin mb-3">Football App</h1>
      <h4 class="subheading">All you need about football!</h4>
    </v-layout>
  </v-parallax>
  

 <div v-if="isAuthenticated">   
     <v-layout>
         <v-card>
         <v-card-title>Hi {{getUser.displayName}}, it is nice to see you again, here is what you missed </v-card-title>
         </v-card>
     </v-layout>
<f-team></f-team> 
      </div>
      <div v-else>
        Log in for exclusive content
        </div>
<!-- <odd-cards></odd-cards> -->
</v-container>
</div>
</template>

<script>
import OddCards from '@/components/OddCards.vue';
import FTeam from '@/components/FTeam.vue';
import TeamCard from '@/components/TeamCard.vue';
import TeamSelector from '@/components/TeamSelector.vue';

export default {
    name: 'Home',
    components: {OddCards,
    FTeam, TeamCard, TeamSelector
    },
    data() {
        return {
            info: true
            
        };
    },
    
    computed: {

        isAuthenticated() {
            return this.$store.getters.isAuthenticated;
        },
        getUser() {
            return this.$store.getters.getUser;
        }
    }
};
</script>
