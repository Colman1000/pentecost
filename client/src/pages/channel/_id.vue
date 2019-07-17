<template>
  <div>
    <!-- TODO: Should override `pt-2` for mobile screens -->
    <v-container fluid class="pa-0" grid-list-md>
      <v-layout justify-center row wrap>
        <v-card
          height="1000px"
          id="screen"
          width="1000"
          style="overflow-y: scroll !important; border-radius: 0 !important;"
        >
          <v-card-text>
            <h3 class="text-xs-center pt-3 pb-3 display-1">
              <v-avatar size="60">
                <v-img :src="channel.flag"></v-img>
              </v-avatar>
              {{ message }}
            </h3>
            <hr class="mt-2 mb-4" />
            <v-divider></v-divider>
            <!-- <div v-if="currentSpoke === ''" class="text-xs-center">No live translations for now</div> -->
            <div id="translationScreen" class="headline font-weigth-light text-xs-center">
              <div
                v-for="(t, index) in trans"
                :key="index"
                class="beautify"
                :style="`color: ${index === numberOfTranslations -1? 'white': 'grey'}`"
              >
                {{t.text}}
                <br />
                <small class="smaller">{{t.createdAt}}</small>
              </div>
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
// My plugins config
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
      scope: [],
      // Grain Config
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
      document.addEventListener("ondragstart", e => {
        e.preventDefault();
      });
    });
  },
  computed: {
    // Computed channelID
    channelId() {
      return this.$route.params.id;
    },
    numberOfTranslations() {
      return this.trans.length;
    }
  },
  mounted() {
    this.words = localStorage.getItem("words");

    var channelId = this.$route.params.id;
    // Subscribe to a channel
    this.$io.get(
      "/channel/subscribe/?id=" + this.$route.params.id,
      (body, jwt) => {
        if (jwt.statusCode == 404) {
          // Only Tweak the screen if the channel don't exist
          noise("#screen", Object.assign(this.config, { grainOpacity: 5 }));
        } else {
          // Else assing the channel argins
          this.message = `${body.name}`;
          this.channel = body;
        }
      }
    );
    // Subcribe to socket event
    this.$io.on("new audio", data => {
      // console.log("new audio", data);
      this.translateAudioToText(data);
    });

    // Actually forgotten what this does
    this.$io.on("rotciv", data => {
      this.trans.unshift(data);
    });
  },
  methods: {
    /**
     * @description Translate the new audio input text to the native socket language
     * @param {data: string}
     * @returns {void}
     */
    translateAudioToText(data) {
      this.$io.post(
        `/channel/broadcast-message/?audioId=${data.id}&channelId=${this.$route.params.id}`,
        text => {
          // unshift our stack
          this.trans.push({
            text: text,
            createdAt: new Date(Date.now()).toLocaleTimeString()
          });
          // Speak the translated text
          this.speakTranslatedText(text);

          //CUSTOM CODE ==>>>>>
          const elem = document.getElementById("translationScreen");
          elem.scrollTop = elem.scrollHeight;
          //CUSTOM CODE ==>>>>>
        }
      );
    },
    /**
     * @description Speak the argumented text
     * @param {text: string}
     * @returns {:void}
     */
    speakTranslatedText(text) {
      this.currentSpoke = text;
      // Send to server to return the {{ Base64 }} encoding buffer for the text
      this.$io.post(
        "/channel/speak",
        // Arguments
        {
          text: text,
          locale: this.channel.voice // <- The server should have an alternate
        },
        data => {
          // Mount an Audio instance
          // TODO: Some channels don't have a voice output and should be caught here
          speak = new Audio("data:audio/wav;base64," + data);
          // Automatically play the audio
          speak.play();
        }
      );
    }
  }
};
</script>

<style scoped>
.currentSpoken {
  color: rgb(255, 255, 255) !important;
}
.headline {
  font-weight: 100px !important;
  font-size: 18px !important;
}
#screen {
  position: absoulte;
  z-index: 100 !important;
  background: rgb(0, 0, 0);
  color: antiquewhite;
}
.beautify {
  animation-duration: 250ms;
  animation-fill-mode: both;
  animation-name: fade;
}
.smaller {
  font-size: 10 !important;
}
@keyframes fade {
  from {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
</style>
