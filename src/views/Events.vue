<template>
  <div>
    <team-selector></team-selector>
    <v-layout row>
      <v-flex justify-center align-center xs6>
        <v-card color="primary lighten-2">
          <v-card-title>League</v-card-title>
          <v-switch color="secondary" v-model="type" label="Next events" value="nextleague"></v-switch>
          <v-switch color="secondary" v-model="type" label="Last events" value="pastleague"></v-switch>
        </v-card>
      </v-flex>
      <v-flex justify-center align-center xs6>
        <v-card color="secondary lighten-2">
          <v-card-title>Team</v-card-title>

          <v-switch color="primary" v-model="type" label="Next events" value="next"></v-switch>
          <v-switch color="primary" v-model="type" label="Last events" value="last"></v-switch>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout column xs12 align-content-center justify-center v-if="getLeague">
      <v-card color="primary lighten-4">
        <div v-if="type == 'nextleague' || type == 'pastleague' ">
          <event :id="getLeague.leagueId" :number="14" :next="type"></event>
        </div>
        <div v-else-if="type == 'next' || type == 'last' ">
          <event :id="selectedTeam.teamID" :number="4" :next="type"></event>
        </div>
        <div v-else>Make a choice</div>
      </v-card>
    </v-layout>
  </div>
</template>

<script>
import TeamSelector from "@/components/TeamSelector.vue";
import Event from "@/components/Event.vue";
export default {
  name: "Events",
  data() {
    return {
      type: null
    };
  },
  components: {
    TeamSelector,
    Event
  },
  computed: {
    getLeague() {
      return this.$store.getters.getLeague;
    },
    selectedTeam() {
      return this.$store.getters.selTeam;
    }
  },
  created() {
    if (localStorage.getItem("type") != null)
      this.type = localStorage.getItem("type");
  }
};
</script>

<style scoped>
</style>