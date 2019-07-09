<template>
  <div>
    <v-container grvalue-list-md>
      <v-layout justify-center row wrap>
        <v-card id="screen" width="1000" height="550">
          <v-card-text>
            <h3 class="text-xs-center pt-5 headline">{{ message }}</h3>
            <div>
              {{ trans }}
            </div>
          </v-card-text>
        </v-card>

        <v-flex xs6 class="mt-3"></v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import noise from "noisedot";

export default {
  data() {
    return {
      trans:[],
      sock: "",
      opacity: 0.19,
      message: "No sermon at the moment"
    };
  },
  created() {
    this.$nextTick(z => {
      noise("#screen", {
        animate: true,
        patternWidth: 100,
        patternHeight: 100,
        grainOpacity: this.opacity,
        grainDensity: 1,
        grainWidth: 1,
        grainHeight: 1,
        grainChaos: 0.9,
        grainSpeed: 20
      });
    });
  },
  mounted() {
    this.$io.get("/channel/subscribe/?id=" + this.$route.params.id, body => {
      this.message = `${body.name}`;
    });

    this.$io.on("rotciv", data => {
      console.log(data);
      this.trans.push(data)
    });

    // .catch(e => {
    //   if (e.response.status == 404) {
    //     this.message = "No Channel Found";
    //     this.opacity = 5;
    //     this.$nextTick(z => {
    //       noise("#screen", {
    //         animate: true,
    //         patternWidth: 100,
    //         patternHeight: 100,
    //         grainOpacity: this.opacity,
    //         grainDensity: 1,
    //         grainWidth: 1,
    //         grainHeight: 1,
    //         grainChaos: 0.9,
    //         grainSpeed: 20
    //       });
    //     });
    // }
    // });
  },
  methods: {}
};
</script>

<style scoped>
#screen {
  position: absoulte;
  z-index: 100 !important;
  background: rgb(0, 0, 0);
  color: antiquewhite;
}
</style>
