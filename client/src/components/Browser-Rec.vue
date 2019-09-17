<template>
  <div>
    <v-container grid-list-lg class="text-center">
      <v-layout justify-center row wrap>
        <div style class="elevation-5 inn">
          <v-progress-linear v-if="speaking" class="ma-0 pa-0" indeterminate></v-progress-linear>
          <div v-if="toggle" @click.stop="endSpeechRecognition()" class="animIcon red white--text">
            <v-btn class="recIcon" color="error" fab icon>
              <v-icon size="200" color="white">mdi-power-off</v-icon>
            </v-btn>
            <!-- /* trying to use v-icon good, expect a big bug on your way make sure you kill it*/ -->
            <div v-for="i in 6" :key="i" :class="speaking ? `recording-btn${i}`: `not`"></div>
          </div>
          <!-- While is not recording.. start recording -->
          <v-icon v-else @click.stop="startSpeechRecognition()" color="primary" size="300">mdi-power</v-icon>
          <!-- </v-card-text> -->
        </div>
        <v-flex xs12>
          Sentences: {{ sentences }}
          <br />
          <!-- Error: {{ error }}
          <br />-->
          <br />
          RuntimeTranscription: {{ runtimeTranscription }}
        </v-flex>

        <v-flex xs5 md4>
          <v-select
            @change="changeInputLnaguage($event)"
            solo
            :items="languages"
            label="Select input language"
          ></v-select>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
let SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();
export default {
  props: {
    languages: {
      type: Array
    },
    text: {
      type: [String, null],
      required: true
    }
  },
  data() {
    return {
      lang: "en-NG",
      isSpeaking: true,
      isUploading: false,
      error: false,
      speaking: false,
      toggle: false,
      runtimeTranscription: "",
      sentences: []
    };
  },
  methods: {
    changeInputLnaguage(e) {
      this.lang = e;
      console.log("Lnaguaged changed to: ", e);
    },
    checkCompatibility() {
      if (!recognition) {
        this.error =
          "Speech Recognition is not available on this browser. Please use Chrome or Firefox";
      }
    },
    startSpeechRecognition() {
      this.toggle = false;

      if (!recognition) {
        this.error =
          "Speech Recognition is not available on this browser. Please use Chrome or Firefox";
        return false;
      }
      this.toggle = true;
      recognition.lang = this.lang;
      recognition.interimResults = true;
      // recognition.continuous = true;

      recognition.addEventListener("onstart", event => {
        console.log("Speaking using current language: ", this.lang);
        this.speaking = true;
      });

      recognition.addEventListener("onend", event => {
        this.speaking = false;
      });

      recognition.addEventListener("result", event => {
        const text = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join("");
        this.runtimeTranscription = text;
      });

      recognition.addEventListener("end", () => {
        if (this.runtimeTranscription !== "") {
          this.sentences.push(
            this.capitalizeFirstLetter(this.runtimeTranscription)
          );
          this.$emit(
            "update:text",
            `${this.text}${this.sentences.slice(-1)[0]}. `
          );
          // this.endSpeechRecognition();
        }
        this.runtimeTranscription = "";
        recognition.stop();
        if (this.toggle) {
          // keep it going.
          recognition.start();
        }
      });
      recognition.start();
    },
    endSpeechRecognition() {
      // recognition.stop();
      this.toggle = false;
      this.$emit("speechend", {
        sentences: this.sentences,
        text: this.sentences.join(". ")
      });
      console.log(this.text);
      this.$io.post(
        "/audio/upload-text/?rawText=" + this.sentences.slice(-1)[0],
        data => {
          console.log(data);
        }
      );
    },

    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  },
  mounted() {
    recognition.stop();
    console.log(this.languages.length);
    this.checkCompatibility();
  }
};
</script>



<style lang="scss">
/**
* @author { EmmaJnrk }
* - converted to scss by Navicstein Rotciv
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
    background: radial-gradient(#fceae996, var(--v-error-lighten5));
    /* background-color: red; */
  }
}
</style>
