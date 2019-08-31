<template>
  <div>
    <v-container fill-height grid-list-md>
      <v-layout justify-center align-center>
        <v-btn to="/tongues" rounded color="secondary">goto tongues</v-btn>&nbsp;
        <v-btn to="/scribe" rounded color="primary">goto scribe</v-btn>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$router.push("/tongues");
    // // Checks if user is `brand new` :)
    // var isFirstTimer = localStorage.getItem("isFirstTimer");
    // if (!isFirstTimer) {
    //   this.$router.push("/channels");
    // }
  }
};
</script>
