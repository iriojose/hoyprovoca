<template>
    <v-card width="100%" elevation="0" :color="theme.background.primary" height="100%">
        <v-app-bar app color="#fff" :elevation="$vuetify.breakpoint.smAndDown ? 1:0" :class="$vuetify.breakpoint.smAndDown ? null:'px-12'">  
            <v-spacer class="hidden-sm-and-up"></v-spacer>
            <v-img
                v-if="theme.background.dark" alt="Hoyprovoca logo"
                class="shrink mr-2 cursor"
                contain src="@/assets/logo6.png" transition="scale-transition"
                width="200" height="100" @click="push2"
            />
            <v-img
                v-else alt="Hoyprovoca logo" class="shrink mr-2 cursor"
                contain src="@/assets/logo2.png" transition="scale-transition"
                width="200" height="100" @click="push2"
            />
            <v-spacer></v-spacer>
            <v-btn class="text-capitalize font-weight-bold mx-2" text to="/login" v-if="!$vuetify.breakpoint.smAndDown">
                Inicia sesión
                <v-icon class="mx-2">
                    mdi-exit-to-app
                </v-icon>
            </v-btn>
            <v-btn class="text-capitalize font-weight-bold mx-2" text to="/" v-if="!$vuetify.breakpoint.smAndDown">
                Inicio
                <v-icon class="mx-2">
                    mdi-home
                </v-icon>
            </v-btn>
        </v-app-bar>

        <v-card-text>
            <v-row justify="center" class="py-4">
                <v-col cols="12" md="9" sm="12" :class="$vuetify.breakpoint.smAndDown ? 'mx-4':null">
                    <v-card :color="theme.background.light" width="100%" style="padding: 0 15px">
                        <v-row  justify="center">
                            <v-col  cols="12" md="6" class="hidden-sm-and-down" style="padding: 12px 40px">
                                <v-img width="100%" height="400" contain :src="require('@/assets/forgot.svg')"></v-img>
                            </v-col>
                            <v-col  cols="12" md="6" sm="12" class="py-12" :style="`background-color:${theme.background.strong}`">
                                <div  :style="`color:${theme.background.font}`" class="headline text-center mb-5">¿Olvido su contraseña?</div>

                                <v-card :color="theme.background.strong" elevation="0" height="50">
                                    <v-fade-transition>
                                        <v-alert  border="left" colored-border elevation="2"  dense :type="type" v-show="showMessage">
                                            {{mensaje}}
                                        </v-alert>
                                    </v-fade-transition> 
                                </v-card>

                                <v-form v-model="valid" @submit.prevent="">
                                    <v-text-field
                                    :dark="theme.background.dark"
                                        filled
                                        rounded
                                        :disabled="loading"
                                        v-model="email"
                                        single-line
                                        color="#0f2441"
                                        :success-messages="success"
                                        :error-messages="errors"
                                        @input="getUser(email)"
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
                                                <img v-else width="24" height="24" :src="require('@/assets/2.png')">
                                            </v-fade-transition>
                                        </template>
                                    </v-text-field>

                                    <v-btn
                                        rounded
                                        :color="theme.buttons.primary"
                                        block
                                        :disabled="success == '' ? true:false "
                                        :loading="loading"
                                        height="40"
                                        @click="sendMail"
                                        :style="`color:${theme.buttons.font}`"
                                        class="text-capitalize caption"
                                    >
                                        Enviar email
                                    </v-btn>
                                </v-form>

                                <v-divider class="my-10"></v-divider>

                                <div 
                                :style="`font-weight:bold; background-color:${theme.background.strong};color:${theme.background.font}`"
                                class="subtitle-2 text-center color" @click="login">Recordé mi contraseña</div>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </v-card-text>

        <v-footer
            fixed elevation="0"
            :color="theme.background.primary"
        >
            <v-col class="text-center black--text font-weight-black" cols="12">
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
import {mapState} from "vuex";
    export default {
        data() {
            return {
                ...validations,
                valid:false,
                email:'',
                mensaje:'',
                type:'error',
                loading:false,
                loading2:false,
                showMessage:false,
                success:'',
                errors:[],
            }
        },
        head:{
            title(){
                return {
                    inner:'Forgot',
                    separator:' ',
                    complement: ' '
                }
            }
        },
        computed:{
          ...mapState(["theme"])
        },
        methods:{
          push2(){
      router.push("/");
    },
            login(){
                router.push('/login');
            },
            home(){
                router.push('/');
            },
            register(){
                router.push('/register');
            },
            respuesta(mensaje,type){
                this.mensaje = mensaje;
                this.type = type
                this.loading = false;
                this.showMessage = true;
            },
            sendMail(){
                this.showMessage = false;
                this.loading = true;
                Auth().post("/sendmail",{data:{user:this.email}}).then(() => {
                    this.respuesta("Email enviado","success");
                }).catch(e => {
                    console.log(e);
                    this.respuesta("Error el enviar el Email","error");
                });
            },
            async getUser(email){
                this.errors = [];
                this.success = '';
                if(email.length <= 0) return this.errors.push('Debe ingresar un email');
                // eslint-disable-next-line
                let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/ 
                if (!regex.test(this.email)) return this.errors.push(`Debe ingresar un email válido`);
                this.loading2 = true;
                await Usuario().get(`/?email=${email}`).then((response) => {
                    this.loading2 = false;
                    if(!response.data.data) {
                        return this.errors.push('Este email no esta registrado');
                    }else{
                        if(response.data.data[0].bloqueado == 1){
                            return this.errors.push("Esta cuenta se encuentra bloqueada.");
                        }else{
                            return this.success='Email verificado';
                        }
                    }
                }).catch(e => {
                    console.log(e);
                    this.loading2 = false;
                    return this.errors.push('Error de conexión');
                });
            }
        }
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