<template>
  <div>
    <v-container fill-height grid-list-md>
      <v-layout row wrap justify-center align-center>
        <v-flex xs12 md3 v-for="(action, i) in actions" :key="i">
          <v-card class="text-center" :to="`/member/${action.to}`" outlined>
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
          title: "Create or Login",
          text:
            "create or login into your tunnel entry where people can access you or you can access people"
        }
        // {
        //   to: "enter-tunnel",
        //   title: "Enter tunnel name",
        //   text: "Start talking to someone in other languages"
        // }
      ]
    };
  }
};
</script>
