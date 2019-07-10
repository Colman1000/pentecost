<template>
  <div>
    <v-container grid-list-md>
      <v-layout justify-center row wrap>
        <v-card width="500" flat v-if="audios.length === 0">
          <v-card-text class="text-xs-center">
            <v-icon size="150">mdi-microphone-variant-off</v-icon>
            <h3
              class
            >No live recordings at the moment, please start a session to start translating live audio</h3>
          </v-card-text>
        </v-card>

        <v-flex v-else xs12 md6>
          <v-list two-line subheader>
            <v-subheader inset>{{ Date.now() | moment("dddd, MMMM Do YYYY")}}</v-subheader>

            <v-list-tile v-for="(audio, o) in audios" :key="o" avatar @click>
              <v-list-tile-avatar @click="play(audio.id)">
                <v-icon color="primary">mdi-play</v-icon>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{ audio.text }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ audio.createdAt | moment("h:m:sa") }}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-btn outline @click="deleteAudio(audio.id)" small fab right color="transparent">
                  <v-icon color="error">mdi-trash-can</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
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
    this.$io.get(this.baseUrl + "/audios/1562704091712", data => {
      if (typeof data !== "string") {
        this.audios = data;
      }
      console.log(data);
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
