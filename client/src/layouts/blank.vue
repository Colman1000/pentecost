<template>
  <div>
    <v-progress-linear
      v-if="_loading"
      height="6"
      indeterminate
      color="primary"
      background-color="secondary"
    ></v-progress-linear>
    <v-container justify-center align-center class="pa-0">
      <v-alert class="text-center" v-model="oops" type="error">{{ message }}!</v-alert>
      <router-view></router-view>
      <Footer></Footer>
    </v-container>
  </div>
</template>

<script>
import Footer from "@/components/Footer";
export default {
  components: {
    Footer
  },

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
