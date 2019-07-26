<template>
  <div>
    <!-- Any one that is successfully in this tunnel should further subscribe to socket events  -->
    <!-- <h3>Conversation Started with {{ tunnel.username }}</h3> -->
    <Speak v-if="tunnel.lang" :langs="langs" :from="user.id" :to="tunnel.id" :lang="tunnel.lang"></Speak>

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
    // LISTEN FOR NEW MESSAGES TRIGGER
    this.$io.on("message", newMessage => {
      console.log("New message", newMessage);
    });
    // Verify unique constraints ..
    // .. just in case the user refreshes this page
    this.$io.post(
      "/tunnel/enter-tunnel",
      {
        tunnel: this.with
      },
      (data, jwr) => {
        this.tunnel = data;
        // WARN IF USER IS IN HIS CHANNEL WHILST LISTENING FOR MESSAGES - THIS COULD CAUSE SOCKET ERROR
        if (this.user.id == this.tunnel.id) {
          // Or the relay should change
          this.snackbar = true;
          this.message =
            "Inconsitency Violation attempted to enter a tunnel that is already yours, this may cause conflicting disorders";
        } // </if>

        // REDIRECT FOR UNAUTHORIZED ACCESS
        if (
          _.isEmpty(this.with) ||
          _.isUndefined(this.with) ||
          jwr.statusCode === 404
        ) {
          this.$router.push("/member/enter-tunnel");
        } //</fi>
      }
    );
  }
};
</script>
