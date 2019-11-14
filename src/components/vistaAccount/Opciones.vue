<template>
  <div>
      <v-card elevation="1">
          <v-layout row wrap justify-center>
              <v-flex md6 xs3 class="my-4">
                  <v-avatar size="150">
                      <v-img :src="profile.imagen" class="elevation-3" />
                  </v-avatar>
                  <div class="text-center mt-2">
                      {{profile.nombre+' '+profile.apellido }}
                  </div>
              </v-flex>
          </v-layout>
      </v-card>

      <v-card class="mt-2" elevation="2">
          <v-list dense>
              <v-list-item
                  v-for="opcion in opciones"
                  :key="opcion.text"
                  :to="opcion.path"
                  class="py-2"
                  active-class="border aftim-color"
              >
                  <v-list-item-icon>
                      <v-icon>{{opcion.icon}}</v-icon>
                  </v-list-item-icon>

                  <v-list-item-title>{{opcion.text}}</v-list-item-title>
              </v-list-item>
          </v-list>
      </v-card>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      opciones: [
        { icon: "build", text: "Ajustes de cuenta", path: "/account/profile" },
        {
          icon: "credit_card",
          text: "Tajeta de credito",
          path: "/account/credit-card"
        },
        {
          icon: "calendar_today",
          text: "Ultimos pedidos",
          path: "/account/historial"
        },
        {
          icon: "help_outline",
          text: "Centro de ayuda",
          path: "/account/ayuda"
        },
        {
          icon: "history",
          text: "Centro de notificaciones",
          path: "/account/notificaciones"
        }
      ],
      profile: {
        nombre: "",
        apellido: "",
        imagen: ""
      },
    };
  },

  mounted() {
    var uid = firebase.auth().currentUser.uid;
    this.getProfile(uid);
  },

  methods: {
    async getProfile(uid) {
      var ref = await firebase
        .firestore()
        .collection("profile")
        .doc(uid);

      ref.onSnapshot(snap => {
        this.profile.nombre = snap.data().nombre;
        this.profile.apellido = snap.data().apellido;
        this.profile.imagen = snap.data().imagen;
      });
    }
  }
};
</script>

<style scoped>
.aftim-color {
  color: #005598;
}

.border {
  border-left: 4px solid #005598;
}
</style>