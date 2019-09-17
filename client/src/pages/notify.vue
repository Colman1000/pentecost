<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center grey--text">
        <div class="display-1">Broadcast Notifications</div>
        <small class="caption">Compose Notifications for all users of the Emmanuel TV app</small>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="8" offset="1">
        <v-text-field outlined clearable label="Notification Subject" v-model="subject"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="8" offset="1">
        <v-textarea outlined clearable rows="5" label="Compose A New Notification" v-model="notif"></v-textarea>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2" offset="1">
        <v-btn color="primary" block :loading="broadcasting" :disabled="broadcasting">
          <v-icon left>mdi-cloud</v-icon>Broadcast
        </v-btn>
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar">
      {{ snackText }}
      <v-btn color="pink" text @click="snackbar = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  layout: "default",
  data() {
    return {
      broadcasting: false,
      notif: "",
      subject: "",
      snackbar: false,
      snackText: ""
    };
  },
  watch: {
    subject(v) {
      if (!v || typeof v !== "string") return;
      return (this.subject = v.toUpperCase());
    }
  },
  methods: {
    broadcast() {
      const that = this;
      if (that.broadcasting) return;
      if (!that.subject || !that.notif) {
        that.snackbar = true;
        that.snackText = "Please Input Subject and Notification";
        const tx = setTimeout(() => {
          clearTimeout(tx);
          that.snackbar = false;
          that.snackText = "";
        }, 3000);
        return;
      }

      //All is good... Proceed
    }
  }
};
</script>