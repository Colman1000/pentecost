<template>
  <q-page padding>
    <!-- content -->
    <q-list>
      <q-item v-for="(song, i) in songList" :key="i" v-ripple>
        <q-item-section avatar clickable>
          <q-icon v-if="!isPlaying" @click="playAudio(song.src)" color="primary" name="mdi-play" />
          <q-icon v-else @click="stopAudio" color="primary" name="mdi-pause" />
        </q-item-section>
        <q-item-section>{{ song.title }}</q-item-section>
        <q-item-section side top>
          <q-icon color="red" @click="deleteSong(song.id)" name="mdi-close" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
let audio = new Audio();
export default {
  data() {
    return {
      songList: [],
      isPlaying: false
    };
  },
  async mounted() {
    try {
      let { data } = await this.$axios.get("/songs");
      console.log(data.map(d => d.src));
      this.songList = data;
    } catch {
      this.$q.notify({
        message:
          "Sorry, an error occured while trying to load the songs from the server",
        color: "red"
      });
    }
  },
  methods: {
    deleteSong(id) {
      this.$axios
        .delete("/song/" + id)
        .then(result => {
          if (result) {
            this.$router.go();
          }
          console.log(result);
        })
        .catch(err => {
          console.log(err);
        });
    },
    stopAudio() {
      audio.pause();
      this.isPlaying = false;
    },
    playAudio(uri) {
      this.isPlaying = true;
      console.log(audio);
      audio = new Audio(uri);
      audio.play();
    }
  }
};
</script>
