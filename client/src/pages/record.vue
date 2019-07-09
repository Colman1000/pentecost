<template>
  <div @keydown.native="done">
    <v-container grid-list-lg class="text-xs-center">
      <v-layout justify-center row wrap>
        <div style class="elevation-5 inn">
          <v-progress-linear v-if="isUploading" class="ma-0 pa-0" indeterminate></v-progress-linear>

          <div @click="stopRecording" v-if="isRecording" class="animIcon red white--text">
            <v-btn class="recIcon" color="error" fab icon>
              <v-icon size="200" color="white">mdi-record-rec</v-icon>
            </v-btn>
            <!-- /* trying to use v-icon good, expect a big bug on your way make sure you kill it*/ -->
            <div v-for="i in 6" :key="i" :class="`recording-btn${i}`"></div>
          </div>
          <!-- While is not recording.. start recording -->
          <v-icon v-else @click="startRecording" color="primary" size="300">mdi-microphone</v-icon>
          <!-- </v-card-text> -->
        </div>
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
      maxTime: 15000,
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
        setTimeout(z => {
          this.stopRecording();
        }, this.maxTime);
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
      this.$axios
        .post(this.uploadUri, data, { headers: headers })
        .then(resp => {
          this.isUploading = false;
        })
        .catch(e => console.log(e));

      console.log("Uploading audio...", this.audioUrl);
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


<style lang="scss">
/**
* @author { EmmaJnrk }
* @license All rights Resevered
**/
$bordered: 300px;
$pos: 50%;
$neg_pos: -50%;

.animIcon {
  position: relative;
  /* position: absolute; */
  top: 50%;
  left: 50%;
  height: 300px;
  width: 300px;
  justify-content: center;
  align-items: center;
  transform: translate(-50%, -50%);
  align-content: center;
  border-radius: 100%;
}
.recIcon {
  position: fixed;
  top: 0;
  left: 0;
  margin: 0px;
  width: 300px;
  height: 300px;
  z-index: 1000;
  &:hover {
    position: fixed;
    left: 0px;
    z-index: 1000;
  }
  &:focus {
    position: fixed;
    left: 0px;
    z-index: 1000;
  }
}
.inn {
  border-radius: 10px;
  width: 400px;
  height: 400px;
  position: relative;
}
@for $i from 1 through 6 {
  .recording-btn#{$i} {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 100%;
    height: 1000px;
    width: 1000px;
    animation: iconAnimStart
      #{$i}s
      infinite
      alternate
      cubic-bezier(0.68, 0.05, 0.36, 4.5);

    // cubic-bezier(0.68, -0.55, 0.27, 11.55); // width: 2em * $i;
  }
}
@keyframes iconAnimStart {
  from {
    height: 300px;
    width: 300px;
    background: radial-gradient(#fceae9, var(--v-warning-base));
  }

  to {
    height: 340px;
    width: 340px;
    background: radial-gradient(#fceae996, var(--v-error-lighten4));
    /* background-color: red; */
  }
}
</style>
