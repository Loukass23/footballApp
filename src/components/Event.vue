<template>

    <v-layout column justify-center align-content-center>


        <div v-for="(item, idx ) in events" class="subheading mb-2" :key="idx">
            <div v-if="idx < number">
                <v-flex xs12>
                    <v-card>
                        <v-img v-if="item.strThumb" :src="item.strThumb" height="220">
                            <v-container fill-height fluid pa-2>
                                <v-layout column fill-height>
                                    <v-flex xs12 align-self-center>
                                        <span v-if="color == 'primary'" class=" primary headline white--text text-xs-center" v-text="item.strEvent"></span>
                                        <span v-else class=" secondary headline white--text text-xs-center" v-text="item.strEvent"></span>

                                    </v-flex>

                                    <v-flex xs12 align-self-center class=" headline white--text text-xs-center"
                                        align-content-end v-if="next == 'pastleague'|| next =='last'">
                                        <v-card-title v-if="color == 'primary'" class="primary">{{item.intHomeScore}} - {{item.intAwayScore}}</v-card-title>
                                        <v-card-title v-else class="secondary">{{item.intHomeScore}} - {{item.intAwayScore}}</v-card-title>

                                    </v-flex>
                                    <v-flex xs12 align-self-center class="secondary  white--text text-xs-center"
                                        align-content-end v-else>
                                        <v-card-title>{{item.strDate}} - {{item.strTime}}</v-card-title>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-img>

                        <div v-else>

                            <v-layout xs12 column fill-height align-center justify-center>
                                <v-card :color="color" width="100%" height="220">
                                    <v-card-text class=" headline black--text text-xs-center" v-text="item.strEvent"></v-card-text>

                                    <v-flex xs12 align-self-center class="headline black--text text-xs-center"
                                        align-content-end v-if="next == 'pastleague' || next=='last'">
                                        <v-layout my-0 row wrap>
                                            <v-flex xs12>
                                        <v-card-text class=" headline black--text text-xs-center">{{item.intHomeScore}}
                                            - {{item.intAwayScore}}</v-card-text>
                                            </v-flex>
                                            
                                                <!-- <v-flex xs6>
                                            <v-card-text style="font-size:small line-height: 2px" class=" black--text text-xs-center">{{item.strHomeGoalDetails}}
                                           </v-card-text></v-flex>
                                            <v-flex xs6>
                                                <v-card-text class="  black--text text-xs-center">{{item.strAwayGoalDetails}}</v-card-text></v-flex>
                                         -->
                                        </v-layout>
                                    </v-flex>
                                    <v-layout column xs10  class="black--text text-xs-center" align-center justify-center
                                        v-else>
                                        <v-flex align-self-center>
                                        <v-card-title class=" headline black--text text-xs-center">Date:
                                            {{item.strDate}} at {{item.strTime}}</v-card-title>
                                        </v-flex>
                                        <v-flex>
                                        <v-btn :color="color" dark @click="dialog = true" large icon>
                                            <v-icon>map</v-icon>
                                        </v-btn>
                                        </v-flex>
                                    </v-layout>
                                </v-card>
                                
                            </v-layout>
                        </div>
                    </v-card>


                </v-flex>
                <v-dialog v-model="dialog" max-width="290">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4856.819352453805!2d13.32876897078897!3d52.50792467230733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a84fbd52021f6b%3A0x99e9b329f2a01778!2sUbiqum+Code+Academy+Berlin!5e0!3m2!1sfr!2sde!4v1546606531045"
                        width="300" height="250" frameborder="0" style="border:0" allowfullscreen></iframe>

                </v-dialog>
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
            id: null,
            number: null,
            dialog: false,
            next: null,
            color: null
        },
        methods: {
            getEvents(leagueId, param) {
                axios
                    .get(
                        "https://www.thesportsdb.com/api/v1/json/1/events" + param + ".php?id=" +
                        leagueId
                    )
                    .then(response => {
                        if (param == 'last') this.events = response.data.results;
                        else this.events = response.data.events;


                    })
                    .catch(() => {
                        this.teams = [];
                    });
            }
        },
        created() {
            this.getEvents(this.id, this.next)
            if(this.next == 'nextleague'|| this.next =='pastleague') this.color = 'primary'
            else this.color = 'secondary'
            console.log(this.color)

        }
    }
</script>

<style scoped>

</style>