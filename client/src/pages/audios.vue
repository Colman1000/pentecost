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
          <v-card>
            <v-card-title class="display-1">The translated text should be here</v-card-title>
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
    this.$io.get(this.baseUrl + "/audios/2", data => {
      this.audios = data;
    });
    // Subcribe to socket event
    this.$io.on("new audio", data => {
      console.log("New audio distributed", data);
      this.audios.unshift(data);
    });
  }
};
</script>
