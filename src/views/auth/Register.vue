<template>
    <v-card width="100%" elevation="0" color="#1f3b63" height="1200">
        <v-card-text>
            <v-row justify="center" class="py-2">
                <v-col cols="12" md="9" sm="12" :class="$vuetify.breakpoint.smAndDown ? 'mx-4':null">
                    <v-row justify="center" class="pb-4">
                        <v-img contain width="100" height="50" :src="require('@/assets/logo 6.png')"></v-img>
                    </v-row>
                    <v-card width="100%" elevation="0">
                        <v-row justify="center">
                            <v-col cols="12" md="6" class="hidden-sm-and-down">
                                <v-img width="100%" height="500" contain :src="require('@/assets/undrawregistro2.svg')"></v-img>
                            </v-col>
                            <v-col cols="12" md="6" sm="12" class="pa-12">
                                <div class="headline text-center mb-5">Registrate ahora!</div>
                                
                                <v-card elevation="0" height="50">
                                    <v-fade-transition>
                                        <v-alert border="left" colored-border elevation="2"  dense :type="type" v-show="showMessage">
                                            {{mensaje}}
                                        </v-alert>
                                    </v-fade-transition> 
                                </v-card>
                                
                                <v-scroll-x-transition>
                                    <v-form v-model="valid" @submit.prevent="" v-show="!change">
                                        <v-text-field
                                            filled
                                            rounded
                                            dense
                                            :disabled="loading"
                                            v-model="data.nombre"
                                            single-line
                                            color="#0f2441"
                                            :rules="[required('Nombre')]"
                                            label="Nombre"
                                        ></v-text-field>

                                        <v-text-field
                                            filled
                                            rounded
                                            dense
                                            :disabled="loading"
                                            v-model="data.apellido"
                                            single-line
                                            color="#0f2441"
                                            :rules="[required('Apellido')]"
                                            label="Apellido"
                                        ></v-text-field>

                                        <v-text-field
                                            filled
                                            rounded
                                            dense
                                            :disabled="loading"
                                            v-model="data.login"
                                            single-line
                                            color="#0f2441"
                                            :rules="[required('Usuario')]"
                                            label="Nombre de usuario"
                                        ></v-text-field>

                                        <v-btn
                                            rounded color="#2950c3"
                                            block :disabled="!valid"
                                            :loading="loading" height="40"
                                            @click="change=!change"
                                            class="text-capitalize caption white--text"
                                        >
                                            Siguiente
                                        </v-btn>
                                    </v-form>
                                </v-scroll-x-transition>

                                <v-scroll-x-transition>
                                    <v-form v-model="valid2" @submit.prevent="" v-show="change">
                                        <v-text-field
                                            filled
                                            rounded
                                            :disabled="loading"
                                            v-model="data.email"
                                            single-line
                                            dense
                                            color="#0f2441"
                                            :success-messages="success"
                                            :error-messages="errors"
                                            @input="getUser(data.email)"
                                            label="Ingrese correo electrónico"
                                        >
                                            <template v-slot:append>
                                                <v-fade-transition leave-absolute>
                                                    <v-progress-circular
                                                        v-if="loading2"
                                                        size="24"
                                                        color="#0f2441"
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
                                            color="#0f2441"
                                            :rules="[required('Contraseña'),minLength('Contraseña',6)]"
                                            label="Nueva contraseña"
                                        ></v-text-field>

                                        <v-text-field
                                            filled
                                            rounded
                                            dense
                                            :disabled="loading"
                                            v-model="password2"
                                            single-line
                                            type="password"
                                            color="#0f2441"
                                            :rules="[required('Confirmar contraseña'),passwordConfirmationRule()]"
                                            label="Confirmar contraseña"
                                        ></v-text-field>

                                        <v-toolbar elevation="0" color="transparent">
                                            <v-btn
                                                fab color="#2950c3"
                                                @click="change=!change" small
                                                class="text-capitalize caption white--text"
                                            >
                                                <v-icon>mdi-chevron-left</v-icon>
                                            </v-btn>
                                            <v-spacer></v-spacer>

                                            <v-btn
                                                rounded color="#2950c3"
                                                :loading="loading" height="40"
                                                :disabled="valid2 && success !== '' ? false:true"
                                                @click="postUsuario()"
                                                class="text-capitalize caption white--text"
                                            >
                                                Registrate
                                            </v-btn>
                                        </v-toolbar>
                                    </v-form>
                                </v-scroll-x-transition>

                                <v-divider class="my-10"></v-divider>

                                <div class="subtitle-2 text-center color" @click="login">¿Ya tienes una cuenta? ¡Iniciar sesión!</div>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </v-card-text>

        <v-footer fixed class="font-weight-medium" elevation="0" color="#1f3b63">
            <v-col class="text-center white--text" cols="12">
                {{ new Date().getFullYear() }} — <strong>Hoyprovoca</strong> 
            </v-col>
        </v-footer>
    </v-card>
</template>

<script>
import router from '@/router';
import validations from '@/validations/validations';
import Auth from '@/services/Auth';
import Usuario from '@/services/Usuario';
import Clientes from '@/services/Clientes';
import {mapActions} from 'vuex';

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
                valid2:false,
                change:false,
                success:'',
                errors:[],
                data:{
                    nombre:'',
                    apellido:'',
                    login:'',
                    email:'',
                    password:'',
                    fecha_nac:new Date().toISOString().substr(0,10),
                    adm_empresa_id:null,
                    perfil_id:3,
                },
                password2:''
            }
        },
        head:{
            title(){
                return {
                    inner:'Registrate',
                    separator:' ',
                    complement: ' '
                }
            }
        },
        computed: {
            passwordConfirmationRule() {
                return () => (this.data.password === this.password2) || 'Las contraseñas no coinciden.';
            },
        },
        methods: {
            ...mapActions(['logged']),

            login(){
                router.push('/login');
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
                    if(response.data.data) {
                        return this.errors.push('Este email ya fue registrado');
                    }else{
                        this.success='Email verificado';
                    }
                }).catch(e => {
                    console.log(e);
                });
            },
            postUsuario(){
                this.loading = true;
                Auth().post("/signup",{data:this.data}).then((response) => {
                    this.postCliente(response.data);
                }).catch(e => {
                    console.log(e);
                    this.respuesta("Error al registrar, intente mas tarde.","error");
                });
            },
            postCliente(usuario){
                let cliente = {
                    nombre:usuario.nombre + " " + usuario.apellido,
                    fecha_nac:new Date().toISOString().substr(0,10),
                    usuario_id:usuario.data.id
                };
                Clientes().post("/",{data:cliente}).then((response) => {
                    this.logged(usuario);
                    this.respuesta("Usuario registrado exitosamente.","success");
                    setTimeout(() => { this.login()},1000);
                }).catch(e => {
                    console.log(e);
                    this.respuesta("Error al registrar, intente mas tarde.","error");
                });
            }
        },
    }
</script>

<style lang="scss" scoped>
    .color{
        color:#000;
        background:#fff;
    }
    .color:hover{
        cursor:pointer;
        text-decoration:underline;
        background:#fff;
    }
</style>