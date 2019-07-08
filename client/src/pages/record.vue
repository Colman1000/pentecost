<template>
  <div @keydown.space="done">
    <v-container grid-list-lg class="text-xs-center">
      <v-layout justify-center row wrap>
        <v-card width="400" height="400" style="border-radius:100%">
          <v-progress-linear v-if="isUploading" class="ma-0 pa-0" indeterminate></v-progress-linear>
          <v-card-text>
            <v-icon v-if="isRecording" @click="stopRecording" color="red" size="300">mdi-record-rec</v-icon>
            <!-- While is not recording.. start recording -->
            <v-icon v-else @click="startRecording" color="primary" size="300">mdi-microphone</v-icon>
          </v-card-text>
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
      audioUrl: undefined,
      audioBlob: undefined,
      mediaRecorder: undefined,
      uploadUri: "//localhost:1337/api/v1/audio/upload",
      isUploading: false
    };
  },
  computed: {},
  created() {
    console.clear();
  },
  methods: {
    done(e) {
      console.log(`Am Done(): ${e}`);
    },
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
          this.audioBlob = audioBlob;
          this.audioUrl = audioUrl;
          this.uploadAudio();
        });
      });
    },
    /**
     * Upload Audio
     */
    uploadAudio(audioUrl) {
      this.isUploading = true;
      const data = new FormData();
      data.append("audio", this.audioBlob, `rotciv.mp3`);
      const headers = [];
      headers[
        "Content-Type"
      ] = `multipart/form-data; boundary=${data._boundary}`;
      this.$http
        .post(this.uploadUri, data, { headers: headers })
        .then(resp => {
          console.log(resp);
        })
        .catch(e => console.log(e));

      console.log("Uploading audio...", this.audioUrl);
      this.$http
        .post(this.uploadUri, {
          audio: this.audioUrl
        })
        .then(({ data }) => {
          this.isUploading = false;
        });
    }, // </uploadAudio>

    playAudio() {
      const audio = new Audio(this.audioUrl);
      audio.play();
    }, // </playAudio>

    stopRecording() {
      console.log("Recording Stopped...");
      this.mediaRecorder.stop();
      this.isRecording = false;
    } // <stopRecording>
  },

  mounted() {}
};
</script>
