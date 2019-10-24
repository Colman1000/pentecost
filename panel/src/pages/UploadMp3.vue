<template>
  <q-page padding>
    <div id="waveform"></div>
    <div class="row justify-center">
      <div class="col-6">
        <p
          class="text-center"
        >Upload a song then write the title of the song, this will serve as the title shown on the mobile app</p>
        <!-- content -->
        <q-input filled v-model="songName" type="text" label="Song title" />
        <br />
        <q-uploader
          auto-upload
          field-name="song"
          @uploaded="$router.go()"
          :form-fields="[{name: 'title', value: songName}]"
          :url="$audioUrl"
          color="primary"
          flat
          bordered
          style="width: 100%"
        />
        <br />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      songName: ""
    };
  },
};
</script>
