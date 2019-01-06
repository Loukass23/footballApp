<template>
<v-container>
   <v-timeline dense>
    <v-timeline-item
      v-for="event in events"
      :key="event.id"
      color="primary darken-2"
      large
    >
      
        <v-card-text >
            <h2>{{event.dateEvent}}  </h2>  
        </v-card-text>
      <v-card class="elevation-2" color="primary lighten-1">
          <v-flex>
        <v-card-title class="headline">{{event.strHomeTeam}} - {{event.strAwayTeam}}</v-card-title>
        <!-- <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4856.819352453805!2d13.32876897078897!3d52.50792467230733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a84fbd52021f6b%3A0x99e9b329f2a01778!2sUbiqum+Code+Academy+Berlin!5e0!3m2!1sfr!2sde!4v1546606531045" width="300" height="250" frameborder="0" style="border:0" allowfullscreen></iframe> -->
          </v-flex>
      </v-card>
    </v-timeline-item>
  </v-timeline>
     
     <!-- <v-card>
      <v-container  fluid grid-list-lg>
        <template v-for="event  in events">
          <v-layout
            row align-center :key="event.id"  >
          
           
            <v-flex xs4>
              <v-card color="grey darken-2" class="white--text">
                <v-card-title primary-title>
                  <div>
                    <div class="headline">{{event.strEvent}}</div>
                    <span>team</span>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat dark>more</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
            <v-flex xs4>
              <v-card color="grey darken-5" class="black--text">
                <v-card-title primary-title>
                  <div>
                    <div class="headline">VS</div>
                    <span>{{event.dateEvent}}</span>
                  </div>
                </v-card-title>
               
              </v-card>
            </v-flex>
            <v-flex xs4>
              <v-card color="blue-grey darken-3" class="white--text">
                <v-card-title primary-title>
                  <div>
                    <div class="headline">{{event.dateEvent}}</div>
                    <span>team</span>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat dark>more</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
            
          </v-layout>
          </template>
      </v-container>
     </v-card> -->
 </v-container>

</template>

<script>
import axios from "axios";
export default {
  name: "Schedule",
  data() {
    return {
      events: [],
      ligueDE: "4331"
    };
  },
  methods: {
    getGames() {
      axios
        .get(
          "https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id=4328",
          {
            params: {}
          }
        )
        .then(response => {
          response = response.data;
          this.events = response.events;
          console.log(this.events);
        })
        .catch(() => {
          this.events = [];
        });
    }
  },
  created() {
    this.getGames();
  }
};
</script>

<style scoped>
</style>
