<template>
  <v-app app :class="$store.state.loading ? 'loading': null ">
    <v-toolbar color="primary" dark app>
      <v-toolbar-title @click="$router.push('/')" style="background:transparent">Pentecost</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/" flat text>
        <v-icon>mdi-microphone</v-icon>&nbsp;Speak
      </v-btn>
      <v-btn to="/audios" flat>Audios</v-btn>
      <v-btn to="/channels" flat>Channels</v-btn>
    </v-toolbar>

    <v-content>
      <vue-page-transition name="fade-in-right">
        <router-view />
      </vue-page-transition>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App"
};
</script>
<style>
* {
  font-family: "Montserrat", sans-serif;
}
.headline {
  font-weight: 50 !important;
  font-size: 20px !important;
}
.v-badge__badge {
  margin: 10px !important;
  right: -4px !important;
}
.v-card {
  border-radius: 9px !important;
}
.container {
  border-radius: 9px !important;
}
</style>

<style scoped>
.loading {
  bottom: 0;
  content: "";
  height: 100%;
  left: 0;
  opacity: 0.4;
  position: absolute;
  right: 0;
  top: 0;
  transition-delay: 0.15s;
  width: 100%;
}
</style>
