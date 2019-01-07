<template>
    <div>
<v-card color="grey lighten-3"  width="150">
        <v-img v-bind:src= team.strTeamBadge  height="150"  
            contains></v-img>

        <v-card-title primary-title>
          <div>
            <h4 >{{team.strTeam}}</h4>
          </div>
        </v-card-title>

        <v-card-actions>
            
              <v-spacer></v-spacer>
              <v-btn icon>
                    <v-icon>map</v-icon>
                  </v-btn>
          <v-btn @click="addTeam(team.strTeam)" icon>
                    <v-icon>favorite</v-icon>
                  </v-btn>
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
    team: []
  },
  methods: {
      addTeam(item) {
        if (this.isAuthenticated) {
          // console.log(item);
            this.$store.dispatch('addFavTeam', item);
        } else {
            this.$router.push('/sign-in');
        }
    }
  },
   computed: {
        isAuthenticated() {
            return this.$store.getters.isAuthenticated;
        }
   }
        
    }
</script>

<style scoped>

</style>