<template>
  <div>
    <Speech :languages="langs"></Speech>
  </div>
</template>

<script>
import languages from "@/assets/languages.js";
import Speech from "@/components/Cont";

export default {
  components: {
    Speech
  },
  data() {
    return {
      langs: languages
    };
  }
};
</script>
