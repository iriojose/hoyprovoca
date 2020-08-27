<template>
    <div :style="`background:${theme.background.strong}`">
        <v-card :color="theme.background.light" elevation="0" width="100%">
            <v-card-text>
                <v-row justify="center" class="py-4">
                    <v-col cols="12" md="8" sm="12" :class="$vuetify.breakpoint.smAndDown ? 'mx-4':null">
                        <v-row justify="center" class="pb-4">
                            <v-img v-if="theme.background.dark" contain width="100" @click="push2" height="50" :src="require('@/assets/logo2.png')"></v-img>
                            <v-img v-else contain width="100" height="50" @click="push2" :src="require('@/assets/logo6.png')"></v-img>
                        </v-row>
                        <v-card width="100%" :color="theme.background.light_2">
                            <v-row justify="center">
                                <v-col cols="12" md="6" class="hidden-sm-and-down">
                                    <v-img width="100%" height="400" contain :src="require('@/assets/forgot.svg')"></v-img>
                                </v-col>
                                <v-col cols="12" md="6" sm="12" class="pa-12">
                                    <div :style="`color:${theme.background.strong}`" class="headline text-center mb-5">Resetear contraseña</div>
                                    
                                    <v-card elevation="0" height="50">
                                        <v-fade-transition>
                                            <v-alert border="left" colored-border elevation="2"  dense :type="type" v-show="showMessage">
                                                {{mensaje}}
                                            </v-alert>
                                        </v-fade-transition> 
                                    </v-card>

                                    <v-row justify="center" class="my-5" v-if="loading2">
                                        <v-progress-circular
                                            :size="70"
                                            :width="5"
                                            color="#1f3b63"
                                            indeterminate
                                            class="my-8"
                                        ></v-progress-circular>
                                    </v-row>
                                    
                                    <v-row justify="center" class="my-5" v-if="error">
                                        <v-icon size="70" :color="theme.background.font">
                                            {{icon}}
                                        </v-icon>
                                    </v-row>

                                    <div class="text-center title font-weight-black my-5" v-if="error">
                                        {{mensaje}}
                                    </div>
                                    
                                    <v-scroll-x-transition>
                                        <v-form v-model="valid" v-show="cambiarPassword">
                                            <v-text-field :dark="theme.background.dark"
                                                filled rounded :disabled="loading" dense
                                                v-model="contraseña" single-line type="password"
                                                color="#0f2441" :rules="[required('Contraseña'),minLength('Contraseña',8)]"
                                                label="Nueva contraseña" append-icon="mdi-lock"
                                            ></v-text-field>

                                            <v-text-field :dark="theme.background.dark"
                                                filled rounded :disabled="loading"
                                                v-model="contraseña2" single-line
                                                type="password" color="#0f2441"
                                                :rules="[required('Confirmar contraseña'),passwordConfirmationRule()]"
                                                label="Confirmar contraseña" dense append-icon="mdi-lock"
                                            ></v-text-field>

                                            <v-btn
                                                rounded :color="theme.buttons.primary" block
                                                :disabled="!valid" :loading="loading"
                                                height="40" @click="reset" 
                                                :style="theme.buttons.font"
                                                class="text-capitalize caption "
                                            >
                                                Resetear contraseña
                                            </v-btn>
                                        </v-form>
                                    </v-scroll-x-transition>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>

        <v-footer fixed class="font-weight-medium" elevation="0" :color="theme.background.light_2">
            <v-col class="text-center white--text" cols="12">
                {{ new Date().getFullYear() }} — <strong>Hoyprovoca</strong> 
            </v-col>
        </v-footer>
    </div>
</template>

<script>
import Auth from '@/services/Auth';
import validations from '@/validations/validations';
import router from '@/router';
import {mapState} from "vuex";
    export default {
        data(){
            return {
                ...validations,
                valid:false,
                mensaje:'',
                type:'error',
                loading:false,
                loading2:false,
                showMessage:false,
                cambiarPassword:false,
                contraseña:'',
                contraseña2:'',
                email:'',
                token:'',
                error:false
            }
        },
        head:{
            title(){
                return {
                    inner:'Resetear contraseña',
                    separator:' ',
                    complement: ' '
                }
            }
        },
        mounted() {
            this.email = this.$route.params.email;
            this.token = this.$route.params.token;
            this.validCode();
        },
        computed: {
          ...mapState(['theme']),
            passwordConfirmationRule() {
                return () => (this.contraseña === this.contraseña2) || 'Las contraseñas no coinciden.';
            },
        },
        methods:{
            login(){
                router.push('/login');
            },
            respuesta(mensaje,type){
                this.mensaje = mensaje;
                this.type = type
                this.loading = false;
                this.showMessage = true;
                setTimeout(() => {this.showMessage = false}, 1000);
            },
            respuesta2(mensaje,icon,color,error){
                this.mensaje = mensaje;
                this.icon = icon;
                this.color = color;
                this.loading2 = false;
            },
            validCode(){
                this.loading2 = true;
                Auth().post("/validcode",{data:{user:this.email,hash:this.token}}).then((response) => {
                    if(response.data.code == 401){
                        this.error = true;
                        this.respuesta2("Token expirado, envie nuevamente un correo de recuperación.","mdi-alert-circle","red");
                    }
                    else {
                        this.cambiarPassword = true;
                        this.loading2 = false;
                    }
                }).catch(e => {
                    this.error = true;
                    if(e.response.status) this.respuesta2("Token expirado","mdi-alert-circle","red");
                    else this.respuesta2('Error de conexion, intente Nuevamente.','mdi-alert-circle','red');
                });
            },
            reset(){
                this.loading = true;
                Auth().post("/resetpassword",{data:{user:this.email,password:this.contraseña}}).then(() => {
                    this.respuesta("Contraseña cambiada.","success");
                    setTimeout(() => {
                        this.login();
                    },1000);
                }).catch(e => {
                    this.respuesta("Error al resetear la contraseña.","error");
                });
            },
        }
    }
</script>

<style lang="scss" scoped>
    .fondo{
        background:#1f3b63;
        height: 100%;
    }   
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