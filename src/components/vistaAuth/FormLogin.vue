<template>
    <v-form v-model="valid" class="center" @submit.prevent="">
        <v-container>
            <v-row>
                <v-col cols="12" md="12" xs="12">
                    <v-text-field
                        label="Email"
                        v-model="user.email"
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
                        v-model="user.password"
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
import validations from '@/validations/validations';
import router from '@/router';
import store from '../../store';

    export default {
        data(){
            return {
                user: {
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
        
        watch: {
            loading() {
                setTimeout(() => (this.loading = false), 2000);
            },
        },

        methods: {
            login(){
                this.loading = true;

                this.snackbar=true;
                store.state.user.loggedIn=true;
                let valor=true;
                window.localStorage.setItem('user',valor);
                setTimeout(() => {
                    this.error=null;
                    router.push('/');
                },1000);
               
                  //para cuando atrape un error (catch)
                  //this.snackbar=true;
                  //this.error =  err.message;
              
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