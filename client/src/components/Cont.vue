<template>
  <div>
    <v-container grid-list-md fill-height>
      <v-layout row wrap justify-center align-center>
        <v-flex xs6>
          <v-switch ripple color="primary" v-model="isActive"></v-switch>
          <v-card :loading="isActive" width="500">
            <v-card-title></v-card-title>
            <v-card-text>{{ said }}</v-card-text>
          </v-card>

          <v-select
            class="mt-5 mb-2"
            outlined
            @change="changeLanguage($event)"
            :items="languages"
            label="Select language"
          ></v-select>
        </v-flex>
      </v-layout>
    </v-container>
    <br />
    <br />
    <v-divider></v-divider>
    {{ instruction }}
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
      required: true
    }
  },
  data() {
    return {
      isActive: false,
      instruction: "",
      said: "",
      lang: "en-NG"
    };
  },
  watch: {
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
        console.log(transcript);
      }
    };
  },
  methods: {
    changeLanguage(e) {
      this.lang = e;
    },
    stop() {
      recognition.stop();
    },
    start() {
      if ("recognition" in window) {
        recognition.start();
      }
    }
  }
};
</script>
