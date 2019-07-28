<template>
  <div>
    <v-container>
      <v-layout column justify-center align-center>
        <v-chip color="primary">{{ user.username }}@{{ user.userTunnel }} => {{ user.lang }}</v-chip>
        <v-flex xs12>
          <div class="chat_master pa-1 scrollbar" id="chat_container">
            <v-card flat class="text-center pa-3" color="transparent" width="500">
              <v-icon v-if="spoken.length === 0" size="200">mdi-gesture-tap</v-icon>
              <Bubble
                v-else
                v-for="(message, i) of spoken"
                :key="i"
                :userName="message.user == user.username ? 'You': message.user"
                :message="message.text"
                :align="message.user == user.username ? 'right': 'left'"
              />
            </v-card>
          </div>
          <Speak></Speak>
        </v-flex>
      </v-layout>
    </v-container>

    <v-snackbar
      multi-line
      v-model="snackbar"
      bottom
      left
      class="text-center"
      color="primary"
    >{{ message }}</v-snackbar>
  </div>
</template>

<script>
import Bubble from "@/components/ChatBubble";
import Speak from "@/components/TunnelSpeech";
import { languages } from "@/assets/speech";
window.speak = new Audio();
export default {
  layout: "blank",
  components: {
    Speak,
    Bubble
  },
  data() {
    return {
      spoken: [],
      langs: languages,
      tunnel: {},
      snackbar: false,
      message: ""
    };
  },
  computed: {
    with() {
      return this.$route.params.member;
    }
  },
  methods: {
    speak(word, lang) {
      this.$io.post(
        "/channel/speak",
        {
          text: word,
          locale: lang // <- The server should have an alternate
        },
        data => {
          // Mount an Audio instance
          speak = new Audio("data:audio/wav;base64," + data);
          // Automatically play the audio
          speak.play();
        }
      );
    }
  },
  mounted() {
    let _this19 = this;
    // LISTEN FOR NEW MESSAGES TRIGGER
    this.$io.on("message", newMessage => {
      console.log("New message", newMessage);
      // GET TRANSLATION FOR USERLAND
      console.log(newMessage);
      _this19.$io.post(
        "/tunnel/translate-for",
        {
          speech: newMessage.speech,
          from: newMessage.lang,
          to: _this19.user.lang,
          user: newMessage.from
        },
        data => {
          console.log("Transcript:", data);
          // SPEAK THE TRANSCRIPT
          _this19.spoken.push(data);

          //* Don't speak for the user that sent stuff
          if (data.user != _this19.user.username) {
            _this19.speak(data.text, _this19.user.lang);
          }
        }
      );
    });

    // WARN IF USER IS IN HIS CHANNEL WHILST LISTENING FOR MESSAGES - THIS COULD CAUSE SOCKET ERROR
    // if (this.user.id == this.with) {
    //   // Or the relay should change
    //   this.snackbar = true;
    //   this.message =
    //     "Inconsitency Violation attempted to enter a tunnel that is already yours, this may cause conflicting disorders";
    // } // </if>

    // // REDIRECT FOR UNAUTHORIZED ACCESS
    // if (
    //   _.isEmpty(this.with) ||
    //   _.isUndefined(this.with) ||
    //   jwr.statusCode === 404
    // ) {
    //   this.$router.push("/member/enter-tunnel");
    // } //</fi>
  }
};
</script>

<style>
.chat_master_header {
  background: #4d60cc;
  border: 1px solid #3f51b5;
}
.chat_master {
  top: 0px;
  height: 300px !important;
  /* border: 1px solid gray; */
  overflow: auto;
}
.chat_text_box {
  width: 100%;
}

#chat_container::-webkit-scrollbar-track {
  background-color: #f5f5f5;
}

#chat_container::-webkit-scrollbar {
  width: 6px;
  background-color: #f5f5f5;
}

#chat_container::-webkit-scrollbar-thumb {
  background-color: #4d60cc;
  background-image: -webkit-gradient(
    linear,
    0 0,
    0 100%,
    color-stop(0.5, rgba(255, 255, 255, 0.2)),
    color-stop(0.5, transparent),
    to(transparent)
  );
}
</style>
