<template>
    <div>
         <v-toolbar>
      
        <v-icon light large >chat_bubble</v-icon>
      


      <v-spacer></v-spacer>

      <v-toolbar-title>Chat</v-toolbar-title>
     
    </v-toolbar>
    <v-container text-xs-center>
        <v-layout >
            
            <v-flex xs10 >
        <v-text-field v-on:keyup.enter="writeNewPost()" type="text" v-model="msg">Type your message</v-text-field>
            </v-flex>
            <v-flex xs2>
        <v-btn fab  v-on:click="writeNewPost()">Send</v-btn>
            </v-flex>
            
        </v-layout>

        
            
            <v-timeline dense>
                <div v-for="(msg, index) in posts" :key="index" >

                <v-timeline-item small fill-dot v-if="msg.name == getUser.displayName" color="primary darken-2">

                    <v-card-text >
                        {{msg.date}}

                    </v-card-text>
                    <v-flex>

                        <v-card class="elevation-2" color="primary lighten-1">
                            <h4>{{msg.name}} </h4>
                            <v-card-title>{{msg.body}}</v-card-title>


                        </v-card>
                    </v-flex>
                </v-timeline-item>
              
                <v-timeline-item  small fill-dot v-else color="secondary ">

                    <v-card-text >
                        {{msg.date}}

                    </v-card-text>
                    <v-flex>

                        <v-card class="elevation-2" color="secondary ">
                           <h4>{{msg.name}} </h4>
                            <v-card-title>{{msg.body}}</v-card-title>


                        </v-card>
                    </v-flex>
                </v-timeline-item>
                </div>

            </v-timeline>
        </v-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                msg: "",
                userEmail: null,
                messages: []
            };

        },
        methods: {
            writeNewPost() {

                this.$store.dispatch('addChat', this.msg)
                this.$store.dispatch('getPosts');
                this.msg = '';

            },
            getPost() {
                this.$store.dispatch('getPosts');
            },
            reverseObject(object) {
        var newObject = {};
        var keys = [];
        for (var key in object) {
            keys.push(key);
        }
        for (var i = keys.length - 1; i >= 0; i--) {

          var value = object[keys[i]];
          newObject[keys[i]]= value;
        }       

        return newObject;
      }
        },
        computed: {
            posts() {
                return this.reverseObject(this.$store.getters.getPosts);
            },
             getUser() {
            return this.$store.getters.getUser;
        }
        },

        created() {
            this.getPost()

        }
    }
</script>

<style scoped>

</style>