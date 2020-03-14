<template>
    <v-form v-model="valid" class="center mx-5" @submit.prevent="">
        <v-text-field
            label="Usuario/Email"
            v-model="data.user"
            type="email"
            outlined
            prepend-inner-icon="email"
            color="#005598"
            dense
            single-line
            :rules="[required('Usuario/Email'), maxLength('Usuario/Email',50)]"
        />    
        <v-text-field
            v-model="data.password"
            label="Password"
            single-line
            :type="showPassword ? 'text' : 'password' "
            :rules="[required('password'), minLength('password',6)]"
            @click:append="showPassword = !showPassword"
            :append-icon="showPassword ?  'visibility' : 'visibility_off'"
            :prepend-inner-icon="showPassword ?  'lock_open' : 'lock'"
            outlined
            color="#005598"
            dense
        />  
        <v-hover v-slot:default="{hover}" open-delay="200">
            <v-btn 
                block 
                type="submit" 
                class="text-capitalize mt-5"
                :disabled="!valid || loading" 
                color="#005598" 
                :dark="valid && !loading"
                :loading="loading"
                :elevation="hover ? 5:0"
                @click="login()"
            >
                Iniciar Sesión
            </v-btn>
        </v-hover>

        <v-snackbar v-model="loading" dark right>
            autenticando...
        </v-snackbar>
        <!--snakbar para mensaje de login completado o fallido-->
        <v-snackbar v-model="snackbar" :color="error != null? '#D32F2F':'#2E7D32'" right>
            <div v-if="error==null">
                <v-icon dark>
                    check_circle
                </v-icon>
                Ha iniciado sesión exitosamente.
            </div>
                <div v-if="error">
                    <v-icon dark>
                        cancel
                    </v-icon>
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
import Auth from '@/services/Auth';

    export default {
        data(){
            return {
                data: {
                    user: "",
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
                Auth().post("/login",{data:this.data}).then((response) => {
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
                    this.error="Usuario y/o contraseña invalida.";
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