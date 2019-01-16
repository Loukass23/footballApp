<template>

    <div>

        <team-selector></team-selector>
         <v-layout row ml-2 >

               <v-switch color="primary" v-model="type" label="Next league events" value="nextleague"></v-switch>
    <v-switch color="primary" v-model="type" label="Last league events" value="pastleague"></v-switch>
     <v-switch color="primary" v-model="type" label="Next Team events" value="next"></v-switch>
    <v-switch color="primary" v-model="type" label="Last Team events" value="last"></v-switch>



         </v-layout>
<v-layout column xs12 align-content-center justify-center v-if="getLeague">
    
         <v-card color="primary lighten-4">
     <!-- <v-card-title class="font-weight-bold ">Passed games {{getLeague.leagueName}}</v-card-title> -->
     <div v-if="type == 'nextleague' || type == 'pastleague' ">
      <event :id='getLeague.leagueId' :number=14 :next="type"></event>
     </div>
     <div v-else-if="type == 'next' || type == 'last' ">
      <event :id='selectedTeam.teamID' :number=4 :next="type"></event>
     </div>
     <div v-else>
         Make a choice
     </div>
      </v-card>
    

    </v-layout>
    </div>
</template>

<script>
import TeamSelector from '@/components/TeamSelector.vue';
import Event from '@/components/Event.vue';
    export default {
        name:'Events',
        data() {
            return {
                type: null
            }
        },
        components: {TeamSelector,Event
        },
        computed: {
        getLeague() {

        return this.$store.getters.getLeague;
      }
    ,
         selectedTeam() {
        return this.$store.getters.selTeam;
      }
        }

    }
</script>

<style scoped>

</style>