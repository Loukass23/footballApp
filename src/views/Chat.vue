<template>
     <div>
      <input type="text" v-model="msg">
      <button v-on:click="writeNewPost()">Send</button>

      <hr>

      <div v-for="(msg, index) in posts" :key="index">
        <p>{{msg.name}}</p>
        <p>{{msg.date}}</p>
        <p>{{msg.body}}</p>
      </div>
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
     
    },
    getPosts() {
      // Access "posts" collection
      firebase
        .database()
        .ref("posts")
        .once("value", data => {
          console.log(data.val());
          this.messages = data.val();
        });
    },
     retrievePost() {
            this.$store.dispatch('getPosts');
        }
  },
  computed: {
       posts() {
                return this.$store.getters.getPosts;
            }
  },
 
    created(){
        this.retrievePost()
        
    }
    }
    
</script>

<style scoped>

</style>