<template>
  <div>
    <v-container grvalue-list-md>
      <v-layout justify-center row wrap>
        <v-card id="screen" width="1000" height="550">
          <v-card-text>
            <h3 class="text-xs-center pt-5 pb-3 display-1">
              <v-avatar size="60">
                <v-img :src="channel.flag"></v-img>
              </v-avatar>
              {{ message }}
            </h3>
            <!-- <div v-if="currentSpoke === ''" class="text-xs-center">No live translations for now</div> -->
            <div class="headline font-weigth-light text-xs-center" v-html="words"></div>
          </v-card-text>
        </v-card>

        <v-flex xs6 class="mt-3"></v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import noise from "noisedot";
window.speak = new Audio();
export default {
  data() {
    return {
      channel: {},
      trans: [],
      currentSpoke: "",
      sock: "",
      opacity: 0.19,
      message: "No active translations now",
      isSpeaking: false,
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
  watch: {},
  created() {
    this.$nextTick(z => {
      noise("#screen", this.config);
    });
  },
  computed: {
    words() {
      return this.trans.join("<br><br>");
    },
    channelId() {
      return this.$route.params.id;
    }
  },
  mounted() {
    var channelId = this.$route.params.id;
    this.$io.get(
      "/channel/subscribe/?id=" + this.$route.params.id,
      (body, jwt) => {
        if (jwt.statusCode == 404) {
          noise("#screen", Object.assign(this.config, { grainOpacity: 5 }));
        } else {
          this.message = `${body.name}`;
          this.channel = body;
        }
      }
    );
    // Subcribe to socket event
    this.$io.on("new audio", data => {
      console.log("new audio", data);
      this.translateAudioToText(data);
    });

    this.$io.on("rotciv", data => {
      this.trans.push(data);
    });
  },
  methods: {
    translateAudioToText(data) {
      this.$io.post(
        `/channel/broadcast-message/?audioId=${data.id}&channelId=${this.$route.params.id}`,
        text => {
          // console.log("data text", text);
          // console.log("old text", this.currentSpoke);
          if (text == this.currentSpoke) {
            return;
          } else {
            this.speakTranslatedText(text);
          }
        }
      );
    },
    speakTranslatedText(text) {
      this.currentSpoke = text;
      this.trans.push(text);
      this.$io.post(
        "/channel/speak",
        {
          text: text,
          locale: this.channel.voice // <- The server should have an alternate
        },
        data => {
          speak = new Audio("data:audio/wav;base64," + data);
          speak.play();
        }
      );
    }
  }
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
