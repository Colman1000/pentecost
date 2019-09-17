<template>
  <div>
    <v-layout row wap>
      <v-flex xs6>
        <div class="left_chat_bubble pa-1" v-if="align == 'left'">
          <div class="left_bubble_pointer1 v-card"></div>
          <div class="left_bubble_pointer2"></div>
          <div class="left_message_box pa-2 v-card">
            <p class="mb-1 font-weight-light text-truncate">
              <small>{{ userName }}</small>
            </p>
            {{ message }}
            <p class="mb-1 font-weight-light text-truncate text-xs-right pr-1 pl-1 font-italic">
              <small>{{ time | moment("ddd, hA")}}</small>
            </p>
          </div>
        </div>
      </v-flex>
      <v-flex xs6>
        <div class="right_chat_bubble pa-1" v-if="align == 'right'">
          <div class="right_bubble_pointer1 v-card"></div>
          <div class="right_bubble_pointer2"></div>
          <div class="right_message_box pa-2 v-card">
            <p class="mb-1 font-weight-light text-truncate text-xs-right pr-1 pl-1">{{userName}}</p>
            {{ message }}
            <p class="mb-1 font-weight-light text-truncate text-xs-left pr-1 pl-1 font-italic">
              <small>{{ time | moment("ddd, hA")}}</small>
            </p>
          </div>
        </div>
      </v-flex>
    </v-layout>

    <!--  -->
  </div>
</template>
<script>
export default {
  // props: ["userName", "message", "time", ],
  props: {
    align: String,
    userName: String,
    message: String,
    time: Number
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.left_chat_bubble {
  position: relative;
  display: inline-flex;
  left: 0px;
  height: auto;
}

.left_bubble_pointer1 {
  position: relative;
  top: 20px;
  height: 20px;
  width: 20px;
  /* border: 1px solid red; */
  border-radius: 3px;
  transform: rotate(45deg);
}
.left_bubble_pointer2 {
  position: absolute;
  top: 26px;
  height: 17px;
  width: 16px;
  background: rgb(255, 255, 255);
  transform: rotate(45deg);
  z-index: 110;
}
.left_message_box {
  position: relative;
  /* left: 2px; */
  left: -10px;
  width: 100%;
  height: auto;
  border: 1px solid rgba(224, 224, 224, 0.781);
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  z-index: 100;
}
/* 
 */
/*  */
.right_chat_bubble {
  position: relative;
  display: inline-flex;
  float: right;
  height: auto;
}
.right_bubble_pointer1 {
  position: absolute;
  right: 6px;
  top: 20px;
  height: 20px;
  width: 20px;
  /* border: 1px solid red; */
  border-radius: 3px;
  transform: rotate(45deg);
}
.right_bubble_pointer2 {
  position: absolute;

  top: 22px;
  right: 7px;
  height: 17px;
  width: 16px;
  background: rgb(255, 255, 255);
  transform: rotate(45deg);
  z-index: 110;
}
.right_message_box {
  position: relative;
  /* left: 2px; */
  left: -10px;
  width: 100%;
  height: auto;
  border: 1px solid rgba(224, 224, 224, 0.781);
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  z-index: 100;
}
</style>

