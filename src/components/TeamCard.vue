<template>
    <div>    
        <v-container fluid pa-1 my-1>
         <v-layout row justify-center fill-height px-.5> 
             <v-hover>
            <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto" @click="getTeams()" tile color="grey lighten-4" width="170" min-height="250">
            
            <v-img   v-bind:src=team.strTeamBadge max-height="160" contain></v-img>
            
            <v-layout row align-center > 
            <v-flex xs6>
            <v-card-title pa-0 primary-title>
                {{team.strTeam}}
                
            </v-card-title>
            </v-flex>
             <v-flex xs6>
            <v-card-actions  >
                 <div v-if="isAuthenticated">
                  <div v-for="(item, idx) in userTeams"  :key="idx">
                        <div v-if="team.strTeam == item">
                            <v-btn icon>
                                <v-icon @click="removeTeam(idx)" color="red">favorite</v-icon>
                            </v-btn>
                        </div>
                     </div> 
                      <div v-if="!isFavorite2(team.strTeam , this.userTeams )">
                <v-btn @click="addTeam(team.strTeam)" icon>
                        <v-icon>favorite</v-icon>
                    </v-btn>
                 </div>
                </div>                  
                 <div v-else>
                <v-btn @click="addTeam(team.strTeam)" icon>
                        <v-icon>favorite</v-icon>
                    </v-btn>
                 </div>
               
            </v-card-actions>
            </v-flex>
            </v-layout>
        </v-card>
             </v-hover>
         </v-layout>
        </v-container>
    </div>
</template>
<script>
    export default {
        name: "TeamCards",
        props: {
            team: null,
            league: null
        },
        methods: {
            addTeam(teamName) {
                if (this.isAuthenticated) {
                    this.$store.dispatch('addFavTeam', teamName);
                    this.getTeams();
                } else {
                    this.$router.push('/sign-in');
                }
            },
            removeTeam(teamName) {
                console.log(teamName)
                if (this.isAuthenticated) {
                    this.$store.dispatch('removeFavTeam', teamName);
                    this.getTeams();
                } else {
                    this.$router.push('/sign-in');
                }
            },
            getTeams() {
                this.$store.dispatch('getFavTeam');
                
            },
            isFavorite(teamCards, fav){
                
              var heart = false
                  if(teamCards == fav){
                      heart = true
                  }
                return heart   
              }
               
            ,
            isFavorite2(teamCards, fav){
              var heart = false
              for (var i in fav){
                 
                  if(teamCards == fav[i]){
                      
                      heart = true
                  }
                  
              }
               return heart 
            }
        },
        computed: {
            isAuthenticated() {
                return this.$store.getters.isAuthenticated;
            },
            userTeams() {
                return this.$store.state.favTeam;
            }
        },
        mounted() {
            if (this.isAuthenticated) {
                this.getTeams();
            }

        }

    }
</script>

<style scoped>

</style>