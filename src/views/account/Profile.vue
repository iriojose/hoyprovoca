<template>
    <div>
        <v-card width="100%" elevation="1">
            <v-card-title class="title font-weight-bold back">
                Información de tu cuenta
            </v-card-title>

            <v-divider></v-divider>

            <v-card-text class="mb-12">
                <v-form v-model="valid" @submit.prevent="">
                    <v-row class="my-4">
                        <v-col cols="12" md="5" sm="12" lg="5" :offset="$vuetify.breakpoint.smAndDown ? null:1">
                            <v-sheet v-mutate="onMutate" hidden>
                                {{ nombre}}
                            </v-sheet>
                            <v-text-field
                                v-model="perfil.nombre"
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
                        <v-col cols="12" md="5" sm="12" lg="5" >
                            <v-sheet v-mutate="onMutate" hidden>
                                {{ apellido}}
                            </v-sheet>
                            <v-text-field
                                v-model="perfil.apellido"
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
                        <v-col cols="12" md="5" lg="5" sm="12" :offset="$vuetify.breakpoint.smAndDown ? null:1" class="my-3">
                            <v-text-field
                                v-model="perfil.email"
                                label="Email"
                                type="email"
                                counter="40"
                                dense
                                color="#005598"
                                append-icon="email"
                                disabled
                            />
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>

            <v-divider></v-divider>
            <v-card-actions>
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

        <v-snackbar v-model="snackbar" color="green" right :timeout="2000">
            Se ha editado exitosamente.
        </v-snackbar>
    </div>
</template>

<script>
import validations from "@/validations/validations";
import Auth from '@/services/Auth';
import { mapGetters } from "vuex";

    export default {
        data() {
            return {
                ...validations,
                valid: false,
                editable:false,
                perfil:{
                    nombre:'',
                    apellido:'',
                    email:'',
                    fotografia:'default.png'
                },
                snackbar:false,
            };
        },
        mounted() {
            this.getUsuario();
        },
        computed: {
            ...mapGetters(['user']),
        },
        methods: {

            onMutate(){
            //un peo ahi para saber cuando se editan los textfields
            //el peo esta que como traes los valores de la api el asume cambios
            //y deja visible el boton, por eso puse un count segun el numero de variables
            //modificadas, acuerdate webon
                if(this.count > 3){
                    this.editable=true;
                }else{
                    this.count=this.count+1;
                }
            },

            editarUsuario(){//methodo para editar sus datos
                this.snackbar=true;
                this.editable=false;
            },
            getUsuario(){
                Auth().post("/sesion",{token:this.user.token}).then((response) => {
                    this.perfil = response.data.data;
                    console.log(response.data.data);
                }).catch(e =>{
                    console.log(e);
                });
            }
        }
    };
</script>