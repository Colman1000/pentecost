<template>
  <div>
    <!-- Any one that is successfully in this tunnel should further subscribe to socket events  -->
    <!-- <h3>Conversation Started with {{ tunnel.username }}</h3> -->
    {{ spoken }}
    <Speak></Speak>

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
import Speak from "@/components/TunnelSpeech";
import { languages } from "@/assets/speech";
export default {
  components: {
    Speak
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
  mounted() {
    let _this19 = this;
    // LISTEN FOR NEW MESSAGES TRIGGER
    this.$io.on("message", newMessage => {
      console.log("New message", newMessage);
      this.$io.post(
        "/tunnel/translate-for",
        {
          speech: newMessage.speech,
          from: newMessage.lang,
          to: this.user.lang,
          user: this.user.id
        },
        data => {
          console.log("Transcript:", data);
          _this19.spoken.push(data);
        }
      );
    });
    // WARN IF USER IS IN HIS CHANNEL WHILST LISTENING FOR MESSAGES - THIS COULD CAUSE SOCKET ERROR
    if (this.user.id == this.with) {
      // Or the relay should change
      this.snackbar = true;
      this.message =
        "Inconsitency Violation attempted to enter a tunnel that is already yours, this may cause conflicting disorders";
    } // </if>

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
