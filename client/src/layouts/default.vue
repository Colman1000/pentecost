<template>
  <div>
    <v-app app>
      <v-system-bar height="10" color="primary"></v-system-bar>

      <v-content>
        <v-container>
          <v-layout justify-center class="ma-5">
            <router-view></router-view>
          </v-layout>
        </v-container>
      </v-content>
      <Footer></Footer>
    </v-app>
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


