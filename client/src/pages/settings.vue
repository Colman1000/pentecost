<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center grey--text">
        <div class="display-1">Settings</div>
        <small class="caption">Edit Pentecost's settings and configuration</small>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="5" offset="1">
        <v-text-field outlined clearable label="Paystack API Key" v-model="P_API"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="5" offset="1">
        <v-text-field outlined clearable label="Google Cloud API Key" v-model="G_API"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2" offset="1">
        <v-btn color="primary">
          <v-icon left>mdi-cloud</v-icon>Update
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: "default",
  data() {
    return {
      P_API: "klhhaiJjohoiIf9ugIYyHOJUH89UIG0",
      G_API: "HJijbwlhqkiohOIbielu0oj3r9mD8Ow"
    };
  }
};
</script>