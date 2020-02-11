<template>
    <v-container>
        <v-row class="mb-0">
            <v-col cols="12">
                <div class="text-center grey--text">
                    <div class="display-2">Meditation Scheduler</div>
                    <small class="caption">Set up scheduled notes everyday for users to meditate on</small>
                </div>
            </v-col>
        </v-row>
        <v-row class="mb-3">
            <v-col cols="12">
                <div class="text-left">
                    <blockquote class="body-2 font-weight-medium">
                        <code>Joshua 1:8 (NIV) </code> &nbsp; <br/>
                        Keep this Book of the Law always on your lips;
                        meditate on it day and night, so that you may be careful to do everything written in it.
                        Then you will be prosperous and successful.
                    </blockquote>
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="10" offset="1">
                <v-divider></v-divider>
            </v-col>
        </v-row>
        <v-row class="mb-3">
            <v-col cols="10" offset="1">
                <v-textarea
                        autofocus
                        clearable
                        label="Meditation Note"
                        outlined
                        rows="1"
                        v-model="note"
                ></v-textarea>
            </v-col>
            <v-col class="mb-5" cols="2" offset="10">
                <v-btn :loading="isUploadingNote" @click="dialog = true" color="primary" text>
                    <v-icon left>mdi-plus</v-icon>
                    Publish
                </v-btn>
            </v-col>
        </v-row>
        <v-row v-if="isGettingNotes">
            <v-col class="my-5" cols="10" offset="1">
                <v-progress-linear indeterminate striped></v-progress-linear>
            </v-col>
        </v-row>
        <v-row class="mb-10" v-if="notes.length > 0">
            <v-col cols="12">
                <v-simple-table fixed-header style="min-width: 80%">
                    <thead>
                    <tr>
                        <th class="text-left">ID</th>
                        <th class="text-left">Note</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, i) in notes" :key="item.note" class="beautify">
                        <td>{{ i + 1 }}</td>
                        <td>{{ item }}</td>
                    </tr>
                    </tbody>
                </v-simple-table>
            </v-col>
        </v-row>

        <v-dialog
                max-width="290"
                v-model="dialog"
        >
            <v-card>
                <v-card-title class="headline">Are you sure?</v-card-title>

                <v-card-text>
                    Published meditations can not be deleted
                </v-card-text>

                <v-card-actions>

                    <v-btn @click="dialog = false" color="red darken-1" text>
                        Cancel
                    </v-btn>

                    <v-spacer></v-spacer>


                    <v-btn @click="addNote" color="green darken-1" text>
                        Publish
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-snackbar v-model="snackbar" color="error">
            {{errMsg}}
            <v-btn @click="snackbar = false" text dark>
                OK
            </v-btn>
        </v-snackbar>
    </v-container>
</template>

<script>
    export default {
        layout: 'default',
        data() {
            return {
                isGettingNotes: false,
                isUploadingNote: false,
                dialog: false,
                note: '',
                errMsg: '',
                showTimePicker: false,
                snackbar: false,
                notes: [],
                publishing: false
            }
        },
        mounted() {
            this.fetAllNotes();
        },
        methods: {
            async addNote() {
                this.dialog = false;
                if (this.isUploadingNote) return;
                if (!this.note) {
                    this.errMsg = "You can not add an empty note!";
                    this.snackbar = true;
                    window.setTimeout(() => {
                        this.snackbar = false;
                        this.errMsg = '';
                    }, 3000);
                    return;
                }
                this.isUploadingNote = true;
                await this.publish();
                this.isUploadingNote = false;
                this.note = '';
                this.uploadText = 'Success';
                window.setTimeout(() => {
                    this.uploadText = 'Publish';
                }, 3000);
                this.fetAllNotes();
            },
            async fetAllNotes() {
                const that = this;
                if (that.isGettingNotes) return;

                that.isGettingNotes = true;
                const notes = await fetch(
                    `http://emmanuel-meditation.us-east-2.elasticbeanstalk.com/meditation/index.php`, {
                        method: 'POST',
                        mode: 'cors', // no-cors, *cors, same-origin
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        redirect: 'follow', // manual, *follow, error
                        referrerPolicy: 'no-referrer', // no-referrer, *client
                        body: JSON.stringify({time: 0, lang: 'en'}) // body data type must match "Content-Type" header
                    });

                const res = await notes.json();

                that.notes = res.data;

                console.log(res);

                that.isGettingNotes = false;
            },
            async publish() {
                const that = this;
                return await fetch(
                    `http://emmanuel-meditation.us-east-2.elasticbeanstalk.com/meditation/add.php`,
                    {
                        method: 'POST',
                        mode: 'cors', // no-cors, *cors, same-origin
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        redirect: 'follow', // manual, *follow, error
                        referrerPolicy: 'no-referrer', // no-referrer, *client
                        body: JSON.stringify({text: that.note}) // body data type must match "Content-Type" header
                    });
            },
            trunc(w, characters = 60) {
                if (!w || typeof w !== 'string') return '';
                return w.length < characters ?
                    w :
                    w.substr(0, characters - 3) + '...';
            }
        }
    }
</script>

<style scoped>
    .beautify {
        animation-duration: 250ms;
        animation-fill-mode: both;
        animation-name: fade;
    }

    @keyframes fade {
        from {
            opacity: 0;
            transform: translate3d(0, -100%, 0);
        }
        to {
            opacity: 1;
            transform: none;
        }
    }
</style>