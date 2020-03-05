<template>
  <div>
    <v-toolbar elevation="0" color="#005598" width="100%">
      <v-toolbar-items>
        <v-btn color="#005598" elevation="0" to="/" icon>
          <v-icon large color="#fff">home</v-icon>
        </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-hover v-slot:default="{hover}">
          <v-btn width="200" color="#005598" elevation="0" to="/register/cliente">
            <span class="white--text text-capitalize">Registrate</span>
            <v-slide-x-transition>
              <v-icon color="#fff" x-large v-show="hover">keyboard_arrow_right</v-icon>
            </v-slide-x-transition>
          </v-btn>
        </v-hover>
      </v-toolbar-items>
    </v-toolbar>

    <v-row :class="$vuetify.breakpoint.smAndDown ? 'mx-2':null">
      <v-col cols="12" md="4" lg="4" class="hidden-sm-and-down">
        <v-img contain class="margen" :src="require('@/assets/undrawlogin.svg')"></v-img>
      </v-col>

      <v-col cols="12" md="4" sm="12" lg="4">
        <v-card elevation="15" class="pa-5 my-10">
          <div class="text-center">
            <v-btn text>
              <v-img src="@/assets/log.png"></v-img>
            </v-btn>
          </div>
          <v-divider class="mt-5"></v-divider>

          <v-card-text>
            <formLogin />
          </v-card-text>
          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              text
              class="decoracion text-lowercase"
              depressed
              @click="press"
            >Olvido su contraseña?</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" md="4" lg="4" class="hidden-sm-and-down">
        <v-img contain class="margen" :src="require('@/assets/undrawlogin2.svg')" height="300"></v-img>
      </v-col>
    </v-row>
    <v-footer fixed color="#eee">
      <SubFooter />
    </v-footer>
  </div>
</template>

<script>
import FormLogin from "@/components/vistaAuth/FormLogin";
import SubFooter from "@/components/footer/SubFooter";
import axios from "axios";

export default {
  components: {
    FormLogin,
    SubFooter
  },
  data() {
    return {
      title: "HoyProvoca"
    };
  },
  methods: {
    press() {}
  },
  head: {
    title() {
      return {
        inner: this.title,
        separator: "|",
        complement: "Login"
      };
    }
  }
};
</script>

<style scoped>
.background {
  background-color: rgba(0, 82, 152, 0.8);
  height: 30%;
  width: 100%;
}
.margen {
  margin-top: 250px;
}
.decoracion {
  text-decoration: underline;
}
</style>