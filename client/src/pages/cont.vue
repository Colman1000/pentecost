<template>
  <div tabindex="0" @keyup.space="prepare($event)">
    <v-container grid-list-sm class="text-center">
      <v-layout justify-center row wrap>
        <v-flex xs12 md8>
          <!-- <h3 class="text-center">Continous Speech without crashing experiment</h3> -->
          <v-card width outlined :loading="isSpeaking">
            <v-card-title v-if="!saying == ''">{{ saying }}</v-card-title>
            <v-card-title v-else>
              <v-icon size="200">mdi-shape</v-icon>
            </v-card-title>
          </v-card>
          <v-list-item two-line v-for="_said in said" :key="_said">
            <v-list-item-content>
              <v-list-item-title>{{ _said }}</v-list-item-title>
              <v-list-item-subtitle>{{ Date.now() | moment("h:sa")}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-flex>
        <br />
      </v-layout>
    </v-container>
    <v-snackbar left bottom v-model="snackbarStart" color="success">
      <v-icon color="white">mdi-text-to-speech</v-icon>&nbsp;
      Mic is active
      <v-spacer></v-spacer>
    </v-snackbar>
    <v-snackbar left bottom v-model="snackbarEnd" color="warning">
      <v-icon color="white">mdi-text-to-speech-off</v-icon>&nbsp;
      Mic is not active
      <v-spacer></v-spacer>
    </v-snackbar>
  </div>
</template>


<script>
export default {
  data() {
    return {
      said: [], //* main array of said words
      said$: [], //? filter holder to patch android bug `notice the dollar sign`
      isSpeaking: false,
      saying: "",
      snackbarStart: false,
      snackbarEnd: false
    };
  },
  methods: {
    notify() {}, // NATIVE SPACE KEY TIGGERS THIS
    prepare(e) {}
  },
  created() {
    // Warn if tab is about to be changed
    var that = this;
    window.addEventListener("blur", function(e) {
      if (that.$store.state.isActivated) {
        new Notification("Pentecost is running...");
      }
    });
  },
  watch: {
    //? watch for multiple transcripts in android
    said$(word) {
      console.log("filter", word);
      //* Run filter and clean duplicated code here and assign it to the said word
      this.said = [...new Set(word)];
    },

    isActivated(v) {
      //? Somthing like this can be used instead
      //? this.snackbarStart = !this.snackbarEnd;
      //* But it works..
      if (v) {
        this.snackbarStart = true;
        this.snackbarEnd = false;
        recognition.start();
      } else {
        this.snackbarEnd = true;
        this.snackbarStart = false;
        recognition.stop();
      }
    }
  },
  mounted() {
    //? Export `this` for illegal conflict with local fns
    var that = this;
    if (!("webkitSpeechRecognition" in window)) {
      alert("Oops, how come? did you remove your speech listener ?");
    } else {
      var recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-NG";
      var final_transcript = "",
        final_span = "";

      recognition.onstart = function() {
        console.log("onstart: ", "started!");
      };
      recognition.onend = function() {
        console.log("Speech ended! restarting...");
        that.isSpeaking = false;
        that.$store.state.isActivated = false;
        //? Start recognition if stopped
        recognition.start();
      };
      recognition.onerror = function(event) {
        console.warn("onerror called!", event);
      };
    }

    recognition.onresult = function(event) {
      var interim_transcript = "";
      var current = event.resultIndex;

      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          // Final text
          final_transcript = event.results[i][0].transcript;
          that.said$.unshift(final_transcript);

          //* Upload the text to the server
          that.$io.post("/audio/upload-text/?rawText=" + final_transcript);

          that.isSpeaking = false;
          that.$store.state.waiting = true;
        } else {
          // While is speaking..
          that.isSpeaking = true;
          that.$store.state.waiting = false;
          interim_transcript += event.results[i][0].transcript;
          that.saying = interim_transcript;
        }
      }
      final_transcript = final_transcript;
    };

    window.recognition = recognition;
  }
};
</script>
