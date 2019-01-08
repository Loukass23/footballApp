<template>
<div>
 <template>
  <v-parallax
    dark
    src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
  >
    <v-layout
      align-center
      column
      justify-center
    >
      <h1 class="display-2 font-weight-thin mb-3">Football App</h1>
      <h4 class="subheading">Log in...</h4>
    </v-layout>
  </v-parallax>
</template>
 <div v-if="isAuthenticated">   
         <H1>logged </H1>
<f-team></f-team>

        
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
    },
   
    
};
</script>
