<template>
  <div>
    <v-progress-linear
      v-if="_loading"
      height="6"
      indeterminate
      color="primary"
      background-color="secondary"
    ></v-progress-linear>
    <v-toolbar color="primary" class="mb-5" dark>
      <v-toolbar-title>Pentecost</v-toolbar-title>
    </v-toolbar>
    <v-container justify-center align-center class="pa-0">
      <v-alert class="text-center" v-model="oops" type="error">{{ message }}!</v-alert>
      <router-view></router-view>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      oops: false,
      message: ""
    };
  },
  mounted() {
    this.$io.on("connect", done => {
      this.oops = false;
    });
    this.$io.on("disconnect", oops => {
      this.oops = true;
      this.message =
        "Pentecost has been disconnected from the server that serves it";
    });
  }
};
</script>
