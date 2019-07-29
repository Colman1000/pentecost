
<template>
  <div>
    <v-container>
      <v-layout justify-center align-center column>
        <v-form v-if="user && !user.id" v-model="valid">
          <h3 class="mb-4">Create or login</h3>
          <v-text-field
            outlined
            label="Username"
            v-model="username"
            :rules="usernameRules"
            :counter="10"
            required
          ></v-text-field>

          <v-text-field
            outlined
            name="name"
            label="Enter your password"
            v-model="password"
            :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
            :append-icon-cb="() => (value = !value)"
            :type="value ? 'password' : 'text'"
          ></v-text-field>

          <v-select v-model="lang" outlined label="Prefered Language" :items="languages"></v-select>
          <v-btn @click="submit" rounded color="primary" block :disabled="!valid">submit</v-btn>
        </v-form>

        <!-- V - ELSE  -->
        <div v-else>
          <v-layout column>
            <v-card-title>Tunnel: {{ user.tunnel }}</v-card-title>
            <v-card-text>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title>Username</v-list-item-title>
                  <v-list-item-subtitle>{{ user.username }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-title>Language</v-list-item-title>
                  <v-list-item-subtitle>{{ user.lang }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <br />
            </v-card-text>
            <v-card-actions>
              <v-btn rounded text color="primary" @click="tunnelHandle = true">enter tunnel</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="secondary" @click="logout">logout</v-btn>
            </v-card-actions>
          </v-layout>
        </div>
      </v-layout>

      <v-dialog width="300" v-model="tunnelHandle">
        <v-card>
          <v-toolbar dark color="primary">
            <v-toolbar-title>Enter Tunnel</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <EnterTunnel></EnterTunnel>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-container>
    <v-snackbar color="warning" multi-line left bottom v-model="handle">{{ message }}</v-snackbar>
  </div>
</template>

<script>
import EnterTunnel from "./enter-tunnel";
import { languages } from "@/assets/speech";
export default {
  components: {
    EnterTunnel
  },
  data: () => ({
    handle: false,
    tunnelHandle: false,
    message: "",
    languages: languages,
    valid: true,
    username: "",
    lang: "",
    password: "",
    usernameRules: [
      v => !!v || "Username is required",
      v => (v && v.length <= 10) || "Username must be less than 10 characters"
    ],
    value: false,
    tunnel: {}
  }),

  mounted() {
    // check if the user is logged in
    this.tunnel = this.user;
  },
  methods: {
    logout() {
      this.$store.commit("CLEAR_USER");
      this.$router.push("/member");
    },
    submit() {
      if (this.valid) {
        this.$io.post(
          "/tunnel/create-tunnel",
          {
            username: this.username,
            password: this.password,
            lang: this.lang
          },
          (user, jwr) => {
            console.log(jwr);
            if (jwr.statusCode == 401) {
              this.handle = true;
              this.message =
                "The provided username and password combination does not match any user in the database";
            }
            this.$store.commit("SET_USER", user);
            this.tunnel = user;
          }
        );
      }
    },
    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>
