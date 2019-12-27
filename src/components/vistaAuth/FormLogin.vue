<template>
    <v-form v-model="valid" class="center" @submit.prevent="">
        <v-container>
            <v-row>
                <v-col cols="12" md="12" xs="12">
                    <v-text-field
                        label="Email"
                        v-model="usuario.email"
                        type="email"
                        clearable
                        outlined
                        prepend-inner-icon="email"
                        color="#005598"
                        dense
                        counter="50"
                        :rules="[required('Email'), emailFormat(), maxLength('Email',50)]"
                    />
                </v-col>
                <v-col cols="12" md="12" xs="12">
                    <v-text-field
                        v-model="usuario.password"
                        label="Password"
                        counter="true"
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
                <v-col cols="12">
                    <v-btn 
                        block 
                        type="submit" 
                        :disabled="!valid || loading" 
                        color="#005598" 
                        :dark="valid && !loading"
                        :loading="loading"
                        @click="login()"
                    >
                        Enviar
                        <template v-slot:loader>
                            <span class="custom-loader">
                            <v-icon light>cached</v-icon>
                            </span>
                        </template>
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>

        <!--snakbar para mensaje de login completado o fallido-->
        <v-snackbar v-model="snackbar" :color="error != null? 'red':'green'" right>
            <div v-if="error==null">
                se ha logeado exitosamente.
            </div>
            <div v-if="error">
                {{error}}
            </div>
        </v-snackbar>
    </v-form>
</template>

<script>
//metodos de validacion
import validations from '@/validations/validations';
//router
import router from '@/router';
//state globales
import {mapState,mapActions} from 'vuex';
//servicios
import Usuario from '@/services/Usuario';

    export default {
        data(){
            return {
                usuario: {
                    email: "",
                    password: "",
                },
                error:null,
                valid:false,
                ...validations,
                showPassword:false,
                snackbar:false,
                loading:false,
            }
        },
        computed: {
          ...mapState(['user'])
        },
        methods: {
          ...mapActions(['logged']),

            login(){
                this.loading = true;
                let data = {
                    usuario:this.usuario.email,
                    password:this.usuario.password
                }

                Usuario().post("/login",{data}).then((response) => {
                    console.log(response);
                    this.snackbar=true;
                    this.logged(response.data.token);//se guarda token en state

                    setTimeout(() => {
                        this.error=null;
                        this.loading=false;
                        router.push('/');
                    },1000);

                }).catch(e => {
                    console.log(e);
                    this.loading = false;
                    this.snackbar=true;
                    this.error="error";
                });
            }

        },
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