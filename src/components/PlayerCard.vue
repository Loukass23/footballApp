<template>
    <div>    
        <v-container fluid pa-1 my-1>
         <v-layout row justify-center fill-height align-content-end> 
            <v-hover>
            <v-card align-self-center slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto" @click="dialog = true"
              color="grey lighten-3" width="180" min-height="250">
            
            
            
            <v-layout row align-center justify-center > 
            <v-flex xs12 align-self-center>
            <v-card-title pa-0 primary-title  text-xs-center>
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
        <v-dialog v-model="dialog" >
             <div class="text-xs-center">
   

      <v-card>
        <v-card-title
          class="headline primary lighten-2"
          primary-title
        >         
                {{ player.strPlayer }}
             
        </v-card-title>
        <v-layout row align-center justify-center>
         <v-flex xs12 tag="strong"  text-xs-center mr-3 mb-2>Position: {{ player.strPosition }}</v-flex>
        <v-flex xs12  tag="strong"  text-xs-center mr-3 mb-2>Nationality: {{ player.strNationality }}</v-flex>
    <v-flex xs12 tag="strong"  text-xs-center mr-3 mb-2>Born on: {{ player.dateBorn}}</v-flex>
             
        </v-layout>
        <v-card-text>
            {{ player.strDescriptionEN}}
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