<template>
  <div>
    <Sampler :text.sync="text" @speechend="speechEnd"></Sampler>
    <!-- <div>{{ sentences }}</div> -->
  </div>
</template>

<script>
import Sampler from "@/components/Browser-Rec";
export default {
  components: { Sampler },
  data() {
    return {
      text: "",
      sentences: null
    };
  },
  methods: {
    speechEnd({ sentences, text }) {
      console.log("text", text);
      console.log("sentences", sentences);
      this.sentences = sentences;
    }
  }
};
</script>
