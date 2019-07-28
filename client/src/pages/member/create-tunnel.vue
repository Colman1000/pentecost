
<template>
  <div>
    <v-container>
      <v-layout justify-center align-center column>
        <v-form v-if="_.isEmpty(tunnel)" v-model="valid">
          <h3 class="mb-4">Do something</h3>
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
            hint="At least 8 characters"
            min="8"
            v-model="password"
            :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
            :append-icon-cb="() => (value = !value)"
            :type="value ? 'password' : 'text'"
          ></v-text-field>

          <v-select v-model="lang" outlined label="Prefered Language" :items="languages"></v-select>
          <v-btn @click="submit" rounded color="primary" block :disabled="!valid">submit</v-btn>
        </v-form>
        <div v-else>
          <v-card outlined>
            <v-card-title>Tunnel Name: {{ tunnel.tunnel }}</v-card-title>
            <v-card-text>
              Username: {{ tunnel.username }}
              <br />
            </v-card-text>
          </v-card>
        </div>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { languages } from "@/assets/speech";
export default {
  data: () => ({
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
    submit() {
      if (this.valid) {
        this.$io.post(
          "/tunnel/create-tunnel",
          {
            username: this.username,
            password: this.password,
            lang: this.lang
          },
          tunnel => {
            console.log(tunnel);
            this.$store.commit("SET_USER", tunnel);
            this.tunnel = tunnel;
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
