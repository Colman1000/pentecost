<template>
  <v-footer absolute class="font-weight-light">
    <v-flex text-center xs12>
      <strong>EaseCore Limited RC 1600900 &copy;</strong>
      {{ new Date().getFullYear() }} —
      <br />
      <img class="mt-2" :src="require(`@/assets/attribution/greyscale-regular@2x.svg`)" />
    </v-flex>
  </v-footer>
</template>