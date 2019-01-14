<template>
   
        <v-layout  column justify-center align-content-center>
           
           
            <div v-for="(item, idx ) in events" class="subheading mb-2" :key="idx">
            <div v-if="idx < number">     
<v-flex xs12 >
                  <v-card>
                <v-img v-if="item.strThumb"
                  :src="item.strThumb"
                  height="200px"
                >
                  <v-container
                  
                    fill-height
                    fluid
                    pa-2
                  >
                    <v-layout fill-height >
                      <v-flex  xs12 align-end flexbox>
                        <span class="headline white--text" v-text="item.strEvent"></span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-img>
                <div v-else>
                    {{item.strEvent}}
                    </div>
<v-card-title>{{item.intHomeScore}} - {{item.intAwayScore}}</v-card-title>
                
              </v-card>
                
                
</v-flex>
            </div>
            </div>           
        </v-layout>
   
</template>

<script>
import axios from "axios";
    export default {
        name: 'Event',
        props: {
            events: [],
            league: null,
            number: null
        },
        methods: {
            getPastEvents(leagueId) {
                console.log(leagueId)
        axios
          .get(
            "https://www.thesportsdb.com/api/v1/json/1/eventspastleague.php?id=" +
            leagueId
          )
          .then(response => {
           
            this.events = response.data.events;
             console.log(response.data.events)
          
          })
          .catch(() => {
            this.teams = [];
          });
      },
        },
        created(){
            this.getPastEvents(this.league.leagueId)
        }
    }
</script>

<style scoped>

</style>