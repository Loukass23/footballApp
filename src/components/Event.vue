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
                    <h1>{{item.strEvent}}</h1>
                    </div>
                    <v-flex v-if="!next">
<v-card-title>{{item.intHomeScore}} - {{item.intAwayScore}}</v-card-title>
                    </v-flex>
                    <v-flex v-else>
<v-card-title>{{item.strDate}} - {{item.strTime}}</v-card-title>
                    </v-flex>
                
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
            number: null,
            next: null
        },
        methods: {
            getEvents(leagueId, time) {
                console.log(leagueId)
        axios
          .get(
            "https://www.thesportsdb.com/api/v1/json/1/events"+time+"league.php?id=" +
            leagueId
          )
          .then(response => {
           
            this.events = response.data.events;
             console.log(response.data.events)
          
          })
          .catch(() => {
            this.teams = [];
          });
      }
        },
        created(){
            if(!this.next) this.getEvents(this.league.leagueId, 'past')
            else this.getEvents(this.league.leagueId, 'next')
           
        }
    }
</script>

<style scoped>

</style>