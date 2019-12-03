<template>
    <div>
      <v-card width="100%" height="510" elevation="1">
          <v-card-title class="title font-weight-bold back">
              Información de tu cuenta
          </v-card-title>

          <v-divider></v-divider>

          <v-card-text class="mb-12">
              <v-form v-model="valid" @submit.prevent="">
                  <v-row class="my-4">
                      <v-col cols="12" md="5" sm="5" lg="5" offset="1">
                          <v-sheet v-mutate="onMutate" hidden>
                            {{ nombre}}
                          </v-sheet>
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
                      <v-col cols="12" md="5" sm="5" lg="5">
                          <v-sheet v-mutate="onMutate" hidden>
                            {{ apellido}}
                          </v-sheet>
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
                      <v-col cols="12" md="5" lg="5" sm="5" offset="1" class="my-3">
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
                      <v-col cols="12" md="5" lg="5" sm="5" class="my-3">
                          <v-text-field
                              v-model="cedula"
                              label="Cedula"
                              type="text"
                              counter="40"
                              dense
                              color="#005598"
                              append-icon="credit_card"
                              disabled
                          />
                      </v-col>
                      <v-col cols="12" md="7" offset="1" sm="7" lg="7">
                          <v-sheet v-mutate="onMutate" hidden>
                            {{ telefono}}
                          </v-sheet>
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
                  </v-row>
              </v-form>
          </v-card-text>

          <v-divider></v-divider>
          <v-card-actions class="back px-12">
              <v-spacer></v-spacer>
              <v-btn 
                  color="teal" 
                  dark
                  :disabled="!valid || !editable"
                  @click="editar()"
              >Editar</v-btn>
          </v-card-actions>

          <v-divider></v-divider>
      </v-card>

      <v-snackbar v-model="snackbar" color="green" right :timeout="time">
          Se ha editado exitosamente.
      </v-snackbar>
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

  mounted() {
    this.email = firebase.auth().currentUser.email;
    this.getProfile();
  },

  computed: {
    ...mapState(["user"])
  },

  methods: {

    onMutate(){
      this.editable=true;
    },

    async editar(){
      var uid = firebase.auth().currentUser.uid;
      await firebase.firestore()
        .collection('profile')
        .doc(uid).update({
          nombre:this.nombre,
          apellido:this.apellido,
          telefono:this.telefono,
          cedula:this.cedula
      });
      this.snackbar=true;
      this.editable=false;
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

<style scope>
  .back{
    background: #eee;
  }
</style>