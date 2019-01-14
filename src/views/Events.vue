<template>

    <div>
        
        <team-selector></team-selector>
         <v-layout row ml-2 >
          <v-flex xs6 >
        <v-switch
      label="Next games"
      v-model="nextEvents"
      color="primary"
    ></v-switch>
          </v-flex>
           <v-flex xs6 >
     <v-switch
      label="Passed games"
      v-model="passedEvents"
      color="primary"
    ></v-switch>
          </v-flex>
         </v-layout>
<v-layout column xs12 align-content-center justify-center v-if="getLeague">
   <v-card color="primary lighten-4">
     <v-card-title class="font-weight-bold ">Passed games {{getLeague.leagueName}}</v-card-title>
      <event v-if="passedEvents" :league='getLeague' :number=14 :next='false'></event>

      <v-card-title class="font-weight-bold ">Next games {{getLeague.leagueName}}</v-card-title>
      <event v-if="nextEvents" :league='getLeague' :number=14 :next='true'></event>
      
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
                nextEvents: false,
                passedEvents: false
            }
        },
        components: {TeamSelector,Event
        },
        computed: {
        getLeague() {

        return this.$store.getters.getLeague;
      }
        }
        
    }
</script>

<style scoped>

</style>