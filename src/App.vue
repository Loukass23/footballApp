<template>
    <v-app style="
    background: #3A1C71;
    background: -webkit-linear-gradient(to right, #E8EAF6,#C5CAE9, #E0E0E0);
    background: linear-gradient(to right, #E8EAF6,#C5CAE9,#E0E0E0);
  ">
      
        <app-nav></app-nav>

        <v-content transition="slide-x-transition">
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>
import AppNav from '@/components/AppNav';

export default {
    name: 'App',
    components: {
        AppNav
    },
    created(){
if(localStorage.getItem('useruid') != null)
{
    let userObj = {uid: localStorage.getItem('useruid'),
                        displayName: localStorage.getItem('userName'),
                        photoURL: localStorage.getItem('avatar')}
         this.$store.dispatch('addUserCookies', userObj);
}
if(localStorage.getItem('favLeagueName') != null)
{

    let userObj = {league: localStorage.getItem('favLeagueName'),
                        leagueId: localStorage.getItem('favLeagueID'),
                        leagueName: localStorage.getItem('favLeagueNamestr'),
                        leagueImg: localStorage.getItem('favLeagueBadge')}
                        console.log(userObj)
         this.$store.dispatch('addLeague', userObj);
}
if(localStorage.getItem('favTeamName') != null)
{

    let userObj = {team: localStorage.getItem('favTeamName'),
                        badge: localStorage.getItem('favTeamBadge'),
                         teamID: localStorage.getItem('favTeamID')
                        }
                        console.log(userObj)
         this.$store.dispatch('addTeam', userObj);
}
        
    }
};
</script>

<style>

</style>
