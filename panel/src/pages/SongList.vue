<template>
  <q-page padding>
    <!-- content -->
    <q-list>
      <q-item v-for="(song, i) in songList" :key="i" clickable v-ripple>
        <q-item-section avatar>
          <q-icon color="primary" name="mdi-play" />
        </q-item-section>
        <q-item-section>
          {{ song.title }}
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
      songList: []
    };
  },
  async mounted() {
    try {
      let { data } = await this.$axios.get("/songs");
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
    playAudio(uri) {
      if (audio.pause) {
      }
      audio = new Audio(uri);
      audio.play();
    }
  }
};
</script>
