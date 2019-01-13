<template>
    <div>
 <v-content>
      <v-container grid-list-xl>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6>
            <v-card >
              <v-toolbar dark color="primary">
                  <v-icon>mail</v-icon>
                <v-toolbar-title>Create new account with email</v-toolbar-title>
              
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field prepend-icon="person" name="name" label="Username"   v-model="username" required></v-text-field>
                  <v-text-field prepend-icon="mail" name="email" label="Login" type="email"  v-model="email" :rules="emailRules" required></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password" required v-model="password" :rules="passwordRules"></v-text-field>
                 <input v-if="errJoin" v-model="feedback" type="text" color="red" size="100">
                </v-form>
              </v-card-text>
              <v-card-actions>
                 
                <v-spacer></v-spacer>
                <v-btn color="primary" :disabled="!valid" @click="submit">Create</v-btn>
                
                
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6 >
            <v-card >
              <v-toolbar dark color="primary">
                  <v-icon>account_circle</v-icon>
                <v-toolbar-title>Connect with Google account</v-toolbar-title>
              
              </v-toolbar>
              <v-card-text>
                <v-btn color="primary" @click="signInWithGoogle">Sign in with Google</v-btn>
              </v-card-text>
              <v-card-actions>
                 
                <v-spacer></v-spacer>
               
               
                
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    </div>
</template>

<script>

export default {
  data() {
    return {
      valid: false,
      email: "",
      username:"",
      password: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v => v.length >= 6 || "Password must be greater than 6 characters"
      ],
      feedback: null
    };
  },
  methods: {
    
    submit() {
        if (this.$refs.form.validate()) {
            this.$store.dispatch('userJoin', {
                email: this.email,
                password: this.password,
                username: this.username
            });
        }
    }
,
signInWithGoogle(){
this.$store.dispatch('signInWithGoogle')
},
    submitOld() {
      if (this.$refs.form.validate()) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(() => {
            this.$router.push({ name: "Home" });
          })
          .catch(err => {
            this.feedback = err.message;
          });
        this.feedback = "This username is available";
      }
    }
  },
   computed: {
        errJoin() {
            return this.$store.getters.getErrJoin;
        }
   }
};
</script>

<style scoped>
</style>
