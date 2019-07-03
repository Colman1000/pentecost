<template>
  <div>
    <v-container grid-list-lg>
      <v-layout justify-center row wrap>
        <v-card>
          <v-card-text>
            <Sampler></Sampler>
          </v-card-text>
          <v-card-text>
            <audio-recorder
              format="wav"
              :upload-url="uploadUri"
              :attempts="600"
              :time=".15"
              :before-recording="recordStarted"
              :pause-recording="callback"
              :after-recording="recordStoped"
              :select-record="callback"
              :before-upload="upload"
              :successful-upload="uploadSuccessfull"
              :failed-upload="callback"
            />
          </v-card-text>
        </v-card>
        <v-snackbar bottom left :color="color" v-model="snackbar">{{ message }}</v-snackbar>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import Sampler from "@/components/Sampler";
export default {
  components: {
    Sampler
  },
  data() {
    return {
      message: "Dummy Message",
      snackbar: false,
      color: "primary",
      uploadUri: "//localhost:1337/api/v1/audio/upload"
    };
  },
  methods: {
    recordStarted() {
      this.snackbar = true;
      this.color = "info";
      this.message = "Recording Started..";
    },
    recordStoped() {
      this.snackbar = true;
      this.color = "warning";
      this.message = "Recording Stoped..";
    },
    uploadFailed() {
      this.snackbar = true;
      this.color = "error";
      this.message = "Upload failed!!";
    },
    uploadSuccessfull() {
      this.snackbar = true;
      this.color = "success";
      this.message = "Upload Successfully";
    },
    upload() {
      this.snackbar = true;
      this.color = "info";
      this.message = "Uploading to server...";
    },
    callback(e) {
      console.log(e);
    }
  }
};
</script>

<style>
.ar {
  box-shadow: none !important;
}
.ar-content {
  width: 100%;
}
</style>
