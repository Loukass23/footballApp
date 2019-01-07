<template>
<div>
 
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

export default {
    name: 'Home',
    components: {OddCards,
    FTeam
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
