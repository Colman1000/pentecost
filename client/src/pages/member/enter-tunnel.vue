<template>
  <div>
    <v-container>
      <v-layout justify-center align-center column>
        <h3>Enter Tunnel ID:</h3>
        <br />
        <v-form v-model="valid">
          <v-text-field :rules="idRules" v-model="id" outlined label="Enter tunnel name"></v-text-field>
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
      idRules: [
        v => !!v || "ID is required",
        v => v.length <= 4 || "ID must be less than 4 characters"
      ]
    };
  },
  mounted() {},
  methods: {
    enterTunnel() {
      this.loading = true;
      this.$io.post(
        "/tunnel/enter-tunnel",
        {
          tunnel: this.id,
          user: this.user.id
        },
        (data, e) => {
          if (e.statusCode) {
            this.snackbar = true;
            this.loading = false;
            this.message = "Tunnel not found";
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
