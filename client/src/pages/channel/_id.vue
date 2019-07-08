<template>
  <div>
    <v-container justify-center>
      <h3 class="headline">Hello World</h3>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    let $id = this.$route.params.id;
    this.$axios.get("/channel/" + $id);
  }
};
</script>
