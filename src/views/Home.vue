<template>
<div>
  
 <template>
  <v-parallax
    dark
   >
    <v-layout
      align-center
      column
      justify-start
      
    >
    <v-icon x-large>add</v-icon>
      <h1 class="display-2 font-weight-thin mb-3">Football App</h1>
      <h4 class="subheading">Log in...</h4>
    </v-layout>
  </v-parallax>
</template>
 <div v-if="isAuthenticated">   
         <H1>logged </H1>
<f-team></f-team> 
      </div>
      <div v-else>
        Log in for exclusive content
        </div>
<!-- <odd-cards></odd-cards> -->
</div>
</template>

<script>
import OddCards from '@/components/OddCards.vue';
import FTeam from '@/components/FTeam.vue';
import TeamCard from '@/components/TeamCard.vue';

export default {
    name: 'Home',
    components: {OddCards,
    FTeam, TeamCard
    },
    data() {
        return {
            
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
