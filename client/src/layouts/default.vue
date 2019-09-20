<template>
  <div>
    <v-progress-linear
      v-if="_loading"
      height="6"
      indeterminate
      color="primary"
      background-color="secondary"
    ></v-progress-linear>
    <v-app-bar class="graient font-weight-black" dark elevation="5">
      <v-toolbar-title class="font" style="user-select: none">Emmanuel TV</v-toolbar-title>
      <div class="flex-grow-1"></div>
    </v-app-bar>
    <v-alert class="text-center" v-model="oops" type="error">{{ message }}!</v-alert>
    <v-container justify-center align-center class="pa-0">
      <router-view></router-view>
    </v-container>
    <Footer></Footer>
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
        "Pentecost has been disconnected from the server... ";
    });
  }
};
</script>

<style>

/* @import url("https://fonts.googleapis.com/css?family=Unica+One&display=swap");
@import url("https://fonts.googleapis.com/css?family=Playball&display=swap");
@import url("https://fonts.googleapis.com/css?family=Modak&display=swap");
@import url("https://fonts.googleapis.com/css?family=Saira+Stencil+One&display=swap"); 
*/

.graient {
  background-image: linear-gradient(
    to right top,
    #1867c0,
    #131388,
    #080838
  ) !important;
  /* background-image: linear-gradient(
    to right,
    rgba(66, 66, 66, 0.77),
    rgba(36, 41, 66, 0.78)
  ) !important; */

  box-shadow: 0 1px 5px rgba(10, 10, 10, 0.07) !important;
  /* background-image: linear-gradient(to right, #000220, #0a3c70, #2f4976, #0e3d6f, #0f4173, #5980bb, #0a3c70) !important; */
}
.font {
  /* font-family: "Modak", cursive; */
  /* font-family: 'Saira Stencil One', cursive; */
  /* font-family: 'Uncle One', cursive; */
  /* font-family: "Playball", cursive; */
}
</style>