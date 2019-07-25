<template>
  <div>
    <v-progress-linear
      v-if="_loading"
      height="6"
      indeterminate
      color="primary"
      background-color="secondary"
    ></v-progress-linear>
    <v-container justify-center align-center class="pa-0">
      <router-view></router-view>
    </v-container>
  </div>
</template>