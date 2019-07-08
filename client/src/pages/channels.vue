<template>
  <div>
    <v-container grid-list-md>
      <v-layout justify-center row wrap>
        <v-flex v-for="(chan, i) in channels" :key="i" xs6 md6>
          <v-card :to="`/channel/${chan.id}`">
            <v-img :src="chan.flag"></v-img>
            <v-card-text>{{ chan.name }}</v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      channels: []
    };
  },
  mounted() {
    this.$axios
      .get("/channel/get-channels", {
        params: {
          select: ["name", "flag"]
        }
      })
      .then(({ data }) => {
        this.channels = data;
      });
  }
};
</script>
