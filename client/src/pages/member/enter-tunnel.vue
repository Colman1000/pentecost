<template>
  <div>
    <h3>Enter Tunnel ID:</h3>
    <br />
    <v-form v-model="valid">
      <v-text-field :rules="idRules" v-model="id" outlined label="Enter tunnel id"></v-text-field>
      <v-btn @click="enterTunnel" :disabled="!valid" rounded block color="primary">Enter</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      id: "",
      idRules: [
        v => !!v || "ID is required",
        v => v.length <= 4 || "ID must be less than 4 characters"
      ]
    };
  },
  methods: {
    enterTunnel() {
      this.$io.post(
        "/tunnel/enter-tunnel",
        {
          tunnel: this.id
        },
        data => {
          // data should be the user
          if (data.id) {
            this.$router.push({
              path: `/member/${data.tunnel}`,
              query: { with: data.id }
            });
          }
        }
      );
    }
  }
};
</script>
