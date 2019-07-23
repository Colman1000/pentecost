<template>
  <div>
    <v-container grid-list-md>
      <v-layout justify-center row wrap>
        <v-flex v-for="(chan, i) in channels" :key="i" xs6 md4>
          <v-card outlined hover ripple :href="`/#/channel/${chan.id}`">
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
  data() {
    return {
      channels: []
    };
  },
  mounted() {
    console.log();
    this.$io.get("/channel/get-channels", data => {
      this.channels = data;
    });
  }
};
</script>
