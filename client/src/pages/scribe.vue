<template>
  <div>
    <Speech :gender="gender" :languages="langs"></Speech>
  </div>
</template>

<script>
import { languages, gender } from "@/assets/speech.js";
import Speech from "@/components/Cont";

export default {
  components: {
    Speech
  },
  data() {
    return {
      langs: languages,
      gender: gender
    };
  }
};
</script>
