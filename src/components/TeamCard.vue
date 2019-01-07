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
                    <div v-for="(item, idx) in userTeams" class="subheading mb-2" :key="idx">
                        <div v-if="item == team.strTeam">
                            <v-btn icon>
                                <v-icon color="red">favorite</v-icon>
                            </v-btn>
                        </div>
                     
                </div>

                </div> 
                 <v-btn @click="addTeam(team.strTeam)" icon>
                        <v-icon>add</v-icon>
                    </v-btn>
                
 
<!-- <div v-if="isAuthenticated">
                <div v-if="isFavorite(team.strTeam)">
                    <v-btn @click="addTeam(team.strTeam)" icon>
                        <v-icon color="red">favorite</v-icon>
                    </v-btn>
                </div>
                <div v-else>
                    <v-btn @click="addTeam(team.strTeam)" icon>
                        <v-icon>favorite</v-icon>
                    </v-btn>
                </div>


                <v-spacer></v-spacer>
                <v-btn icon>
                    <v-icon>map</v-icon>
                </v-btn> 
 </div>
                        <div v-else>
                    <v-btn @click="addTeam(team.strTeam)" icon>
                        <v-icon>favorite</v-icon>
                    </v-btn>
                </div>
 -->


                <!-- <div v-else> 
                     <v-btn @click="addTeam(team.strTeam)" icon>
                    <v-icon>map</v-icon>
                    </v-btn>
                </div>     -->

                <v-btn icon>
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
            team: null,
            favTeam: null
        },
        methods: {
            addTeam(teamName) {
                if (this.isAuthenticated) {
                    // console.log(item);
                    this.$store.dispatch('addFavTeam', teamName);
                    this.getTeams();
                } else {
                    this.$router.push('/sign-in');
                }
            },
            getTeams() {
                this.$store.dispatch('getFavTeam');
                
            },
            isFavorite(teamCards){
                this.userTeams.array.forEach(element => { if(element == teamCards){
                      console.log(element)
                      console.log(teamCards)
                    return true
                }
                else{
                    return false
                }
                    
                });
              
                
                
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