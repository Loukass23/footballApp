
<template>

    <v-container >
    {{userTeams}}
        <v-layout column>
            <h1 class="title my-3">Favorite Teams</h1>
           
                 <v-list three-line>
            <div v-for="(item, idx) in userTeams" :key="idx">  
              <v-divider></v-divider>
  
              <v-list-tile      
                :key="idx">
                 {{item}}
              </v-list-tile>
            </div>
          </v-list>

        </v-layout>

        
    </v-container>




</template>

<script>
export default {
    name: 'FavTeams',
    team: [],
    methods: {
        fetchTeam(team) {
      axios
        .get(
          "https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=" +
            team
        )
        .then(response => {

          response = response.data;
          this.team = response;
         console.log(response)
        })
        .catch(() => {
          this.teams = [];
        });
    },
     getTeams() {
            this.$store.dispatch('getFavTeam');
        }
    },
    computed: {
        userTeams() {
            return this.$store.state.favTeam;
        }
    },
    mounted() {
       this.getTeams()
        
    },
   
};
</script>

<style scoped>
</style>
