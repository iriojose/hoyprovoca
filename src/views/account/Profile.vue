<template>
    <div>
    <div class="subtitle-1 font-weight-medium">Información de tu cuenta</div>

    <v-form v-model="valid" @submit.prevent="">
        <v-layout class="ma-5">
            <v-row>
                <v-col cols="12" md="5" lg="5" sm="5" offset="1" class="my-2">
                    <v-text-field
                        v-model="nombre"
                        label="Nombre(s)"
                        type="text"
                        counter="40"
                        dense
                        color="#005598"
                        append-icon="create"
                        :rules="[
                                required('Nombre(s)'),
                                minLength('Nombre(s)',3),
                                maxLength('Nombre(s)',40)
                              ]"
                    />
                </v-col>

                <v-col cols="12" md="5" lg="5" sm="5" offset="1" class="my-2">
                    <v-text-field
                        v-model="apellido"
                        label="Apellido(s)"
                        type="text"
                        counter="40"
                        dense
                        color="#005598"
                        append-icon="create"
                        :rules="[
                                required('Apellido(s)'),
                                minLength('Apellido(s)',3),
                                maxLength('Apellido(s)',40)
                              ]"
                    />
                </v-col>

                <v-col cols="12" md="8" lg="8" sm="8" offset="2" class="my-2">
                    <v-text-field
                        v-model="email"
                        label="Email"
                        type="email"
                        counter="40"
                        dense
                        color="#005598"
                        append-icon="email"
                        disabled
                    />
                </v-col>

                <v-col cols="12" md="5" lg="5" sm="5" offset="1" class="my-2">
                    <v-text-field
                        v-model="telefono"
                        label="Telefono"
                        type="number"
                        counter="12"
                        dense
                        prefix="+58"
                        color="#005598"
                        append-icon="create"
                        :rules="[
                                required('Telefono'),
                                minLength('Telefono',10),
                              ]"
                    />
                </v-col>

                <v-col cols="12" md="3" lg="3" sm="3" offset="3" class="my-2">
                    <v-btn 
                        color="green" 
                        outlined 
                        :disabled="!valid || !editable"
                        @click="editar()"
                    >Editar</v-btn>
                </v-col>
            </v-row>

            <!--snakbar para mensaje de editar completado-->
            <v-snackbar v-model="snackbar" color="green" right :timeout="time">
                Se ha editado exitosamente.
            </v-snackbar>
        </v-layout>
    </v-form>
  </div>
</template>

<script>
import validations from "@/validations/validations";
import firebase from "firebase";
import { mapState } from "vuex";

export default {
  data() {
    return {
      ...validations,
      valid: false,
      editable:false,
      nombre: "",
      apellido: "",
      cedula:'',
      telefono: "",
      email: "",
      count:0,
      snackbar:false,
      time:2000
    };
  },

  watch:{
    nombre(){
      this.count=this.count +1;
      if(this.count>=3){
        this.editable=true;
      }
    },
    apellido(){
      this.count=this.count +1;
      if(this.count>=3){
        this.editable=true;
      }
    },
    telefono(){
      this.count=this.count +1;
      if(this.count>=3){
        this.editable=true;
      }
    },
  },

  mounted() {
    
    this.email = firebase.auth().currentUser.email;
    this.getProfile();
  },

  computed: {
    ...mapState(["user"])
  },

  methods: {
    async editar(){
      var uid =await firebase.auth().currentUser.uid;
      await firebase.firestore()
        .collection('profile')
        .doc(uid).update({
          nombre:this.nombre,
          apellido:this.apellido,
          telefono:this.telefono,
          cedula:this.cedula
      });
      this.snackbar=true;
    },

    async getProfile(uid) {

      var uid =await firebase.auth().currentUser.uid;
      console.log(uid);
      
      var ref = await firebase
        .firestore()
        .collection("profile")
        .doc(uid);

      ref.onSnapshot(snap => {
        this.nombre= snap.data().nombre;
        this.apellido= snap.data().apellido;
        this.cedula=snap.data().cedula;
        this.telefono=snap.data().telefono;
      });
    }
  }
};
</script>