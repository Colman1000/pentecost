<template>
  <div>
    <v-container grvalue-list-md>
      <v-layout justify-center row wrap>
        <v-card width="1000" height="550">
          <v-card-text>
            <h3 class="text-center pt-5 headline">No sermon at the moment</h3>
          </v-card-text>
        </v-card>

        <v-flex xs6 class="mt-3">
          <v-select
            @change="setPreferedLanguage($event)"
            :items="languages"
            solo
            label="Select your prefered language"
          ></v-select>
        </v-flex>
      </v-layout>
    </v-container>
    <v-snackbar
      bottom
      left
      multi-line
      v-model="langSet"
      color="success"
    >Your default language reciever has been set to `{{ preferedLanguage }}`</v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      langSet: false,
      preferedLanguage: "",
      //   TODO: Bring all these from google text
      languages: [
        {
          text: "English - US",
          value: "en-US"
        },
        {
          text: "French ",
          value: "fr"
        }
        // ...
      ]
    };
  },

  mounted() {
    // Get the languages from the server or hard code it here
    // this.languages = ...
  },
  methods: {
    setPreferedLanguage(event) {
      this.preferedLanguage = event;
      this.$io.post(
        "/api/v1/member/set-language",
        {
          language: event
        },
        data => {
          this.langSet = true;
          console.log(data);
        }
      );
    }
  }
};
</script>
