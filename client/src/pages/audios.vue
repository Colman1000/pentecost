<template>
  <div>
    <v-container grid-list-md>
      <v-layout justify-center row wrap>
        <v-card v-if="audios.length === 0">
          <v-card-text>
            <h3 class="headline">No audios at the moment</h3>
          </v-card-text>
        </v-card>

        <v-flex xs12 md6 v-for="(audio, i) in audios" :key="i">
          <v-card style="position:relative">
            <v-btn
              @click="deleteAudio(audio.id)"
              style="position:absolute"
              small
              fab
              right
              color="error darken-3"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-btn
              @click="getText(audio.id)"
              style="position:absolute"
              small
              fab
              left
              color="success darken-2"
            >
              <v-icon>mdi-check</v-icon>
            </v-btn>

            <v-card-title class="display-1">
              <!-- <v-progress-circular class="text-center" indeterminate color="primary"></v-progress-circular> -->
            </v-card-title>
            <v-card-title>{{ audio.createdAt | moment("dddd, MMMM Do YYYY") }}</v-card-title>
            <v-card-text>
              <audio-player :src="`${baseUrl}/audio/download/${audio.id}`" />
            </v-card-text>
          </v-card>
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
    this.$io.get(this.baseUrl + "/audios/2362", data => {
      if (typeof data !== "string") {
        this.audios = data;
      }
    });
    // Subcribe to socket event
    this.$io.on("new audio", data => {
      console.log("New audio distributed", data);
      this.audios.unshift(data);
    });
  },
  methods: {
    getText(id) {
      this.$io.post("/api/v1/audio/get-audio-text", { id: id }, data => {
        console.log(data);
      });
    },
    deleteAudio(id) {
      this.$io.delete(this.baseUrl + "/audio/" + id, data => {
        this.audios.splice(this.audios.indexOf(id), 1);
        this.audios = [...this.audios];
      });
    }
  }
};
</script>
