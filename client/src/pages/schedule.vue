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
        </v-row>
        <v-row>
            <v-col cols="5" offset="6">
                <div class="text-right float-right">
                    <v-btn text color="primary" @click="addNote">
                        <v-icon left>mdi-plus</v-icon>
                        Add To Meditations
                    </v-btn>
                </div>
            </v-col>
        </v-row>
        <v-row  v-if="notes.length > 0">
            <v-col cols="12">
                <v-simple-table fixed-header style="min-width: 80%">
                    <thead>
                    <tr>
                        <th class="text-left">S/N</th>
                        <th class="text-left">Note</th>
                        <th class="text-left">Operations</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, i) in notes" :key="item.note" class="beautify">
                        <td>{{ i + 1  }}</td>
                        <td>{{ item }}</td>
                        <td>
                            <v-btn text color="primary" style="display: inline;" @click="editNote(i)">
                                <v-icon>mdi-pen</v-icon>
                            </v-btn>
                            &nbsp;
                            <v-btn text color="error" style="display: inline;" @click="deleteNote(i)">
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                        </td>
                    </tr>
                    </tbody>
                </v-simple-table>
            </v-col>
            <v-col cols="2" offset="10" class="mb-5">
                <v-btn :loading="publishing" color="primary" @click="publish">
                    <v-icon left>mdi-cloud</v-icon>
                    Publish
                </v-btn>
            </v-col>
        </v-row>

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
                time: null,
                note: '',
                errMsg: '',
                showTimePicker: false,
                snackbar: false,
                notes: [],
                publishing: false
            }
        },
        methods: {
            addNote(){
                if(!this.note) {
                    this.errMsg = "You can not add an empty note!";
                    this.snackbar = true;
                    window.setTimeout(()=>{
                        this.snackbar = false;
                        this.errMsg = '';
                    }, 3000);
                    return;
                }
                this.notes.push(this.note);
                this.note = '';
            },
            editNote(index){
                const _notes = this.notes;
                this.note = _notes.splice(index, 1)[0];
                this.notes = _notes
            },
            deleteNote(index){
                const _notes = this.notes;
                _notes.splice(index, 1);
                this.notes = _notes;
            },
            publish(){
                const that = this;
                if(that.note) return that.addNote();
                if(!that.time) {
                    that.errMsg = "Please choose a time interval!";
                    that.snackbar = true;
                    window.setTimeout(()=>{
                        that.snackbar = false;
                        that.errMsg = '';
                    }, 3000);
                    return;
                }
                if(that.publishing) return;

                //TODO: SEND DETAILS TO SERVER
                that.publishing = true;
                console.log(that.notes);
                window.setTimeout(()=>{
                    that.publishing = false;
                    that.notes = [];
                    that.time = 1;
                }, 1500)
            },
            trunc(w, characters = 60){
                if(!w || typeof w !== 'string') return '';
                return w.length < characters?
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