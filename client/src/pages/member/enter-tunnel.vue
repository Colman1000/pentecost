<template>
  <div>
    <v-container>
      <v-layout justify-center align-center column>
        <h3>Enter Tunnel ID:</h3>
        <br />
        <v-form v-model="valid">
          <v-text-field :rules="idRules" v-model="id" outlined label="Enter tunnel name"></v-text-field>
          <v-text-field :rules="usernameRules" v-model="username" outlined label="Username"></v-text-field>
          <v-text-field :rules="passwordRules" v-model="password" outlined label="Password"></v-text-field>
          <v-btn
            :loading="loading"
            @click="enterTunnel"
            :disabled="!valid"
            rounded
            block
            color="primary"
          >Enter</v-btn>
        </v-form>
        <v-snackbar
          class="text-center"
          bottom
          left
          multi-line
          v-model="snackbar"
          color="warning"
        >{{ message }}</v-snackbar>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      message: "",
      snackbar: false,
      loading: false,
      id: "",
      password: "",
      username: "",
      passwordRules: [v => !!v || "Password is required"],
      idRules: [
        v => !!v || "ID is required",
        v => v.length <= 4 || "ID must be less than 4 characters"
      ],
      usernameRules: [
        v => !!v || "Username is required"
        // v => v.length <= 4 || "username must be less than 4 characters"
      ]
    };
  },
  mounted() {
    // loadup the users details
    this.username = this.user.username;
    this.id = this.user.tunnel;
  },
  methods: {
    enterTunnel() {
      this.loading = true;
      this.$io.post(
        "/tunnel/enter-tunnel",
        {
          tunnel: this.id,
          password: this.password,
          username: this.username
        },
        (data, e) => {
          if (e.statusCode) {
            this.snackbar = true;
            this.loading = false;
            this.message =
              "Inconsistency Violation: cross-check your details and try again";
          }
          // data should be the user
          if (data.id) {
            this.$store.commit("SET_USER", data);
            this.$router.push({
              path: `/member/${data.id}`,
              query: { with: data.tunnelIn.id }
            });
          }
        }
      );
    }
  }
};
</script>
