<template>
    <div>
        <v-toolbar>
            <v-layout  align-content-center justify-center>
                <v-layout justify-space-between v-if="getLeague">
                   
        <v-btn icon>
                <v-icon @click="clearLeague()" small>edit</v-icon>
                </v-btn>
        <v-avatar @click="clearLeague()" color="grey lighten-4">
            <img v-bind:src=getLeague.leagueImg alt="avatar">            
          </v-avatar>
          <v-spacer></v-spacer>
           <v-flex hidden-xs-only align-self-center>
                    <h3>{{getLeague.leagueName}}</h3></v-flex>
                </v-layout>
                <v-flex v-else align-self-center>
                    <v-btn  outline color="primary"  @click="clearLeague()">
                   1. Select League </v-btn>
            <!-- <v-btn icon>
                <v-icon @click="clearLeague()" >add</v-icon>
                </v-btn>
                <v-toolbar-title>Select League</v-toolbar-title>-->
                </v-flex> 
                  <v-layout justify-space-between v-if="selectedTeam">
                      <v-btn icon>
                <v-icon @click="clearTeam()" small >edit</v-icon>
                </v-btn>
          <v-avatar @click="clearTeam()" color="grey lighten-4">
            <img v-bind:src=selectedTeam.badge alt="avatar">
          </v-avatar>
          <v-spacer></v-spacer>
           <v-flex hidden-xs-only align-self-center>
                    <h3>{{selectedTeam.team}}</h3></v-flex>
             </v-layout>
                 <v-flex v-else align-self-center>
                    <v-btn  outline color="primary" @click="clearTeam()">
                    2. Select Team </v-btn>
            <!-- <v-btn icon>
                <v-icon @click="clearTeam()" >add</v-icon>
                </v-btn> 
                <v-toolbar-title>Select Team</v-toolbar-title>-->
                 </v-flex>
            </v-layout>
            
        </v-toolbar>
    <!-- <v-stepper vertical>
      <v-stepper-header>
        <v-stepper-step v-if="getLeague" complete editable step="1" @click="clearLeague()">
          <v-avatar @click="clearLeague()" color="grey lighten-4">
            <img v-bind:src=getLeague.leagueImg alt="avatar">
            
          </v-avatar>
        </v-stepper-step>
        <v-stepper-step v-else step="1">
          League</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step v-if="selectedTeam" complete editable step="2" @click="clearTeam()">
          <v-avatar @click="clearTeam()" color="grey lighten-4">
            <img v-bind:src=selectedTeam.badge alt="avatar">
          </v-avatar>
        </v-stepper-step>
        <v-stepper-step v-else step="2">Team</v-stepper-step>

      </v-stepper-header>
    </v-stepper> -->

    </div>
</template>

<script>
    export default {
        name: 'TeamSelector',
        props: {selectLeague: null,
        selectTeam: null

        } ,
        methods: {
            clearLeague() {
        this.clearTeam()
        this.$store.dispatch('addLeague', null)
        this.selectedLeague = null
         this.$router.push('/teams');
      },
      clearTeam() {
        this.$store.dispatch('addTeam', null)
        this.selectedTeam = null
        this.players= null
        this.$router.push('/teams');

      }
        },
        computed: {
        getLeague() {

        return this.$store.getters.getLeague;
      },
      selectedTeam() {
        return this.$store.getters.selTeam;
      }
        }

        
    }
</script>

<style scoped>

</style>