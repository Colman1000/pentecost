<template>
    <v-container>
        <v-row class="mb-0">
            <v-col cols="12">
                <div class="text-center grey--text">
                    <div class="display-2">Songs Uploader</div>
                </div>
            </v-col>
        </v-row>
        <v-row class="mb-3">
            <v-col cols="6">
                <div class="text-left">
                    <blockquote class="body-2 font-weight-medium">
                        Upload songs here for mobile app users
                    </blockquote>
                </div>
            </v-col>
        </v-row>

        <v-row>
            <!--            UPLOADER-->
            <v-col cols="5" offset="1">
                <v-file-input accept="audio/*" dense label="Select Song" show-size v-model="song"></v-file-input>
            </v-col>
            <v-col cols="6">
                <v-btn :loading="isUploadingSong" @click="upload" class="float-right" primary text>
                    <v-icon left>mdi-upload-outline</v-icon>
                    &nbsp; {{uploadText}}
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="10" offset="1">
                <v-divider></v-divider>
            </v-col>
        </v-row>

        <v-row v-if="isGettingSongs">
            <v-col class="my-5" cols="10" offset="1">
                <v-progress-linear indeterminate striped></v-progress-linear>
            </v-col>
        </v-row>

        <v-row v-if="songs.length > 0">
            <v-col cols="12">
                <div class="body-1 grey--text text-center pa-4">Uploaded Songs</div>
                <v-simple-table>
                    <template v-slot:default>
                        <tbody>
                        <tr :key="song.id" v-for="song in songs">
                            <td>
                                {{song.label.toUpperCase()}}
                            </td>
                            <td>
                                <v-icon @click="removeSong(song.label)" class="float-right red--text">
                                    {{songToDelete === song.label ? 'mdi-loading mdi-spin' : 'mdi-close'}}
                                </v-icon>
                            </td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-col>
        </v-row>


        <v-snackbar color="error" v-model="snackbar">
            {{errMsg}}
            <v-btn @click="snackbar = false" dark text>
                OK
            </v-btn>
        </v-snackbar>
    </v-container>
</template>

<script>

    import AWS from 'aws-sdk';

    AWS.config.region = 'us-east-2'; // Region
    AWS.config.credentials = new AWS.Credentials({
        accessKeyId: 'AKIAZJ6PUW6YWUE56CRR', secretAccessKey: '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'
    });
    const AWS_Bucket = 'emmanuel.songs';
    const bucket = new AWS.S3({
        params: {
            Bucket: AWS_Bucket
        }
    });

    export default {
        layout: 'default',
        data() {
            return {
                uploadText: 'Upload',
                isGettingSongs: false,
                isUploadingSong: false,
                isDeletingSong: false,
                songToDelete: '',
                note: '',
                errMsg: '',
                showTimePicker: false,
                snackbar: false,
                songs: [],
                song: null
            }
        },
        mounted() {
            this.getSongsList();
        },
        methods: {
            routeTo($page = "") {
                if (!$page || this.currentRoute === $page.toLowerCase()) return;
                return this.$router.push(`${$page}`);
            },
            upload() {
                const that = this;
                const song = that.song;
                if (!song) {
                    that.errMsg = "You can not upload an empty song!";
                    that.snackbar = true;
                    window.setTimeout(() => {
                        that.snackbar = false;
                        that.errMsg = '';
                    }, 3000);
                    return;
                }

                that.isUploadingSong = true;

                let params = {
                    Bucket: AWS_Bucket,
                    Key: song.name,
                    Body: song,
                    ACL: "public-read"
                };

                return bucket.upload(params, function (err, data) {
                    that.isUploadingSong = false;
                    if (err) {
                        console.log(err);
                        that.errMsg = "An error occurred while uploading..!";
                        that.snackbar = true;
                        window.setTimeout(() => {
                            that.snackbar = false;
                            that.errMsg = '';
                        }, 6000);
                        return;
                    }
                    that.uploadText = 'Success';
                    window.setTimeout(() => {
                        that.uploadText = 'Upload';
                    }, 3000);
                    that.postData('index', {title: data.Key, src: data.Location});
                    that.song = null;
                    that.getSongsList();
                })
            },
            getSongsList() {
                const that = this;
                that.isGettingSongs = true;
                var params = {
                    Bucket: AWS_Bucket,
                };
                bucket.listObjects(params, function (err, data) {
                    that.isGettingSongs = false;
                    if (err) return console.log(err, err.stack); //
                    that.songs = data.Contents.map(e => ({
                        label: e.Key,
                        id: e.ETag,
                        src: e.Owner
                    }));
                });
            },
            removeSong(key) {
                if (!key) return;
                const that = this;
                that.isDeletingSong = true;
                that.songToDelete = key;
                const params = {
                    Bucket: AWS_Bucket,
                    Key: key,
                };
                bucket.deleteObject(params, function (err) {
                    that.isDeletingSong = false;
                    that.songToDelete = '';

                    if (err) {
                        that.errMsg = `Error while deleting ${key}!`;
                        that.snackbar = true;
                        window.setTimeout(() => {
                            that.snackbar = false;
                            that.errMsg = '';
                        }, 3000);
                        console.log(err, err.stack);
                        return;
                    } // an error occurred


                    that.postData('delete', {title: key});
                    that.getSongsList();     // successful response
                });
            },
            async postData(url = '', data = {}) {
                return await fetch(
                    `http://emmanuel-meditation.us-east-2.elasticbeanstalk.com/songs/${url}.php`,
                    {
                        method: 'POST',
                        mode: 'cors', // no-cors, *cors, same-origin
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        redirect: 'follow', // manual, *follow, error
                        referrerPolicy: 'no-referrer', // no-referrer, *client
                        body: JSON.stringify(data) // body data type must match "Content-Type" header
                    });
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