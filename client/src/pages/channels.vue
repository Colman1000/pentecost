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
      // TODO : Make this a mixin
      var isFirstTimer = localStorage.getItem("isFirstTimer");
      if (!isFirstTimer) {
        localStorage.setItem("isFirstTimer", true);
        this.$router.push(`/channel/${channelId}`);
      } else {
        this.$router.push(`/channel/${channelId}`);
      }
    }
  },
  mounted() {
    this.$io.get("/channel/get-channels", data => {
      this.channels = data;
    });
  }
};
</script>
