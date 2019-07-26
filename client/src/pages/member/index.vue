<template>
  <div>
    <v-container fill-height grid-list-md>
      <v-layout row wrap justify-center align-center>
        <v-flex xs6 v-for="(action, i) in actions" :key="i">
          <v-card :to="`/member/${action.to}`" outlined>
            <v-card-title>{{ action.title }}</v-card-title>
            <v-card-text>{{ action.text }}</v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>


<script>
export default {
  data() {
    return {
      actions: [
        {
          to: "create-tunnel",
          title: "Create tunnel",
          text: "create a starting conversation entry"
        },
        {
          to: "enter-tunnel",
          title: "Enter tunnel id",
          text: "create a starting conversation entry"
        }
      ]
    };
  }
};
</script>
