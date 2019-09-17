<template>
  <div>
    <v-bottom-sheet class="rounded z-index-100" v-model="sheet">
      <v-sheet class="text-center rounded" dark height="200px" inset>
        <v-container>
          <v-row class="mb-3">
            <v-col cols="1" sm="0" xs="0">&nbsp;</v-col>
            <v-col>
              <span class="subtitle-1 font-weight-black grey--text no-select">Navigation Menu</span>
            </v-col>
            <v-col cols="1" sm="0">
              <v-btn @click="sheet = false" color="error" icon size="large" text>
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="4" xs="12">
              <v-chip disabled pill>
                <v-avatar color="purple lighten-2" left>
                  <v-icon small>mdi-account</v-icon>
                </v-avatar>John Doe
              </v-chip>
            </v-col>
            <v-col cols="4" xs="12">
              <v-chip
                pill
                v-ripple="{ class: 'pink--text'}"
                :disabled="notifications.length < 1"
                class="no-select"
              >
                Notifications
                <v-avatar color="secondary" right>
                  <v-badge color="pink" left>
                    <template v-slot:badge v-if="notifications.length > 0">{{notifications.length}}</template>
                    <v-icon small>mdi-bell</v-icon>
                  </v-badge>
                </v-avatar>
              </v-chip>
            </v-col>
            <v-col cols="4" xs="12">
              <div class="text-right">
                <small class="subtitle-2 font-weight-thin grey--text no-select">
                  Made with
                  <span class="red--text">&hearts;</span>
                  from EaseCore
                </small>
              </div>
            </v-col>
          </v-row>
        </v-container>

        <v-bottom-navigation
          :value="currentRoute"
          absolute
          color="purple lighten-2"
          grow
          horizontal
          style="box-shadow: none;"
        >
          <v-btn v-for="nav in navs" @click="routeTo(`/${nav.to}`)" :key="nav.name" :value="nav.to">
            <span class="font-weight-bold">{{nav.name}}</span>
            <v-icon>{{nav.icon}}</v-icon>
          </v-btn>
        </v-bottom-navigation>
      </v-sheet>
    </v-bottom-sheet>

    <div
      @click="showMenu"
      class="lift-footer z-index-100"
      id="footer"
      style="border-radius: 20px 20px 0 0;"
    ></div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      sheet: false,
      currentRoute: "",
      notifications: [],
      navs: [
        {
          to: "scribe",
          name: "Scribe",
          icon: "mdi-voice"
        },
        {
          to: "schedule",
          name: "Scheduler",
          icon: "mdi-timetable"
        },
        {
          to: "subtitle",
          name: "TV Subtitles",
          icon: "mdi-subtitles"
        },
        {
          to: "notify",
          name: "Notifications",
          icon: "mdi-bell-plus"
        },
        {
          to: "settings",
          name: "Settings",
          icon: "mdi-wrench"
        }
      ]
    };
  },
  methods: {
    showMenu() {
      return (this.sheet = true);
    },
    routeTo($page = "") {
      if (!$page || this.currentRoute === $page.toLowerCase()) return;
      return this.$router.push(`${$page}`);
    },
    ...mapMutations(["SET_ROUTE"])
  },
  mounted() {
    this.currentRoute =
      this.$router.currentRoute &&
      this.$router.currentRoute.name &&
      this.$router.currentRoute.name.toLowerCase();
    this.SET_ROUTE(this.currentRoute);
  },
  watch: {
    $route(to) {
      const route = to.name && to.name.toLowerCase();
      this.SET_ROUTE(route);
      this.currentRoute = route;
    }
  }
};
</script>

<style>
.lift-footer {
  box-shadow: 1px -3px 7px 0 rgba(10, 10, 10, 0.2);
  background-color: #212121b9;
  transition: all 200ms ease;
  cursor: pointer;
  position: absolute;
  width: 100%;
  min-height: 4vh;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 30px 30px 0 0;
  transform: scale(0.995);
}

.lift-footer:hover {
  min-height: 4.5vh;
  box-shadow: 1px -3px 10px 0 rgba(10, 10, 10, 0.4);
  background-color: #212121d9;
  border-radius: 20px 20px 0 0;
  transform: scale(1);
}
.no-select {
  user-select: none;
}
.rounded {
  border-radius: 20px 20px 0 0;
}

.z-index-100 {
  z-index: 100 !important;
}
.v-badge.v-badge--left .v-badge__badge.pink {
  left: 2px;
  top: -25px !important;
}
</style>