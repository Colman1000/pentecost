<template>
  <div tabindex="0" @keyup.space="prepare($event)">
    <v-container grid-list-lg class="text-center">
      <v-layout justify-center row wrap>
        <v-flex xs12>
          <!-- <h3 class="text-center">Continous Speech without crashing experiment</h3> -->
          <v-card width="500" outlined :loading="isSpeaking">
            <v-card-title>{{ saying }}</v-card-title>
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
    <v-snackbar left bottom v-model="snackbar" color="success">
      <v-icon color="white">mdi-text-to-speech</v-icon>&nbsp;
      Mic is active
      <v-spacer></v-spacer>
    </v-snackbar>
  </div>
</template>


<script>
export default {
  data() {
    return {
      said: [],
      isSpeaking: false,
      saying: "",
      snackbar: false
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
        new Notification("Pentecost is still running...");
      }
    });
  },
  watch: {
    isActivated(v) {
      if (v) {
        this.snackbar = true;
        recognition.start();
      } else {
        this.snackbar = false;
        recognition.stop();
      }
    }
  },
  mounted() {
    var that = this;
    if (!("webkitSpeechRecognition" in window)) {
      alert("Oops!");
    } else {
      var recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      var final_transcript = "",
        final_span = "";

      recognition.onstart = function() {
        console.log("onstart: ", "started!");
      };
      recognition.onend = function() {
        console.log("Speech ended! restarting...");
        that.isSpeaking = false;
        that.$store.state.isActivated = false;
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
          that.said.unshift(final_transcript);

          // SOCKET COMES HERE!
          that.$io.post(
            "/audio/upload-text/?rawText=" + final_transcript,
            data => {
              console.log(data);
            }
          );

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
