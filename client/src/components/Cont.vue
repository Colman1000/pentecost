<template>
  <div class="text-center">
    <v-alert type="error" v-if="error">{{ instruction }}</v-alert>
    <v-container grid-list-md fill-height>
      <v-layout row wrap justify-center align-center>
        <v-flex xs12 sm5 md4 class="text-center">
          <div>
            <v-icon
              class="ma-0"
              color="secondary"
              v-if="!isActive"
              @click="isActive = !isActive"
              size="100"
            >mdi-lightbulb-outline</v-icon>
            <v-icon
              color="primary"
              class="ma-0"
              v-else
              @click="isActive = !isActive"
              size="100"
            >mdi-lightbulb-on</v-icon>
          </div>
          <br />
          <v-progress-linear height="8" v-if="isActive" indeterminate></v-progress-linear>
          <v-textarea disabled solo v-model="said"></v-textarea>

          <v-select
            class="mt-5 mb-2"
            outlined
            @change="changeLanguage($event)"
            :items="languages"
            label="Select language"
          ></v-select>

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
    <br />
    <br />
    <v-divider></v-divider>
    <span class="ma-4 mt-3 text-center">{{ instruction }}</span>
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
    languages: {
      type: Array,
      required: false
    },
    gender: {
      type: Array,
      required: false
    }
  },
  data() {
    return {
      isActive: false,
      instruction: "",
      said: "",
      lang: "en-NG",
      error: false
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
      this.$io.post(`/audio/upload-text/`, {
        lang: this.lang,
        text: word
      });
      console.log(`Sent: ${word}`);
    },
    // Toggle state of pentecost
    isActive(bool) {
      if (bool && "recognition" in window) {
        recognition.lang = this.lang;
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.start();
      } else {
        recognition.stop();
      }
    }
  },
  mounted() {
    var that = this,
      noteContent = "";

    recognition.onstart = function() {
      that.error = false;
      that.instruction =
        "Voice recognition activated. Try speaking into the microphone.";
    };

    recognition.onspeechend = function() {
      that.instruction =
        "You were quiet for a while so pentecost turned itself off.";
      that.isActive = false;
    };

    recognition.onerror = function(event) {
      if (event.error == "no-speech") {
        that.instruction = "No speech was detected. Try again.";
      } else if (event.error == "not-allowed") {
        that.instruction =
          "Somehow pentecost was not allowed to use speech model, are you on a proxy?";
      } else {
        that.instruction =
          "Inconsitency violation: Somehow pentecost encountered an error and was not able to handle it automatically!";
      }
      that.error = true;
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
    changeLanguage(e) {
      this.lang = e;
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
