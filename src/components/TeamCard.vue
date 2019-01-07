<template>
    <div>
        <v-card color="grey lighten-3" width="150">
            <v-img v-bind:src=team.strTeamBadge height="150" contains></v-img>

            <v-card-title primary-title>
                <div>
                    <h4>{{team.strTeam}}</h4>
                </div>
            </v-card-title>

            <v-card-actions>
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
                        <v-icon>add</v-icon>
                    </v-btn>
                 </div>
                     
                
                </div>  
                 
                 <div v-else>
                <v-btn @click="addTeam(team.strTeam)" icon>
                        <v-icon>add</v-icon>
                    </v-btn>
                 </div>
    

                <v-btn icon  >
                    <v-icon>share</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
    export default {
        name: "TeamCards",
        props: {
            team: null
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