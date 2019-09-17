<template>
  <v-container>
    <div style="text-align: center" class="py-2">
      <strong class="grey--text">Select A Tongue</strong>
    </div>

    <v-row v-show="!loading">
      <v-col cols="12">
        <v-text-field
          label="Search for a language"
          autofocus
          clearable
          outlined
          light
          :append-icon="(!query)? 'mdi-magnify' : false"
          v-model="query"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row v-show="loading" class="fill-height" align-content="center" justify="center">
      <v-col cols="12" class="subtitle-1 text-center grey--text">Getting Supported Languages</v-col>
      <v-col cols="8">
        <v-progress-linear
          color="deep-purple accent-4"
          indeterminate
          light
          striped
          rounded
          height="6"
        ></v-progress-linear>
      </v-col>
    </v-row>

    <v-container fill-height grid-list-md>
      <v-layout justify-center align-center row wrap>
        <v-row v-show="!loading" no-gutters>
          <v-col cols="6" sm="3" v-for="(chan, i) in filteredList" :key="i" class="pa-1">
            <v-card outlined ripple class="hover" @click="navigate(chan.id)">
              <v-card-text class="font-weight-bold">
                <v-avatar size="25">
                  <v-img v-if="selectedChannel !== chan.id" :src="`https://www.countryflags.io/${chan.flag}/shiny/64.png`"></v-img>
                  <v-icon v-else class="spinner">mdi-loading</v-icon>
                </v-avatar>
                {{ chan.name }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-layout>
    </v-container>
  </v-container>
</template>

<style scoped>
.hover {
  transform: scale(0.98);
  transition: all 200ms ease;
}
.hover:hover {
  box-shadow: 0 1px 5px rgba(10, 10, 10, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.2) !important;
  transform: scale(1);
}
.spinner::before {
  animation: Spin 1s linear infinite;
}
@keyframes Spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

<script>
export default {
  layout: "blank",
  data() {
    return {
      channels: [],
      query: "",
      loading: true,
      selectingChannel: false,
      selectedChannel: ""
    };
  },
  methods: {
    navigate(channelId) {
      if (this.selectingChannel) return;
      this.selectingChannel = true;
      this.selectedChannel = channelId;
      // load the page while waiting for transcript in other languages
      this.$store.state._loading = true;
      // Anyhow just set this value
      localStorage.setItem("isFirstTimer", true);
      // Finally
      this.$router.push(`/tongue/${channelId}`);
    }
  },
  computed: {
    filteredList() {
      if (!this.query) return this.channels;
      const re = RegExp(this.query, "i");
      return this.channels.filter(channel => re.test(channel.name));
    }
  },
  mounted() {
    // Get all channels
    this.$io.get("/channel/get-channels", data => {
      this.channels = data;
      this.loading = false;
    });
  }
};
</script>
