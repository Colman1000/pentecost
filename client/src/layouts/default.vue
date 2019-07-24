<template>
  <div>
    <v-system-bar height="50" color="primary">
      <v-spacer></v-spacer>

      <v-icon @click="togglePower" v-if="!isActivated" color="white" size="30">mdi-power</v-icon>
      <v-icon @click="togglePower" v-else color="white" size="30">mdi-power-off</v-icon>&nbsp;
      <v-icon v-if="connected" color="white" size="30">mdi-wifi-strength-2</v-icon>&nbsp;
      <v-icon v-if="waiting" color="white" size="30">mdi-bell-sleep</v-icon>&nbsp;
      <!-- <span>12:30</span> -->
    </v-system-bar>

    <v-content>
      <v-container>
        <v-layout justify-center>
          <router-view></router-view>
        </v-layout>
      </v-container>
    </v-content>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/Footer";
export default {
  components: {
    Footer
  },
  mounted() {},
  data() {
    return {};
  },
  methods: {
    togglePower() {
      this.$store.state.isActivated = !this.$store.state.isActivated;
    }
  },
  computed: {}
};
</script>


