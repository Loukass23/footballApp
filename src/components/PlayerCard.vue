<template>
    <div>    
        <v-container fluid pa-1 my-1>
         <v-layout row justify-center fill-height align-content-end> 
            <v-hover>
            <v-card align-self-center slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto" @click="dialog = true"
              color="grey lighten-3" width="180" min-height="250">
            
            
            
            <v-layout row align-center > 
            <v-flex xs12>
            <v-card-title pa-0 primary-title>
                {{player.strPlayer}}
                
            </v-card-title>
            <v-img v-if="player.strCutout"  v-bind:src=player.strCutout max-height="160" contain></v-img>
            <v-img v-else  src="https://res.cloudinary.com/ds3w3iwbk/image/upload/v1547575682/Mike.jpg" max-height="160" contain></v-img>
            
            </v-flex>
             
            </v-layout>
        </v-card>
            </v-hover>
         </v-layout>
        </v-container>
        <v-dialog v-model="dialog" max-width="290">
            <v-container>
                <v-layout>
                    <v-flex row>
                    <v-card>
      <v-card-title>{{player.strPlayer}}</v-card-title>
      <v-card-text>{{player.strNationality}}</v-card-text>
      <v-card-text>{{player.Bateborn}}</v-card-text>
      <v-card-text>{{player.strPosition}}</v-card-text>
                    </v-card>
                    </v-flex>
                </v-layout>
            </v-container>

    </v-dialog>
    </div>
</template>
<script>

    export default {
        name: "PlayerCard",
        props: {
            player: null,
            league: null,
            dialog: false
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
            },
            setSelTeam(team, badge){
                             this.$store.dispatch('addTeam', {team, badge})

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