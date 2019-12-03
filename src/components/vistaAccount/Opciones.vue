<template>
  <div>
      <v-card elevation="1">
          <v-layout row wrap justify-center>
              <v-flex md6 xs3 class="my-4">
                  <v-hover v-slot:default="{hover}">
                      <v-avatar size="150">
                          <v-img :src="imagenes" :class="hover ? 'elevation-5':'elevation-2'"> 
                              <v-row class="fill-height" align="center" justify="center">
                                  <template v-if="hover">
                                      <v-btn fab color="blue darken-5" @click="modal= !modal" elevation="3">
                                          <v-icon color="#fff">edit</v-icon>
                                      </v-btn>
                                </template>
                              </v-row>
                          </v-img>
                      </v-avatar>
                  </v-hover>
                  <div class="text-center mt-2">
                      {{nombre+' '+apellido }}
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

      <v-dialog v-model="modal" max-width="600" close-delay>
          <div class="back">
          <v-card color="transparent">
              <v-card-title class="headline grey lighten-4">
                  Editar foto  <v-spacer />
                  <v-btn icon color="#005598" text @click="modal = !modal">
                      <v-icon>close</v-icon>
                  </v-btn>
              </v-card-title>

              <v-divider/>

              <v-card-text class="mt-8 text-center">     
                  <v-row>
                      <v-col cols="12" md="8" sm="8" offset="2">
                          <croppa 
                            v-model="myCroppa"
                            :width="300"
                            :height="300"
                            :canvas-color="'#eee'"
                            prevent-white-space
                            :placeholder="'Selecciona una imagen'"
                            :placeholder-font-size="20"
                            @new-image-drawn="onNewImage()"
                            @zoom="onZoom()"
                            @init="onInit()"
                            initial-image="https://zhanziyang.github.io/vue-croppa/static/500.jpeg"
                          ></croppa>
                      </v-col>
                      <v-col cols="12" md="8" sm="8" offset="2">
                          <v-slider
                              track-color="#eee"
                              class="mt-8"
                              label="Zoom"
                              id="#slider"
                              v-model="sliderVal"
                              append-icon="panorama"
                              prepend-icon="photo"
                              thumb-label
                              color="teal"
                              @input="onSliderChange($event)"
                              :min="sliderMin" 
                              :max="sliderMax" 
                              step="0.001" 
                          ></v-slider>
                      </v-col>
                  </v-row>
              </v-card-text>

              <v-card-actions class="mx-5 my-3">
                  <v-spacer/>
                  <v-btn text @click="modal = !modal" elevation="0" class="blue--text">
                      Cancelar
                  </v-btn>
                  <v-hover v-slot:default="{hover}">
                      <v-btn 
                          :color="hover ? '#005598':'#005598'" 
                          :elevation="hover ? '5':'1'" 
                          dark 
                          class="px-4"
                          @click="editImage()"
                      >
                          Guardar
                      </v-btn>
                  </v-hover>
              </v-card-actions>
          </v-card>
          </div>
      </v-dialog>

      <v-snackbar v-model="snackbar" bottom right color="green" :timeout="time">
          Se ha editado exitosamente
      </v-snackbar>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      snackbar:false,
      time:2000,
      modal:false,
      myCroppa:{},
      sliderVal:0,
      sliderMin:0,
      sliderMax:0,
      opciones: [
        { icon: "build", text: "Ajustes de cuenta", path: "/account/profile" },
        {
          icon: "credit_card",
          text: "Metodos de pago",
          path: "/account/metodo-de-pago"
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
      nombre: "",
      apellido: "",
      imagen: ""
      
    };
  },

  computed: {
    imagenes:{
      get(){
        return this.imagen;
      },
      set(val){
        this.imagen=val;
      }
      
    }
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
        this.nombre = snap.data().nombre;
        this.apellido = snap.data().apellido;
        this.imagen = snap.data().imagen;
      });
    },
    
    onNewImage() {
      this.sliderVal = this.myCroppa.scaleRatio;
      this.sliderMin = this.myCroppa.scaleRatio / 2;
      this.sliderMax = this.myCroppa.scaleRatio * 2;
    },
    
    onSliderChange(evt) {
      var increment = evt;
      this.myCroppa.scaleRatio = + increment;
    },
    
    onZoom() {
      this.sliderVal = this.myCroppa.scaleRatio;
    },

    onInit() {
      this.myCroppa.addClipPlugin(function (ctx, x, y, w, h) {
        ctx.beginPath()
        ctx.arc(x + w / 2, y + h / 2, w / 2, 0, 2 * Math.PI, true)
        ctx.closePath()
      });
    },

    editImage(){
        this.imagenes = {};
        let url = this.myCroppa.generateDataUrl();

        if(!url){
            alert('No imagen');
            return
        }else{
            this.imagenes=url;
            this.snackbar=true;
            this.modal=false;
        }
    },
  }
};
</script>

<style scoped>
  .back{
    background-color:white;
  }
  .aftim-color {
    color: #005598;
  }

  .border {
    border-left: 4px solid #005598;
  }
</style>