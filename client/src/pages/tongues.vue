<template>
  <div>
    <v-container fill-height grid-list-md>
      <v-layout justify-center align-center row wrap>
        <v-flex v-for="(chan, i) in channels" :key="i" xs6 md4>
          <v-card outlined hover ripple @click="navigate(chan.id)">
            <v-card-text class="font-weight-bold">
              <v-avatar size="60">
                <v-img :src="chan.flag"></v-img>
              </v-avatar>
              {{ chan.name }}
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  layout: "blank",
  data() {
    return {
      channels: []
    };
  },
  methods: {
    navigate(channelId) {
      // load the page while waiting for transcript in other languages
      this.$store.state._loading = true;
      // Anyhow just set this value
      localStorage.setItem("isFirstTimer", true);
      // Finally
      this.$router.push(`/tongue/${channelId}`);
    }
  },
  mounted() {
    // Get all channels
    this.$io.get("/channel/get-channels", data => {
      this.channels = data;
    });
  }
};
</script>
