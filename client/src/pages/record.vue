<template>
  <div>
    <v-container grid-list-lg class="text-xs-center">
      <v-layout justify-center row wrap>
        <v-card width="400" height="400" style="border-radius:100%">
          <v-card-text>
            <v-icon v-if="isRecording" @click="stopRecording" size="300">mdi-trash-can</v-icon>
            <v-icon v-else @click="startRecording" size="300">mdi-account</v-icon>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="uploadAudio">check</v-btn>
          </v-card-actions>
        </v-card>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isRecording: false,
      audioUrl: "",
      mediaRecorder: undefined
    };
  },
  created() {
    console.clear();
  },
  methods: {
    startRecording() {
      this.isRecording = true;
      console.log("Recording Started...");
      // GET PERMISSION
      navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.start();

        const audioChunks = [];
        this.mediaRecorder.addEventListener("dataavailable", event => {
          audioChunks.push(event.data);
        });

        // Convert the audio data chunks to a single audio data blob
        this.mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(audioChunks);
          // Create a URL for that single audio data blob
          const audioUrl = URL.createObjectURL(audioBlob);
          //  Play the audio
          this.audioUrl = audioUrl;
          this.uploadAudio();
        });
      });
    },
    uploadAudio(audioUrl) {
      console.log("Uploading audio...", this.audioUrl);
      this.$http.post("/upload", {
        audio: this.audioUrl
      });
    },
    playAudio() {
      const audio = new Audio(this.audioUrl);
      audio.play();
    },
    stopRecording() {
      console.log("Recording Stopped...");
      this.mediaRecorder.stop();
      this.isRecording = false;
    }
  },

  mounted() {}
};
</script>
