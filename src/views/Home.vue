<template>
<div>
 
 <div v-if="isAuthenticated">   
         <H1>logged  {{this.getUser}}</H1>
 user 
        
      </div>
<!-- <odd-cards></odd-cards> -->
</div>
</template>

<script>
import OddCards from '@/components/OddCards.vue';


export default {
    name: 'Home',
    components: {OddCards
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
