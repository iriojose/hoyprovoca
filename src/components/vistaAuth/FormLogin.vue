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
                <v-col cols="12" md="4" sm="4" lg="4" offset="8">
                    <v-btn 
                        block 
                        type="submit" 
                        :disabled="!valid" 
                        color="#005598" 
                        :dark="valid"
                        @click="login()"
                    >
                        Enviar
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
import firebase from 'firebase';

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
                snackbar:false
            }
        },

        methods: {
            login(){
                firebase.auth().signInWithEmailAndPassword(this.user.email,this.user.password)
                .then(data => {
                    this.snackbar=true;
                    setTimeout(() => {
                        this.error=null;
                        router.push('/');
                    },2000);
                }).catch(err => {
                    this.snackbar=true;
                    this.error =err.message;
                });
            }
        },
    }
</script>