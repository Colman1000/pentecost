<template>
  <div style="overflow-y: hidden !important; height: 100vh">
    <!-- TRANSCRIBED BIBLE PASSAGE -->
    <v-dialog fullscreen v-model="overlay">
      <v-card class="justify-center text-center">
        <v-container fill-height>
          <v-layout justify-center align-center>
            <v-flex xs12 md4>
              <v-card-text class="text-center">
                <v-icon size="200">mdi-bible</v-icon>
                <br />
                <h2 class="mt-4">{{ biblePassage }}</h2>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn block x-large color="primary" rounded @click="overlay = false">Amen</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
    <!--// TRANSCRIBED BIBLE PASSAGE -->
    <v-container
      fluid
      class="pa-0 ma-0"
      grid-list-md
      style="overflow-y: hidden !important; border-radius: 0 !important; height: 100vh"
    >
      <div
        :height="height"
        :width="width"
        id="screen"
        style="overflow-y: hidden !important; border-radius: 0 !important;"
      >
        <v-card
          absolute
          style="height: 100vh; background: transparent; overflow-y: auto !important; border-radius: 0 !important;"
        >
          <v-alert
            v-if="noVoiceOutput"
            icon="mdi-volume-off"
            type="warning"
            class="mb-0"
            style="border-radius: 0 !important;"
          >{{ noVoiceText }}</v-alert>
          <v-card-text class="pa-0 mt-0">
            <h3 class="text-center pt-5 mt-0 pb-5 display-1 white--text bg">
              <v-avatar size="25">
                <v-img :src="`https://www.countryflags.io/${channel.flag}/shiny/64.png`"></v-img>
              </v-avatar>
              {{ message }}
            </h3>
            <v-divider></v-divider>
            <!-- <div v-if="currentSpoke === ''" class="text-xs-center">No live translations for now</div> -->
            <div id="translationScreen" class="headline font-weigth-light text-center">
              <div
                v-for="(t, index) in translations"
                :key="index"
                class="mt-4 beautify"
                :style="`color: ${ index === 0 ? 'white': 'grey' }`"
              >
                {{ t.nativeWord }}
                <br />
                <small class="smaller">{{ t.createdAt | moment("h:ma") }}</small>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </div>
    </v-container>
  </div>
</template>

<script>
import noise from "noisedot";
// My plugins config
window.speak = new Audio();
export default {
  layout: "blank",
  data() {
    return {
      overlay: false,
      biblePassage: "loading..",
      noVoiceOutput: false, //? Determines if theresa voice output for a channel
      noVoiceText: "...",
      channel: {},
      currentSpoke: "",
      translations: [],
      opacity: 0.19,
      message: "No active translations now",
      width: 1000,
      height: 680,

      // Grain Config
      config: {
        animate: true,
        patternWidth: 100,
        patternHeight: 100,
        grainOpacity: 0.2,
        grainDensity: 1,
        grainWidth: 1,
        grainHeight: 1,
        grainChaos: 0.9,
        grainSpeed: 20
      }
    };
  },

  //? Show a transcript of a particular bible message before this component is visited
  beforeRouteEnter(to, from, next) {
    let biblePassage = `We are from these different countries, but we can hear these men in our own languages! We can all understand the great things they are saying about God - Acts 2:11`;
    io.post(
      "/channel/translate-text",
      {
        text: biblePassage,
        channelId: to.params.id
      },
      (data, jwr) => {
        next(vm => {
          // Catch Error's
          if (jwr.statusCode === 500) {
            vm.overlay = false;
          } else {
            vm.overlay = true;
            vm.biblePassage = data;
          }
        });
      }
    );
  },
  created() {
    this.$nextTick(z => {
      noise("#screen", this.config);
    });
  },
  beforeMount() {
    // remove any loading state
    this.$store.state._loading = false;
  },
  computed: {
    // Computed channelID
    channelId() {
      return this.$route.params.id;
    }
  },
  mounted() {
    this.width = window.screen.availWidth;
    this.height = window.screen.availHeight;

    // ███████╗ ██████╗  ██████╗██╗  ██╗███████╗████████╗
    // ██╔════╝██╔═══██╗██╔════╝██║ ██╔╝██╔════╝╚══██╔══╝
    // ███████╗██║   ██║██║     █████╔╝ █████╗     ██║
    // ╚════██║██║   ██║██║     ██╔═██╗ ██╔══╝     ██║
    // ███████║╚██████╔╝╚██████╗██║  ██╗███████╗   ██║
    // ╚══════╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝╚══════╝   ╚═╝
    this.$io.on("rotciv", data => {
      console.log("new audio detected", data);
      // ┌┐┌┌─┐┌┬┐┬┬  ┬┌─┐╦ ╦┌─┐┬─┐┌┬┐  ┬┌─┐  ┌─┐┬┬ ┌┬┐┌─┐┬─┐┌─┐┌┬┐
      // │││├─┤ │ │└┐┌┘├┤ ║║║│ │├┬┘ ││  │└─┐  ├┤ ││  │ ├┤ ├┬┘├┤  ││
      // ┘└┘┴ ┴ ┴ ┴ └┘ └─┘╚╩╝└─┘┴└──┴┘  ┴└─┘  └  ┴┴─┘┴ └─┘┴└─└─┘─┴┘  ooo
      //      ┬┌┐┌  ┌┬┐┬ ┬┌─┐  ╔╦╗┌─┐┌┬┐┌─┐┬  ┌─┐┌┬┐┌─┐
      //      ││││   │ ├─┤├┤    ║ ├┤ │││├─┘│  ├─┤ │ ├┤
      // ooo  ┴┘└┘   ┴ ┴ ┴└─┘   ╩ └─┘┴ ┴┴  ┴─┘┴ ┴ ┴ └─┘
      this.translations.unshift(data);
      this.speakTranslatedText(data.nativeWord);
    });

    // ┌─┐┌─┐┌┬┐╔═╗┬─┐┌─┐┬  ┬┬┌─┐┬ ┬┌─┐╔╦╗┬─┐┌─┐┌┐┌┌─┐┬  ┌─┐┌┬┐┬┌─┐┌┐┌┌─┐
    // │ ┬├┤  │ ╠═╝├┬┘├┤ └┐┌┘││ ││ │└─┐ ║ ├┬┘├─┤│││└─┐│  ├─┤ │ ││ ││││└─┐
    // └─┘└─┘ ┴ ╩  ┴└─└─┘ └┘ ┴└─┘└─┘└─┘ ╩ ┴└─┴ ┴┘└┘└─┘┴─┘┴ ┴ ┴ ┴└─┘┘└┘└─┘
    this.getPreviousTranslations();

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
          if (_.isEmpty(this.channel.voice)) {
            this.noVoiceOutput = true;
            this.noVoiceText = this.channel.noVoiceText;
          }
        }
      }
    );
  },
  methods: {
    /**
     * @description Retireves the list of translations this channel has from a particular session
     */
    getPreviousTranslations() {
      this.$io.get(
        "/channel/get-translations",
        {
          channel: this.channelId
        },
        translations => {
          this.translations = translations;
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
        {
          text: text,
          locale: this.channel.voice // <- The server should have an alternate
        },
        data => {
          //Pause previous audio is still playing..
          speak.pause();
          const handle = window.setTimeout(() => {
            window.clearTimeout(handle);
            // Mount an Audio instance
            speak = new Audio("data:audio/wav;base64," + data);
            console.log("speak", speak.paused, speak.duration, speak.ended);
            // Automatically play the audio
            speak.play();
          }, 500);
        }
      );
    }
  }
};
</script>

<style scoped>
* {
  font-family: "Montserrat", sans-serif !important;
}
.bg {
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3),
    rgba(100, 100, 100, 0.1)
  ) !important;
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
}
.currentSpoken {
  color: rgb(255, 255, 255) !important;
}
.headline {
  font-weight: 100px !important;
  font-size: 18px !important;
}
#screen {
  position: absolute;
  z-index: 100 !important;
  background: rgb(0, 0, 0);
  color: antiquewhite;
}
.smaller {
  font-size: 10px !important;
}
.beautify {
  animation-duration: 250ms;
  animation-fill-mode: both;
  animation-name: fade;
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
