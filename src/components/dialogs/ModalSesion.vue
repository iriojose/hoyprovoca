<template>
    <v-dialog v-model="sesion" close-delay width="800" transition="dialog-bottom-transition">
        <v-card width="100%" class="px-5 py-2">
            <v-row justify="center" align="center" class="pa-2">
                <v-col cols="12" sm="6" md="6" class="hidden-sm-and-down">
                    <v-img width="100%" height="400" contain src="@/assets/negocio.svg"></v-img>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                    <div class="headline text-center mb-5">Inicia sesión ahora!</div>

                    <v-card elevation="0" height="50">
                        <v-fade-transition>
                            <v-alert dense :type="type" v-show="showMessage">
                                {{mensaje}}
                            </v-alert>
                        </v-fade-transition> 
                    </v-card>
                    
                    <v-form v-model="valid" @submit.prevent="">
                        <v-text-field
                            filled
                            rounded
                            :disabled="loading"
                            v-model="data.user"
                            single-line
                            dense
                            color="#ffbd07"
                            :success-messages="success"
                            :error-messages="errors"
                            @input="getUser(data.user)"
                            label="Ingrese correo electrónico"
                        >
                            <template v-slot:append>
                                <v-fade-transition leave-absolute>
                                    <v-progress-circular
                                        v-if="loading2"
                                        size="24"
                                        color="#ffbd07"
                                        indeterminate
                                    ></v-progress-circular>
                                    <img v-else width="24" height="24" :src="require('@/assets/logo 3.png')">
                                </v-fade-transition>
                            </template>
                        </v-text-field>

                        <v-text-field
                            filled
                            rounded
                            dense
                            :disabled="loading"
                            v-model="data.password"
                            single-line
                            type="password"
                            color="#ffbd07"
                            :rules="[required('Contraseña'),minLength('Contraseña',6)]"
                            label="Contraseña"
                        ></v-text-field>

                        <v-btn
                            rounded color="#2950c3"
                            block
                            :loading="loading" height="40"
                            :disabled="valid && success !== '' ? false:true"
                            @click="login()"
                            class="text-capitalize caption white--text"
                        >
                            Iniciar sesión
                        </v-btn>
                    </v-form>
                </v-col>
            </v-row>
        </v-card>
    </v-dialog> 
</template>

<script>
import {mapState,mapActions} from 'vuex';
import validations from '@/validations/validations';
import Auth from '@/services/Auth';
import Usuario from '@/services/Usuario';

    export default {
        data() {
            return {
                ...validations,
                mensaje:'',
                type:'error',
                showMessage:false,
                loading:false,
                loading2:false,
                valid:false,
                success:'',
                errors:[],
                data:{
                    user:'',
                    password:''
                },
            }
        },
        computed: {
            ...mapState(['modalsesion']),

            sesion:{
                get(){ return this.modalsesion },
                set(val){ this.setModalSesion(val) }
            }
        },
        methods: {
            ...mapActions(['setModalSesion','logged','setModalBloqueado']),

            close(){
                this.setModalSesion(false);
            },
            respuesta(mensaje,type){
                this.mensaje = mensaje;
                this.type = type
                this.loading = false;
                this.showMessage = true;
                setTimeout(() => {this.showMessage = false}, 2000);
            },
            async getUser(email){
                this.errors = [];
                this.success = '';
                if(email.length <= 0) return this.errors.push('Debe ingresar un email');
                // eslint-disable-next-line
                let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/ 
                if (!regex.test(email)) return this.errors.push(`Debe ingresar un email válido`);
                this.loading2 = true;
                await Usuario().get(`/?email=${email}`).then((response) => {
                    this.loading2 = false;
                    if(!response.data.data) {
                        return this.errors.push('Este email no esta registrado');
                    }else{
                        this.success='Email verificado';
                    }
                }).catch(e => {
                    console.log(e);
                });
            },
            login(){
                this.loading = true;
                Auth().post("/login",{data:this.data}).then((response) =>{
                    if(response.data.response.data.bloqueado == 1){
                        this.loading = false;
                        this.close();
                        this.setModalBloqueado(true);
                    }else if(response.data.response.data.perfil_id == 3){
                        this.logged(response.data);
                        this.respuesta("Bienvenido.","success");
                        setTimeout(() => { this.home()},500);
                    }else{
                        this.respuesta("Este usuario no es un cliente.","error");
                    }
                }).catch((e) => {
                    console.log(e);
                    this.respuesta("Contraseña incorrecta.","error");
                });
            }
        },
    }
</script>