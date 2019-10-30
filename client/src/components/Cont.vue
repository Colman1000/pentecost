<template>
    <v-container class="text-center">
        <v-dialog fullscreen tile v-model="overlay">
            <v-card class="justify-center text-center">
                <v-container fill-height>
                    <v-layout align-center justify-center row>
                        <v-card-text>
                            <v-icon size="70">mdi-voice</v-icon>
                            <br/>
                            <h4 class="mt-4 mb-2 headline">
                                <span class="primary--text">Good morning scribe of heaven!</span>
                                <br/>Pentecost uses artificial intelligence so it is still learning.
                                <br/>For best results, here are a few things to note:
                            </h4>
                        </v-card-text>
                        <v-card-text>
                            <ol class="text-left">
                                <li
                                        class="subtitle-1"
                                >The better the internet connection, the faster and smoother translations would be.
                                </li>

                                <li
                                        class="subtitle-1"
                                >Select the your preferred language dialect, for Engilish, English(United States) is
                                    recommended.
                                </li>
                                <li
                                        class="subtitle-1"
                                >Always confirm that the sensitivity or gain of your microphone isn't too high or low.
                                    This can affect the quality of the your speech and may create inaccurate
                                    translation. So always check and see that your mic sensitivity or gain is properly
                                    set before begining Pentecost. You can adjust your microphone sensitivity in your PC
                                    settings.
                                </li>
                                <li
                                        class="subtitle-1"
                                >Pentecost performs better when you speak in short single sentences. Pause for few
                                    seconds for your sentence to be processed and sent before making another sentence.
                                </li>

                                <li
                                        class="subtitle-1"
                                >PENTECOST will understand the context of your sentence and translate better if you
                                    clearly explain your sentence. e.g Rather than saying "keep your medicines until the
                                    doctor comes" Say "The doctor wants you to wait for him to return before taking your
                                    medicines"
                                </li>
                            </ol>
                        </v-card-text>
                        <v-card-text class="mt-10">
                            <v-btn @click="hideIntro" block color="primary">I Understand</v-btn>
                        </v-card-text>
                    </v-layout>
                </v-container>
            </v-card>
        </v-dialog>

        <!-- Alerts -->
        <v-snackbar :timeout="0" multi-line top v-model="chromeSnack">
            Please swith to &nbsp;
            <span class="font-weight-bold">Google Chrome</span> &nbsp; for a better experience!
            <v-btn @click="chromeSnack = false" color="red" text>Close</v-btn>
        </v-snackbar>

        <v-snackbar
                bottom
                color="info"
                multi-line
                right
                style="z-index: 20!important;"
                v-model="showInstruction"
        >
            <v-icon>mdi-information</v-icon>
            {{instruction}}
        </v-snackbar>

        <v-snackbar
                :timeout="0"
                bottom
                color="warning"
                multi-line
                v-model="showMicNoiseWarning"
                z-index="-50"
        >
            <span class="font-weight-bold">Try to reduce the Microphone noise</span>
        </v-snackbar>
        <!-- Alerts -->

        <v-alert type="error" v-if="error">{{ instruction }}</v-alert>
        <v-container fill-height grid-list-md>
            <v-layout align-center justify-center row wrap>
                <v-flex class="text-center" md4 sm5 xs12>
                    <div @keyup.space="isActive = !isActive">
                        <v-icon
                                @click="isActive = !isActive"
                                class="ma-0 mt-3 pa-5 tap-btn pulsate"
                                size="70"
                                v-if="!isActive"
                        >mdi-lightbulb-outline
                        </v-icon>
                        <v-icon
                                @click="isActive = !isActive"
                                class="ma-0 mt-3 pa-5 pulsate-recording"
                                color="primary"
                                size="70"
                                v-else
                        >mdi-lightbulb-on
                        </v-icon>
                        <br/>
                        <small
                                class="mt-5"
                                style="color: rgba(147, 170, 191, 0.88) ;"
                                v-if="!isActive"
                        >Tap to begin Pentecost
                        </small>
                        <small class v-else>&nbsp;</small>
                    </div>
                    <br/>
                    <v-progress-linear :color="color" :value="volume" rounded v-if="isActive"></v-progress-linear>
                    <v-textarea :placeholder="fakeInterim" class="transTextArea" flat rows="4" solo></v-textarea>
                    <v-progress-linear
                            :value="confirmTimeoutValue"
                            class="confirmInterval"
                            rounded
                            v-if="canEcsape"
                    ></v-progress-linear>
                    <transition name="fade">
                        <div class="grey--text styled zoomIn beautify">{{ said }}</div>
                    </transition>
                    <v-select
                            :items="languages"
                            @change="changeLanguage($event)"
                            class="mt-5 mb-2"
                            label="Select language"
                            outlined
                    ></v-select>

                    <v-select
                            :items="gender"
                            @change="changeGender($event)"
                            class="mb-2"
                            label="Voice Output"
                            outlined
                            v-if="gender"
                    ></v-select>
                </v-flex>
            </v-layout>
        </v-container>
    </v-container>
</template>

<script>
    const isChrome =
        /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    const threshold = {
        xtreme: 85,
        loud: 70,
        normal: 15,
        inative: 25
    };
    var SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();

    let showIntro = true;
    let confirmTimeoutHandle;
    let decrementTimeoutHandle;
    const storage = window.sessionStorage;

    // Export for window
    window.recognition = recognition;
    export default {
        props: {
            languages: {
                type: Array,
                required: false
            },
            gender: {
                type: Array,
                required: false
            }
        },
        data() {
            return {
                isActive: false,
                instruction: "",
                said: "",
                lang: "en-NG",
                fakeInterim: "",
                error: false,
                overlay: false,
                chromeSnack: !isChrome,
                volume: 0,
                confirmTimeout: 2000,
                confirmTimeoutValue: 100,
                fakeIt: false,
                canEcsape: false,
                adverbs: [
                    "!#Dg",
                    "s",
                    "R4",
                    "$",
                    "*(#@!",
                    "%%3=",
                    "^TC?",
                    "&R",
                    "*",
                    " ",
                    "#%9E",
                    " ",
                    "(GTU",
                    ")R",
                    "",
                    "H9]",
                    ";w]"
                ]
            };
        },
        watch: {
            // Watch for said words and do something to them..
            said(word) {
                // i can run some codes here with out bottering the API
                // ███████╗ ██████╗  ██████╗██╗  ██╗███████╗████████╗
                // ██╔════╝██╔═══██╗██╔════╝██║ ██╔╝██╔════╝╚══██╔══╝
                // ███████╗██║   ██║██║     █████╔╝ █████╗     ██║
                // ╚════██║██║   ██║██║     ██╔═██╗ ██╔══╝     ██║
                // ███████║╚██████╔╝╚██████╗██║  ██╗███████╗   ██║
                // ╚══════╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝╚══════╝   ╚═╝
                let wo = word.charAt(0).toUpperCase() + word.slice(1) + ".";
                this.$io.post(
                    `/audio/upload-text/`,
                    {
                        lang: this.lang,
                        text: wo
                    },
                    data => {
                        console.log(`Sent: ${data}`);
                    }
                );
            },
            // Toggle state of pentecost
            isActive(bool) {
                if (bool && "recognition" in window) {
                    recognition.lang = this.lang;
                    recognition.continuous = true;
                    recognition.interimResults = !false;
                    recognition.maxAlternatives = 1;
                    recognition.start();
                } else {
                    recognition.stop();
                }
            }
        },
        computed: {
            color() {
                return this.volume > threshold.xtreme
                    ? "error"
                    : this.volume > threshold.loud
                        ? "warning"
                        : this.volume > threshold.normal
                            ? "info"
                            : "#aaa";
            },
            showInstruction() {
                return !!this.instruction && !this.error;
            },
            showMicNoiseWarning() {
                if (this.overlay) return false;
                return !this.isActive && this.volume > threshold.inative;
            },
            listen() {
                return this.route === "scribe";
            }
        },
        beforeMount() {
            if (storage && storage.getItem("shownIntroAlready")) {
                showIntro = false;
            }
        },
        mounted() {
            var that = this,
                noteContent = "";

            window.onkeydown = function (e) {
                e && e.preventDefault && e.preventDefault();
                if (e && e.code === "Space") {
                    that.isActive = !that.isActive;
                    return;
                }
                if (e && e.code === "Escape" && that.canEcsape) {
                    clearTimeout(confirmTimeoutHandle);
                    that.canEcsape = false;
                    that.fakeIt = false;
                    that.confirmTimeoutValue = 100;
                    that.fakeInterim = "";
                }
            };

            recognition.onstart = function () {
                that.error = false;
                that.instruction =
                    "Voice recognition activated. Try speaking into the microphone.";
            };

            recognition.onspeechend = function (b) {
                that.instruction = "You were quiet for a while so pentecost fell asleep.";
                that.isActive = false;
            };

            recognition.onerror = function (event) {
                if (event.error == "no-speech") {
                    that.instruction = "No speech was detected. Try again.";
                } else if (event.error == "not-allowed") {
                    that.instruction =
                        "Somehow pentecost was not allowed to use speech model, are you on a proxy?";
                } else {
                    that.instruction =
                        "Inconsitency violation: Somehow pentecost encountered an error and was not able to handle it automatically!";
                }
                that.error = true;
            };

            recognition.onresult = function (event) {
                // event is a SpeechRecognitionEvent object.
                // It holds all the lines we have captured so far.
                // We only need the current one.
                var current = event.resultIndex;

                if (!event.results[current].isFinal) {
                    // const adLen = that.adverbs.length,
                    //   random = Math.floor(Math.random() * 5);
                    // let concat = "";
                    // for (let i = 0; i < random; i++) {
                    //   concat += that.adverbs[Math.floor(Math.random() * adLen)];
                    // }
                    // that.fakeInterim = `${that.fakeInterim}${concat}`;

                    that.fakeInterim = "...";
                    return;
                }

                const transcript = event.results[current][0].transcript;
                // Add the current transcript to the contents of our Note.
                var mobileRepeatBug =
                    current == 1 && transcript == event.results[0][0].transcript;

                that.fakeInterim = transcript;

                // const _dec = parseInt(that.confirmTimeout / 5);
                that.canEcsape = false;

                // decrementTimeoutHandle = setTimeout(
                //     () => that.decrementTimeout(_dec),
                //     _dec
                // );

                that.propagate(transcript)

                // confirmTimeoutHandle = setTimeout(
                //     () => that.propagate(transcript),
                //     that.confirmTimeout
                // );

                // if (!mobileRepeatBug) {
                //   noteContent += transcript;
                //   that.said = transcript;

                //   that.fakeInterim = "";
                //   that.fakeIt = false;
                // }
            };
            // CUSTOM CODE =>>>
            window.highest = 0;
            navigator.mediaDevices
                .getUserMedia({
                    audio: true
                })
                .then(
                    stream => {
                        // Handle the incoming audio stream
                        // const bars = []; // We'll use this later
                        const audioContext = new AudioContext();
                        const input = audioContext.createMediaStreamSource(stream);
                        const analyser = audioContext.createAnalyser();
                        const scriptProcessor = audioContext.createScriptProcessor();
                        const processInput = audioProcessingEvent => {
                            if (this.$store.state.route !== "scribe") {
                                return;
                            }

                            const tempArray = new Uint8Array(analyser.frequencyBinCount);
                            analyser.getByteFrequencyData(tempArray);
                            const vol = getAverageVolume(tempArray);
                            that.volume = vol * 3;
                            if (vol > window.highest) {
                                window.highest = vol;
                                // console.info("Loudest is ", vol);
                            }
                            // bars.push(vol);
                            // We'll create this later
                            // console.log(bars);
                        };

                        const getAverageVolume = array => {
                            const length = array.length;
                            let values = 0;
                            let i = 0;

                            for (; i < length; i++) {
                                values += array[i];
                            }
                            return Math.round(values / length);
                        };

                        // Some analyser setup
                        analyser.smoothingTimeConstant = 0.3;
                        analyser.fftSize = 1024;

                        input.connect(analyser);
                        analyser.connect(scriptProcessor);
                        scriptProcessor.connect(audioContext.destination);
                        scriptProcessor.onaudioprocess = processInput;
                    },
                    error => {
                        // Something went wrong, or the browser does not support getUserMedia
                        console.warn("we messed up sir");
                    }
                );
        },
        methods: {
            changeGender(e) {
                this.$io.post(
                    "/channel/change-ssml-gender",
                    {
                        gender: e
                    },
                    done => {
                        console.log("Changed  voice output to: " + done);
                    }
                );
            },
            changeLanguage(e) {
                this.lang = e;
            },
            stop() {
                recognition.stop();
            },
            start() {
                recognition && "recognition" in window ? recognition.start() : null;
            },
            hideIntro() {
                this.overlay = false;
                if (storage) storage.setItem("shownIntroAlready", true);
            },
            propagate(transcript) {
                clearTimeout(confirmTimeoutHandle);
                this.said = transcript;
                this.canEcsape = false;
                this.confirmTimeoutValue = 100;
                this.fakeIt = false;
                this.fakeInterim = false;
            },
            decrementTimeout(_dec) {
                if (!this.canEcsape) return;

                const that = this;

                that.confirmTimeoutValue = that.confirmTimeoutValue - 20;
                console.log("Reduced to ", that.confirmTimeoutValue);

                if (that.confirmTimeoutValue > 0) {
                    decrementTimeoutHandle = setTimeout(
                        () => that.decrementTimeout(_dec),
                        _dec
                    );
                } else {
                    clearTimeout(decrementTimeoutHandle);
                    that.confirmTimeoutValue = 0;
                }
            }
        }
    };
</script>

<style>
    .v-snack--bottom {
        z-index: 20;
        bottom: 6vh;
    }

    .transTextArea {
        margin-bottom: 0;
        transition: all 200ms linear;
    }

    .transTextArea .v-input__slot {
        border: none;
        border-radius: 10px;
        box-shadow: 0 1px 5px rgba(10, 10, 10, 0.06);
        transition: all 200ms linear;
    }

    .tap-btn {
        color: rgba(147, 170, 191, 0.88) !important;
        transition: all 300ms ease !important;
        border-radius: 100%;
        box-shadow: 0 0 1px rgba(147, 170, 191, 0.09);
    }

    .tap-btn:hover {
        color: #7a8a9a !important;
        box-shadow: 0 0 10px rgba(147, 170, 191, 0.15);
    }

    .pulsate {
        position: relative;
        z-index: 2 !important;
    }

    .pulsate:hover::after {
        position: absolute;
        content: "";
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        border-radius: 100%;
        background-color: rgba(147, 170, 191, 0.4);
        animation: pulse 400ms linear forwards;
        z-index: 0 !important;
    }

    .pulsate-recording {
        position: relative;
        z-index: 2 !important;
    }

    .pulsate-recording::after {
        position: absolute;
        content: "";
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        border-radius: 100%;
        background-color: rgba(147, 170, 191, 0.4);
        animation: pulse 2s linear infinite;
        z-index: 0 !important;
    }

    .confirmInterval {
        margin-top: -20px;
    }

    @keyframes pulse {
        0% {
            transform: scale(0.2);
            opacity: 1;
        }
        50% {
            transform: scale(1);
            opacity: 0;
        }
        100% {
            opacity: 0;
        }
    }

    .styled {
        transition: all 300ms ease;
        margin: 10px 0;
        padding: 20px 0;
        border: 0.5px dotted #dedede;
        border-radius: 20px;
    }

    @-webkit-keyframes zoomIn {
        from {
            opacity: 0;
            -webkit-transform: scale3d(0.3, 0.3, 0.3);
            transform: scale3d(0.3, 0.3, 0.3);
        }

        50% {
            opacity: 1;
        }
    }

    @keyframes zoomIn {
        from {
            opacity: 0;
            -webkit-transform: scale3d(0.3, 0.3, 0.3);
            transform: scale3d(0.3, 0.3, 0.3);
        }

        50% {
            opacity: 1;
        }
    }

    .zoomIn {
        -webkit-animation-name: zoomIn;
        animation-name: zoomIn;
    }

    .beautify {
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        -webkit-animation-duration: 300ms;
        animation-duration: 300ms;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }
</style>
