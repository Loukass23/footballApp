
<template>
    <v-container >
        <v-layout column>
            <h1 class="title my-3">Favorite Teams</h1>
            <div v-for="(item, idx) in userTeams" class="subheading mb-2" :key="idx">
                {{item}}
            </div>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'FTeam',
    computed: {
        userTeams() {
            return this.$store.state.favTeam;
        }
    },
    mounted() {
        this.getTeams();
    },
    methods: {
        getTeams() {
            this.$store.dispatch('getFavTeam');
        }
    }
};
</script>

<style scoped>
</style>
