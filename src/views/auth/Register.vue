<template>
  <div>
    <v-toolbar elevation="0" color="#005598" width="100%">
      <v-toolbar-items>
        <v-hover v-slot:default="{hover}">
          <v-btn class="white--text text-capitalize" elevation="0" to="/" text>
            Home
            <v-slide-y-transition>
              <v-icon large color="#fff" v-show="hover">home</v-icon>
            </v-slide-y-transition>
          </v-btn>
        </v-hover>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-hover v-slot:default="{hover}">
          <v-btn width="200" color="#005598" elevation="0" to="/login">
            <span class="white--text text-capitalize">Inicia sesión</span>
            <v-slide-x-transition>
              <v-icon color="#fff" x-large v-show="hover">keyboard_arrow_right</v-icon>
            </v-slide-x-transition>
          </v-btn>
        </v-hover>
      </v-toolbar-items>
    </v-toolbar>

    <!-- <v-tabs class="mt-2" color="#005598" background-color="#eee" centered>
            <v-tab to="/register/cliente">Persona</v-tab>
            <v-tab to="/register/empresa">Compañia</v-tab>
    </v-tabs>-->

    <transition name="slide-fade">
      <router-view />
    </transition>

    <v-footer fixed color="#eee">
      <SubFooter />
    </v-footer>
  </div>
</template>

<script>
import SubFooter from "@/components/footer/SubFooter";

export default {
  components: {
    SubFooter
  },
  data() {
    return {
      title: "HoyProvoca"
    };
  },
  head: {
    title() {
      return {
        inner: this.title,
        separator: "|",
        complement: "Registro"
      };
    }
  }
};
</script>

<style scoped>
.color {
  color: #005598;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
