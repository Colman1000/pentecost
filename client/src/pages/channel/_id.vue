<template>
  <div>
    <v-container grvalue-list-md>
      <v-layout justify-center row wrap>
        <v-card id="screen" width="1000" height="550">
          <v-card-text>
            <h3 class="text-xs-center pt-5 pb-3 display-1">{{ message }}</h3>
            <div v-if="trans.length === 0" class="text-xs-center">No live translations for now</div>
            <div
              v-else
              class="headline font-weigth-light text-xs-center"
              v-html="trans.join('<br>')"
            ></div>
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
      trans: [],
      sock: "",
      opacity: 0.19,
      message: "No active translations now",
      config: {
        animate: true,
        patternWidth: 100,
        patternHeight: 100,
        grainOpacity: 0.19,
        grainDensity: 1,
        grainWidth: 1,
        grainHeight: 1,
        grainChaos: 0.9,
        grainSpeed: 20
      }
    };
  },
  created() {
    this.$nextTick(z => {
      noise("#screen", this.config);
    });
  },
  mounted() {
    this.$io.get(
      "/channel/subscribe/?id=" + this.$route.params.id,
      (body, jwt) => {
        if (jwt.statusCode == 404) {
          noise("#screen", Object.assign(this.config, { grainOpacity: 5 }));
        } else {
          this.message = `${body.name}`;
        }
      }
    );

    this.$io.on("rotciv", data => {
      this.trans.unshift(data);
    });
  },
  methods: {}
};
</script>

<style scoped>
.headline {
  font-weight: 100px !important;
}
#screen {
  position: absoulte;
  z-index: 100 !important;
  background: rgb(0, 0, 0);
  color: antiquewhite;
}
</style>
