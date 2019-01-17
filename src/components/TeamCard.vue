<template>
    <div>    
        <v-container fluid pa-1 my-1>
         <v-layout row justify-center fill-height > 
            
            <v-card  class="mx-auto" 
              color="grey lighten-3" width="180" min-height="250">
            
            <v-img @click="setTeams(team.strTeam, team.strTeamBadge, team.idTeam)"   v-bind:src=team.strTeamBadge max-height="160" contain></v-img>

            <v-layout row align-center > 
            <v-flex xs6>
            <v-card-title @click="getPlayers(team.strTeam, team.strTeamBadge)" pa-0 primary-title>
                <h4>{{team.strTeam}}</h4>
                
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
                 <v-btn  @click="dialog = true" icon>
                        <v-icon>info</v-icon>
                    </v-btn>
               
            </v-card-actions>
            </v-flex>
            </v-layout>
        </v-card>
           
         </v-layout>
        </v-container>
             <v-dialog v-model="dialog" >
             <div class="text-xs-center">
   

      <v-card>
        <v-card-title
          class="headline primary lighten-2"
          primary-title
        >         
                {{ team.strTeam }}
             
        </v-card-title>
        <v-layout row align-center justify-center>
         <v-flex xs12 tag="strong"  text-xs-center mr-3 mb-2>Formed in: {{ team.intFormedYear }}</v-flex>
        <v-flex xs12  tag="strong"  text-xs-center mr-3 mb-2>Stadium: {{ team.strStadium }}</v-flex>
    <v-flex xs12 tag="strong"  text-xs-center mr-3 mb-2>Location: {{ team.strStadiumLocation}}</v-flex>
             
        </v-layout>
        <v-card-text>
            {{ team.strDescriptionEN}}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="dialog = false"
          >
           OK
          </v-btn>
        </v-card-actions>
      </v-card>
           
             </div>
    </v-dialog>
    </div>
</template>
<script>
    export default {
        name: "TeamCards",
        props: {
            team: null,
            league: null,
            dialog: false
        },
        methods: {
             getPlayers(team, badge){
        this.$parent.getPlayers(team, badge);
        
    },
    setTeams(team, badge, teamID){
        this.$store.dispatch('addTeam', {team, badge, teamID})
         this.$router.push('/');
    },
            addTeam(teamName) {
                if (this.isAuthenticated) {
                    this.$store.dispatch('addFavTeam', teamName);
                    this.getTeams();
                } else {
                    this.$router.push('/sign-in');
                }
            },
            removeTeam(teamName) {
                
                if (this.isAuthenticated) {
                    this.$store.dispatch('removeFavTeam', teamName);
                    this.getTeams();
                } else {
                    this.$router.push('/sign-in');
                }
            },
            getTeams() {
                this.$store.dispatch('getFavTeam');
                
            }
            ,
            isFavorite2(teamCards, fav){
              var heart = false
              console.log(fav)
              for (var i in fav){
                  console.log(teamCards + " "+fav[i])
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