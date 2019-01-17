<template>
    <div>
       <v-toolbar>
      <v-btn icon light>
        <v-icon large >account_circle</v-icon>
      </v-btn>


      <v-spacer></v-spacer>

      <v-toolbar-title>Sign in</v-toolbar-title>
     
    </v-toolbar>

      <v-container grid-list-xl>
      <v-layout align-content-center justify-center>
     <v-flex align-self-center xs12 >   
    <v-alert 
      v-model="info"
      dismissible
      type="info"
      icon="add_circle"
    >
    <v-btn small flat  to="/join">
     <h5>Not a user? Create an account</h5></v-btn>
     
      </v-alert>
    </v-flex>
    </v-layout>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6>
            <v-card >
              <v-toolbar dark color="primary">
                  <v-icon>account_circle</v-icon>
                <v-toolbar-title>Sign In</v-toolbar-title>
              
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field prepend-icon="mail" name="email" label="email" type="email"  v-model="email" :rules="emailRules" required></v-text-field>
                  <v-text-field v-on:keyup.enter="submit" id="password" prepend-icon="lock" name="password" label="Password" type="password" required v-model="password" :rules="passwordRules"></v-text-field>
                 <input v-if="feedback" v-model="feedback" type="text" color="red" size="100">
                </v-form>
              </v-card-text>
              <v-card-actions>
                 
                <v-spacer></v-spacer>
                <v-btn color="primary" :disabled="!valid" @click="submit">Sign In</v-btn>
                
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
        
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6 >
            <v-card >
              <v-toolbar dark color="primary">
                  <v-icon>fa-google</v-icon>
                <v-toolbar-title>Google account</v-toolbar-title>
              
              </v-toolbar>
              <v-card-text>
                <v-btn color="primary" @click="signInWithGoogle">Sign in</v-btn>
              </v-card-text>
              <v-card-actions>
                 
                <v-spacer></v-spacer>
               
               
                
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
   
    </div>
</template>

<script>

export default {
  data() {
    return {
       info: true,
      valid: false,
      email: "",
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
              
                this.$store.dispatch('userLogin', {
                    email: this.email,
                    password: this.password
                });
            }

  },
  signInWithGoogle(){
this.$store.dispatch('signInWithGoogle')
}
}
};

</script>

<style scoped>
</style>
