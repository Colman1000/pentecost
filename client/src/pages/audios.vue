<template>
  <div>
    <v-container grid-list-md>
      <v-layout justify-center row wrap>
        <v-card width="500" text v-if="audios.length === 0">
          <v-card-text class="text-center">
            <v-icon size="150">mdi-microphone-variant-off</v-icon>
            <h3
              class
            >No live recordings at the moment, please start a session to start translating live audio</h3>
          </v-card-text>
        </v-card>

        <v-flex v-else xs12 md6>
          <v-subheader inset>{{ Date.now() | moment("dddd, MMMM Do YYYY")}}</v-subheader>
          <v-list-item two-line v-for="(audio, o) in audios" :key="o" avatar @click>
            <v-list-item-avatar @click="play(audio.id)">
              <v-icon color="primary">mdi-play</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ audio.text }}</v-list-item-title>
              <v-list-item-subtitle>{{ audio.createdAt | moment("h:m:sa") }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn outlined @click="deleteAudio(audio.id)" small fab right color="transparent">
                <v-icon color="error">mdi-trash-can</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <br />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>


<script>
export default {
  data() {
    return {
      audios: []
    };
  },
  mounted() {
    console.log(this.baseUrl);
    this.$io.get(this.baseUrl + "/audios/1562704091712", data => {
      if (typeof data !== "string") {
        this.audios = data;
      }
      console.log("audios:", data);
    });
    // Subcribe to socket event
    this.$io.on("new audio", data => {
      console.debug("New audio\n", data);
      this.audios.unshift(data);
    });
  },
  methods: {
    play(id) {
      console.log(`${this.baseUrl}/audio/download/${id}`);
      var au = new Audio(`${this.baseUrl}/audio/download/${id}`);
      au.play();
    },
    getText(id) {
      this.$io.get("/audio/get-audio-text/?id=" + id, data => {
        console.log(data);
      });
    },
    deleteAudio(id) {
      this.$io.delete(this.baseUrl + "/audio/" + id, data => {
        const thing = this.audios.findIndex(t => t.id == id);
        this.audios.splice(thing, 1);
        // // No need for this, vue automatically does this
        // this.audios = [...this.audios];
      });
    }
  }
};
</script>
