<template>
  <div>
    <v-row justify="center" align="center" class="mt-12">
      <v-col cols="12" md="6" sm="6" lg="6">
        <div class="display-1 grey--text text-center">403 No autorizado</div>
        <v-img contain height="500" :src="require('@/assets/403.svg')"></v-img>
      </v-col>
    </v-row>
    <v-toolbar color="#eee" elevation="0" class="mt-10">
      <v-spacer></v-spacer>
      <v-hover v-slot:default="{hover}">
        <v-btn
          class="text-capitalize caption"
          depressed
          text
          @click="back"
          :elevation="hover ? 5:0"
        >
          <v-fade-transition>
            <v-icon class="mx-2" v-show="hover">arrow_back_ios</v-icon>
          </v-fade-transition>Volver
        </v-btn>
      </v-hover>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-footer fixed color="#eee">
      <SubFooter />
    </v-footer>
  </div>
</template>

<script>
import SubFooter from "@/components/footer/SubFooter";
import router from "@/router";

export default {
  components: {
    SubFooter
  },
  methods: {
    back() {
      router.go(-1);
    }
  }
};
</script>