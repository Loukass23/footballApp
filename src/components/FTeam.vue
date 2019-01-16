
<template>
    <v-container align-content-center justify-center >
         <h1 class="text-xs-center text title my-3 font-weight-bold black--text">Favorite Teams</h1>
        <v-layout row wrap xs12>
 
        
            <div v-for="(item, idx) in userTeams" class="text-xs-center" :key="idx">
                 
          <v-chip >{{item}}</v-chip>
        </div>
              
           
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'FTeam',
    computed: {
        userTeams() {
            return this.$store.state.favTeam;
        }
    },
    mounted() {
        this.getTeams();
    },
    methods: {
        getTeams() {
            this.$store.dispatch('getFavTeam');
        },
        removeTeam(teamName) {
                
               console.log(teamName)
                    this.$store.dispatch('removeFavTeam', teamName);
                    this.getTeams();
               
            }
    },
    created() {
        
    },
};
</script>

<style scoped>
</style>
