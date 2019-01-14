<template>
    <div>
        <team-selector></team-selector>
        <v-parallax my-0 dark height="200" src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
            <v-layout align-center column justify-center>

                <h1 class="display-2 font-weight-bold black--text">Football App</h1>
                <h4 class="subheading black--text">All you need about football!</h4>
            </v-layout>
        </v-parallax>

        <v-container my-1 mx-0 pa-0>
            <v-layout v-if="!isAuthenticated" align-content-center justify-center>
                <v-flex align-self-center xs12>
                    <v-alert v-model="info" dismissible type="info" icon="account_circle">

                        <v-btn small flat to="/sign-in">
                            Log in get personalized feed</v-btn>

                    </v-alert>
                </v-flex>
            </v-layout>

            <v-layout my-2 v-if="isAuthenticated">
                <v-card>
                    <v-card-title>Hi {{getUser.displayName}}, it is nice to see you again, here is what you missed
                    </v-card-title>
                </v-card>
            </v-layout>

            <v-layout  my-3  column xs12 align-content-center justify-center v-if="getLeague">
                <v-card height='300' color="primary lighten-4">
                    <v-card-title class="font-weight-bold text text-xs-center ">Last game {{getLeague.leagueName}}</v-card-title>
                    <event :league='getLeague' :number=1 :next='false'></event>
                </v-card>
            </v-layout>
            <v-layout my-3 column xs12 align-content-center justify-center v-if="getLeague">
                <v-card height='300' color="secondary lighten-4">


                    <v-card-title class="font-weight-bold ">Next game {{getLeague.leagueName}}</v-card-title>

                    <event :league='getLeague' :number=1 :next='true'></event>

                </v-card>
            </v-layout>

            <f-team></f-team>

            <!-- <odd-cards></odd-cards> -->
        </v-container>
    </div>
</template>

<script>
    import OddCards from '@/components/OddCards.vue';
    import FTeam from '@/components/FTeam.vue';
    import TeamCard from '@/components/TeamCard.vue';
    import TeamSelector from '@/components/TeamSelector.vue';
    import Event from '@/components/Event.vue';

    export default {
        name: 'Home',
        components: {
            OddCards,
            FTeam,
            TeamCard,
            TeamSelector,
            Event
        },
        data() {
            return {
                info: true

            };
        },

        computed: {
            getLeague() {

                return this.$store.getters.getLeague;
            },
            isAuthenticated() {
                return this.$store.getters.isAuthenticated;
            },
            getUser() {
                return this.$store.getters.getUser;
            }
        }
    };
</script>