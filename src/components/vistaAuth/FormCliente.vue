<template>
    <v-form v-model="valid" @submit.prevent="">
        <v-stepper v-model="e1" class="elevation-0">
            <v-stepper-header class="elevation-0">
                <v-stepper-step 
                    step="1" 
                    :complete="valid1" 
                    :color="valid1 ? '#2E7D32':'#005598'"
                >Datos basicos
                </v-stepper-step>
                <v-divider v-if="$vuetify.breakpoint.smAndDown ? true:false"></v-divider>
                <v-stepper-step 
                    step="2" 
                    :complete="valid2" 
                    :color="valid2 ? '#2E7D32':'#005598'"
                >Datos privados
                </v-stepper-step>
                <v-divider></v-divider>
            </v-stepper-header>

            <v-stepper-items>
                <v-stepper-content step="1">
                    <v-card class="mb-12" elevation="0">
                        <v-form v-model="valid1" @submit.prevent="">
                            <v-row>
                                <v-col cols="12" lg="6" md="6" sm="12">
                                    <v-text-field 
                                        type="text"
                                        v-model="data.nombre"
                                        label="Nombre(s)"
                                        color="#005598"
                                        outlined
                                        dense
                                        clearable
                                        append-icon="person"
                                        counter="40"
                                        :rules="[required('Nombre(s)'), minLength('Nombre(s)',3),maxLength('Nombre(s)',40)]"
                                    />
                                </v-col>

                                <v-col cols="12" lg="6" md="6" sm="12">
                                    <v-text-field 
                                        type="text"
                                        append-icon="person"
                                        v-model="data.apellido"
                                        label="Apellido(s)"
                                        clearable
                                        color="#005598"
                                        outlined
                                        dense
                                        counter="40"
                                        :rules="[required('Apellido(s)'), minLength('Apellido(s)',3),maxLength('Apellido(s)',40)]"
                                    />
                                </v-col>
                            </v-row>
                        </v-form>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn @click="e1=2" color="#005598" :disabled="!valid1" class="white--text">
                                Siguiente
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-stepper-content>

                <v-stepper-content step="2">
                    <v-form v-model="valid2" @submit.prevent="">
                        <v-card elevation="0">
                            <v-row>
                                <v-col cols="12" lg="6" md="6" sm="12" :offset="$vuetify.breakpoint.smAndDown ? null:3">
                                    <v-text-field
                                        label="Email"
                                        v-model="data.email"
                                        type="email"
                                        clearable
                                        prepend-inner-icon="email"
                                        outlined
                                        color="#005598"
                                        dense
                                        single-line
                                        counter="50"
                                        :rules="[required('Email'), emailFormat(), maxLength('Email',50)]"
                                    />
                                </v-col>
                                <v-col cols="12" md="6" sm="12" :offset="$vuetify.breakpoint.smAndDown ? null:3">
                                    <v-text-field
                                        label="Usuario"
                                        v-model="data.login"
                                        type="text"
                                        clearable
                                        prepend-inner-icon="person"
                                        outlined
                                        color="#005598"
                                        dense
                                        single-line
                                        counter="50"
                                        :rules="[required('Usuario'),minLength('Usuario',2), maxLength('Usuario',50)]"
                                    />
                                </v-col>
                                <v-col cols="12" lg="6" md="6" sm="12" :offset="$vuetify.breakpoint.smAndDown ? null:3">
                                    <v-text-field
                                        v-model="data.password"
                                        label="Password"
                                        counter="true"
                                        single-line
                                        :type="showPassword ? 'text' : 'password' "
                                        :rules="[required('password'), minLength('password',8)]"
                                        @click:append="showPassword = !showPassword"
                                        :append-icon="showPassword ?  'visibility' : 'visibility_off'"
                                        :prepend-inner-icon="showPassword ?  'lock_open' : 'lock'"
                                        outlined
                                        color="#005598"
                                        dense
                                    />
                                </v-col>
                            </v-row>
                            <v-card-actions>
                                <v-btn @click="e1=1" text icon>
                                    <v-icon large>
                                        arrow_back
                                    </v-icon>
                                </v-btn>
                                <v-spacer></v-spacer>
                                <v-btn 
                                    type="submit" 
                                    :disabled="!valid2 || loading" 
                                    color="#005598" 
                                    :dark="valid2 && !loading"
                                    :loading="loading"
                                    @click="register()"
                                >
                                    Enviar
                                    <template v-slot:loader>
                                        <span class="custom-loader">
                                        <v-icon light>cached</v-icon>
                                        </span>
                                    </template>
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-form>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
        
        <!--snakbar para mensaje de registro completado o fallido-->
        <v-snackbar v-model="snackbar" :color="error != null? '#D32F2F':'#2E7D32'" right>
            <div v-if="error==null">
                <v-icon dark>
                  check_circle
                </v-icon>
                se ha registrado exitosamente.
            </div>
            <div v-if="error">
                <v-icon dark>
                  calcel
                </v-icon>
                {{error}}
            </div>
        </v-snackbar>
    </v-form>
</template>
<script>
//metodos de validacion
import validations from '@/validations/validations';
//servicios
import Auth from '@/services/Auth';
//router
import router from '@/router';
//state globales
//vuex
import {mapState,mapActions} from 'vuex';

    export default {
        data(){
            return {
                valid:false,
                valid1:false,
                valid2:false,
                showPassword:false,
                error:null,
                snackbar:false,
                terms:false,
                conditions:false,
                data:{
                    nombre:'',
                    apellido:'',
                    email:'',
                    password:'',
                    login:'',
                    fotografia:'perfil.jpg',
                    perfil_id:1
                },
                ...validations,
                e1:0,
                loading:false,
            }
        },

        watch: {
            loading() {
                setTimeout(() => (this.loading = false), 2000)
            },
        },

        methods:{
            ...mapActions(['logged']),

            register(){
                this.loading = true;
                this.SignUp();
            },

            SignUp(){//metodo para registrarse
                Auth().post("/signup",{data:this.data}).then((response) => {
                    console.log(response);
                    this.snackbar=true;
                    this.logged(response.data.token);//se guarda token en state

                    setTimeout(() => {
                        this.loading = false;
                        this.error=null;
                        router.push('/');
                    },1000);

                }).catch(e => {
                    this.snackbar=true;
                    this.error = e.message;
                    console.log(e);
                });
            },
        }
    }
</script>

<style>
    .custom-loader {
        animation: loader 1s infinite;
        display: flex;
    }

    @-moz-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }

    @-webkit-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }

    @-o-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }

    @keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>