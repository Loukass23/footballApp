<template>
     <v-card>
      <v-container  fluid grid-list-lg>
        <template v-for="game  in games">
          <v-layout
            row align-center :key="game.id"  >
          
           
            <v-flex xs4>
              <v-card color="grey darken-2" class="white--text">
                <v-card-title primary-title>
                  <div>
                    <div class="headline">{{game.teams[0]}}</div>
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
                    <span>{{game.sites[0].odds.h2h}}</span>
                  </div>
                </v-card-title>
               
              </v-card>
            </v-flex>
            <v-flex xs4>
              <v-card color="blue-grey darken-3" class="white--text">
                <v-card-title primary-title>
                  <div>
                    <div class="headline">{{game.teams[1]}}</div>
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
     </v-card>
 

</template>

<script>
import axios from "axios";
export default {
  name: "OddCards",
  props: {
    games: null
  },
  methods: {
    getGames() {
      axios
        .get("https://api.the-odds-api.com/v3/odds?", {
          params: {
            sport: "soccer_france_ligue_one",
            region: "uk",
            apiKey: "6325fe81642c5a7ef454953f76c19cca"
          }
        })
        .then(response => {
          response = response.data;
          this.games = response.data;
          this.gameoftheMonth = response.data;
          console.log(this.gameoftheMonth);
        })
        .catch(() => {
          this.games = [];
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
