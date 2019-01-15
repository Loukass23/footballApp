<template>
    <div>
        <team-selector></team-selector>
        

        <v-container justify-center align-content-center my-1 mx-auto pa-0>
            <v-parallax pt-0 my-0 dark height="200" src="https://res.cloudinary.com/ds3w3iwbk/image/upload/v1547570066/paralax3.png">
            <v-layout align-center column justify-center>

                <h1 class="display-2 font-weight-bold black--text">Football App</h1>
                <h4 class="subheading black--text">All you need about football!</h4>
            </v-layout>
        </v-parallax>
            <v-layout v-if="!isAuthenticated" align-content-center justify-center align-center>
                <v-flex align-self-center xs12>
                    <v-alert v-model="info"  type="info" icon="account_circle">

                        <v-btn small flat to="/sign-in">
                            Log in get personalized feed</v-btn>

                    </v-alert>
                </v-flex>
            </v-layout>
            <v-layout column my-2 v-if="isAuthenticated">
                
                <v-card elevation="6" color="secondary" xs12>
                    <v-card-title>Hi {{getUser.displayName}}, it is nice to see you again 
                    </v-card-title>
                </v-card>
            </v-layout>
 <v-layout column my-2 v-if="getLeague && selectedTeam">
                
                <v-card  elevation="6" color="grey lighten-4" xs12>
                    <v-card-text class="justify-center">Great choice! Now what would you wanna know about that?
                    </v-card-text>
                    <v-card-actions >
                        <v-layout mx-auto  justify-center align-center >
                            <v-flex class="justify-center" xs3 align-self-center>
                                
                                   
                                <v-btn color="primary" @click="$router.push('players')" outline>
                                Players</v-btn>
                               
                            </v-flex>
                            <v-flex  xs3 align-self-center>
                                
                                <v-btn color="primary" @click="$router.push('events')" outline>
                                events</v-btn>
                                
                            </v-flex>
                            <v-flex  xs3 align-self-center>
                                
                                <v-btn color="primary" @click="$router.push('players')" outline>
                                Players</v-btn>
                                
                            </v-flex>
                        </v-layout>
        
                    </v-card-actions>
                </v-card>
            </v-layout>
            
            <v-layout column my-3 v-if="isAuthenticated">
                <v-card elevation="6" color="#79bad0" my-4 xs12>
                    <f-team></f-team>
                </v-card>
            </v-layout>

            <v-layout my-3 column xs12 align-content-center justify-center v-if="getLeague">
                <v-card elevation="6" height='300' color="primary">
                     <v-layout row justify-center align-center>
                         <v-flex xs2>
                         <v-icon>date_range
                         </v-icon>
                    </v-flex>
                    <v-flex align-self-center xs6>
                        <v-card-title class="font-weight-bold primary text-xs-center">Last game {{getLeague.leagueName}}</v-card-title>
                       </v-flex>
                    <v-flex xs2>
                         <v-btn @click="$router.push('events')" small align-self-center flat>
                        more 
                    </v-btn>
                    </v-flex>
                    </v-layout>
                    <event :league='getLeague' :number=1 :next='false'></event>

                </v-card>
            </v-layout>
            <v-layout column my-2 v-else>
                <v-card elevation="6" color="green600 lighten-2" >
                    <v-layout  align-content-center justify-center>
                    <v-flex xs6>
                    <v-card-title>For more content 
                    </v-card-title>
                    </v-flex>
                     <v-flex align-self-center xs4>
                     <v-btn small outline color="primary" @click="$router.push('teams')">
                   Select League </v-btn>
                     </v-flex>
                    </v-layout>
                </v-card>
            </v-layout>
            <v-layout wrap my-2 column xs12 align-content-center justify-center v-if="getLeague">
                <v-card elevation="6" height='300' color="primary">
                    <v-layout row justify-center align-center>
                         <v-flex xs2>
                         <v-icon>date_range
                         </v-icon>
                         </v-flex>
                    <v-flex align-self-center xs6>
                    <v-card-title class="font-weight-bold text-xs-center">Next game {{getLeague.leagueName}}</v-card-title>
                    </v-flex>
                    <v-flex xs2>
                    <v-btn @click="$router.push('events')" small align-self-center flat>
                        more 
                    </v-btn>
                    </v-flex>
                    </v-layout>
                    <event :league='getLeague' :number=1 :next='true'></event>

                </v-card>
            </v-layout>
<v-layout  row my-2 align-content-center justify-center >
                <v-flex  xs12 align-self-center>
                <v-card elevation="6" color="secondary" >
                    <v-card-text>
                          <p class="text-xs-center">Come and join the chat</p>
                    </v-card-text>
                </v-card>
                </v-flex>
            </v-layout>

        </v-container>
    </div>
</template>

<script>
    import OddCards from '@/components/OddCards.vue';
    import FTeam from '@/components/FTeam.vue';
    import TeamCard from '@/components/TeamCard.vue';
    import TeamSelector from '@/components/TeamSelector.vue';
    import Event from '@/components/Event.vue';

    export default {
        name: 'Home',
        components: {
            
            FTeam,
            
            TeamSelector,
            Event
        },
        data() {
            return {
                info: true

            };
        },

        computed: {
            getLeague() {

                return this.$store.getters.getLeague;
            },
            isAuthenticated() {
                return this.$store.getters.isAuthenticated;
            },
            getUser() {
                return this.$store.getters.getUser;
            },
             selectedTeam() {
        return this.$store.getters.selTeam;
      }
        }
    };
</script>


<style scoped>
.v-card__actions { display: inline; }
</style>