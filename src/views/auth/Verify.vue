<template>
    <v-card width="100%" elevation="0" :color="theme.background.light" height="100%">
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
                <v-col cols="12" md="8" sm="12" :class="$vuetify.breakpoint.smAndDown ? 'mx-4':null">
                    <v-card width="100%" :color="theme.background.light_2">
                        <v-row justify="center">
                            <v-col cols="12" md="6" class="hidden-sm-and-down">
                                <v-img width="100%" height="400" contain :src="require('@/assets/verified.svg')"></v-img>
                            </v-col>
                            <v-col cols="12" md="6" sm="12" class="pa-12">
                                <div :style="`color:${theme.background.font}`" class="headline text-center mb-5">Verificación de Correo electrónico</div>
                                
                                <v-row justify="center" class="my-5" v-if="loading">
                                    <v-progress-circular
                                        :size="70"
                                        :width="5"
                                        color="#1f3b63"
                                        indeterminate
                                        class="my-8"
                                    ></v-progress-circular>
                                </v-row>
                                
                                <v-row justify="center" class="my-5" v-if="!loading">
                                    <v-icon size="70" :color="color">
                                        {{icon}}
                                    </v-icon>
                                </v-row>

                                <div class="text-center title font-weight-black my-5" v-if="!loading">
                                    {{mensaje}}
                                </div>

                                <v-divider class="my-10"></v-divider>

                                <div class="subtitle-2 text-center color" :style="`color:${theme.background.font}`" @click="login">ir a ¡Inicio de sesión!</div>
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
import Auth from '@/services/Auth';
import Usuario from '@/services/Usuario';
import router from '@/router';
import {mapState} from "vuex"
    export default {
        data(){
            return {
                mensaje:'',
                icon:'',
                color:'',
                loading:false,
                token:'',
                email:'',
            }
        },
        head:{
            title(){
                return {
                    inner:'Verificación de email',
                    separator:' ',
                    complement: ' '
                }
            }
        },
        mounted() {
            this.token = this.$route.params.token;
            this.email = this.$route.params.email;
            this.validCode();
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
            respuesta(mensaje,icon,color){
                this.mensaje = mensaje;
                this.icon = icon;
                this.color = color;
                this.loading = false;
            },
            validCode(){
                this.loading = true;
                Auth().post("/validcode",{data:{user:this.email,hash:this.token}}).then((response) => {
                    if(response.data.code == 401) this.respuesta("Token expirado, envie nuevamente un correo de validación.","mdi-alert-circle","red");
                    else this.updateUser(response.data.user.id);
                }).catch(e => {
                    console.log(e);
                    if(e.response.status) this.respuesta("Token expirado","mdi-alert-circle","red");
                    else this.respuesta('Error de conexion, intente Nuevamente.','mdi-alert-circle','red');
                });
            },
            updateUser(id){
                Usuario().post(`/${id}`,{data:{verificado:1}}).then((response) => {
                    this.respuesta("Su correo electrónico fue verificado exitosamente.","mdi-check-circle","green");
                }).catch(e => {
                    console.log(e);
                    this.respuesta('Error de conexion, intente Nuevamente.','mdi-alert-circle','red');
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .color{
        background:#fff;
    }
    .color:hover{
        cursor:pointer;
        text-decoration:underline;
        background:#fff;
    }
</style>