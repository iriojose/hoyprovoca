<template>
    <v-toolbar elevation="0" :color="theme.background.strong">
        <v-toolbar-title>
            <v-img v-if="theme.sidebar.dark" contain width="150" @click="push2" height="80" :src="require('@/assets/logo2.png')"></v-img>
                <v-img v-else contain width="150" height="80" @click="push2" :src="require('@/assets/logo6.png')"></v-img>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn :style="`color:${theme.background.font}`" text class="text-capitalize" to="/">
            Ir a hoyprovoca 
        </v-btn>
    </v-toolbar>
</template>

<script>
import {mapState} from "vuex";
import router from "@/router";
export default {
  computed:{
    ...mapState(["theme"])
  },
  methods:{
     push2(){
      router.push("/");
    },
  }
}
</script>