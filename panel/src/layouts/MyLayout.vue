<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />
        <q-toolbar-title>Emmanuel TV</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-2">
      <q-list>
        <q-item-label header>Essential Links</q-item-label>
        <q-item clickable tag="a" to="/songs">
          <q-item-section avatar>
            <q-icon name="mdi-format-list-bulleted-type" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Songs</q-item-label>
            <q-item-label caption>List all songs on site</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" to="/upload-songs">
          <q-item-section avatar>
            <q-icon name="mdi-shape-circle-plus" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Add song</q-item-label>
            <q-item-label caption>Adds a new song to all apps</q-item-label>
          </q-item-section>
        </q-item>
        <!-- <q-item clickable tag="a">
          <q-item-section avatar>
            <q-icon name="mdi-shield" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Status</q-item-label>
            <q-item-label caption>View song summary</q-item-label>
          </q-item-section>
        </q-item> -->
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MyLayout",

  data() {
    return {
      leftDrawerOpen: false
    };
  }
};
</script>
