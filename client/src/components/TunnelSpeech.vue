<template>
  <div>
    <v-container grid-list-md fill-height>
      <v-layout justify-center align-center>
        <v-flex xs12 md12 class="text-center">
          <!-- <v-switch x-large color="primary" v-model="isActive"></v-switch> -->
          <div>
            <v-icon
              class="ma-0"
              v-if="!isActive"
              @click="isActive = !isActive"
              size="100"
            >mdi-toggle-switch-off-outline</v-icon>
            <v-icon
              v-else
              @click="isActive = !isActive"
              class="ma-0"
              color="primary"
              size="100"
            >mdi-toggle-switch</v-icon>
          </div>
          <v-progress-linear height="8" v-if="isActive" indeterminate></v-progress-linear>
          <v-textarea disabled solo v-model="said"></v-textarea>
          <!-- <v-select
            class="mt-5 mb-2"
            outlined
            @change="changeLanguage($event)"
            :items="langs"
            label="Select language"
          ></v-select>-->

          <v-select
            v-if="gender"
            class="mb-2"
            outlined
            @change="changeGender($event)"
            :items="gender"
            label="Voice Output"
          ></v-select>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
var SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();
// Export for window
window.recognition = recognition;
export default {
  props: {
    gender: {
      type: Array,
      required: false
    }
  },
  created() {
    this.$nextTick(tick => {});
  },
  data() {
    return {
      isActive: false,
      instruction: "",
      said: ""
    };
  },
  watch: {
    // Watch for said words and do something to them..
    said(word) {
      // i can run some codes here with out bottering the API
      // ███████╗ ██████╗  ██████╗██╗  ██╗███████╗████████╗
      // ██╔════╝██╔═══██╗██╔════╝██║ ██╔╝██╔════╝╚══██╔══╝
      // ███████╗██║   ██║██║     █████╔╝ █████╗     ██║
      // ╚════██║██║   ██║██║     ██╔═██╗ ██╔══╝     ██║
      // ███████║╚██████╔╝╚██████╗██║  ██╗███████╗   ██║
      // ╚══════╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝╚══════╝   ╚═╝
      let toSend = {
        speech: word,
        user: this.user.id,
        tunnel: this.user.tunnelIn.id
      };
      this.$io.post(`/tunnel/upload-speech/`, toSend);
      console.log(`Sent: ${toSend}`);
    },
    // Toggle state of pentecost
    isActive(bool) {
      if (bool && "recognition" in window) {
        console.log(this.user.lang);
        recognition.lang = this.user.lang;
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.start();
      } else {
        recognition.stop();
      }
    }
  },
  mounted() {
    console.log("from", this.from);
    var that = this,
      noteContent = "";

    recognition.onstart = function() {
      that.instruction =
        "Voice recognition activated. Try speaking into the microphone.";
    };

    recognition.onspeechend = function() {
      that.instruction =
        "You were quiet for a while so pentecost turned itself off.";
      that.isActive = false;
    };

    recognition.onerror = function(event) {
      console.warn(event);
      if (event.error == "no-speech") {
        that.instruction = "No speech was detected. Try again.";
      }
    };

    recognition.onresult = function(event) {
      // event is a SpeechRecognitionEvent object.
      // It holds all the lines we have captured so far.
      // We only need the current one.
      var current = event.resultIndex;

      // Get a transcript of what was said.
      var transcript = event.results[current][0].transcript;

      // Add the current transcript to the contents of our Note.
      var mobileRepeatBug =
        current == 1 && transcript == event.results[0][0].transcript;
      if (!mobileRepeatBug) {
        noteContent += transcript;
        that.said = transcript;
      }
    };
  },
  methods: {
    test() {
      this.said = "What";
    },
    changeGender(e) {
      this.$io.post(
        "/channel/change-ssml-gender",
        {
          gender: e
        },
        done => {
          console.log("Changed  voice output to: " + done);
        }
      );
    },
    stop() {
      recognition.stop();
    },
    start() {
      recognition && "recognition" in window ? recognition.start() : null;
    }
  }
};
</script>
