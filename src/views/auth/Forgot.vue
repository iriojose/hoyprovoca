<template>
    <div>
        <v-row justify="center" align="center" class="mt-12 mb-5">
            <v-img contain width="100" height="30" :src="require('@/assets/logoaftim2.png')"></v-img>
        </v-row>

        <v-row justify="center" align="center" :class="$vuetify.breakpoint.smAndDown ? 'mx-5':null">
            <v-col cols="12" md="4" lg="4" class="hidden-sm-and-down">
                <v-img contain width="100%" height="450" :src="require('@/assets/forgot.svg')"></v-img>
            </v-col>

            <v-col cols="12" md="4" sm="12">
                <v-card width="100%" height="400" elevation="5" class="pa-5">
                    <div class="text-center my-5 font-weight-black subtitle-1">¿No puede iniciar sesión?</div>

                    <v-card-text>
                        <v-form v-model="valid" @submit.prevent>
                            <div class="font-weight-black body-2 mb-2">Le enviaremos un enlace de recuperación</div>
                            <v-text-field
                                label="Introduzca su correo electrónico"
                                single-line
                                outlined 
                                dense
                                :disabled="send"
                                color="#005598"
                                v-model="correo"
                                type="text"
                                :rules="[required('Correo Electrónico')]"
                            />
                            <div v-if="send" class="font-weight-black body-2 mb-2">Ingresar codigo de recuperación</div>
                            <v-text-field
                                label="Codigo"
                                single-line
                                outlined 
                                dense
                                color="#005598"
                                v-model="codigo"
                                type="text"
                                :rules="[required('Codigo')]"
                            />
                            <v-hover v-slot:default="{hover}">
                                <v-btn v-if="!send"
                                    block 
                                    type="submit" 
                                    class="text-capitalize mt-5"
                                    :disabled="!valid || loading" 
                                    color="#005598" 
                                    :dark="valid && !loading"
                                    :loading="loading"
                                    :elevation="hover ? 5:0"
                                    @click="sendMail"
                                >
                                   <div> Enviar enlace de recuperación</div>
                                </v-btn>

                                <v-btn v-else
                                    block 
                                    type="submit" 
                                    class="text-capitalize mt-5"
                                    :disabled="!valid || loading" 
                                    color="#005598" 
                                    :dark="valid && !loading"
                                    :loading="loading"
                                    :elevation="hover ? 5:0"
                                    @click="validCode"
                                >
                                   Validar codigo
                                </v-btn>
                            </v-hover>
                        </v-form>
                    </v-card-text>

                    <!--div class="mx-10 my-5">
                        <v-divider></v-divider>
                    </div>

                    <v-hover v-slot:default="{hover}">
                        <div @click="push()" class="text-center" >
                            <a :class="hover ? 'mx-2 subtitle-2 text-color decoracion':'mx-2 subtitle-2 text-color'">
                                Regresar al incio de sesión
                            </a>
                        </div>
                    </v-hover-->
                </v-card>
            </v-col>
            <v-col cols="12" md="4" lg="4" class="hidden-sm-and-down"></v-col>
        </v-row>

        <v-footer fixed color="#eee">
            <SubFooter />
        </v-footer>

        <Snackbar :color="color" :mensaje="mensaje" :icon="icon" />
    </div>
</template>

<script>
import validations from '@/validations/validations';
import SubFooter from "@/components/footer/SubFooter";
import Snackbar from '@/components/snackbars/Snackbar';
import Auth from '@/services/Auth';
import {mapActions} from 'vuex';
import router from '@/router';

    export default {    
        components:{
            SubFooter,
            Snackbar
        },
        data() {
            return {
                mensaje:'',
                icon:'',
                color:'',
                valid:false,
                loading:false,
                send:false,
                correo:'',
                codigo:'',
                ...validations
            }
        },
        methods: {
            ...mapActions(['setSnackbar']),

            push(){ router.push('/login') },
            push2(){ router.push('/reset') },

            mensajeSnackbar(color,mensaje,icon){
                this.color = color;
                this.mensaje = mensaje;
                this.icon = icon;
                this.setSnackbar(true);
                this.loading = false;
            },
            sendMail(){
                this.loading = true;
                Auth().post("/sendmail",{data:{user:this.correo}}).then((response) => {
                    this.mensajeSnackbar("#388E3C","Codigo enviado exitosamente.","done");
                    this.send = true;
                }).catch(e => {
                    console.log(e);
                    this.mensajeSnackbar("#D32F2F","Ooops, Error al intentar enviar el codigo.","error");
                });
            },
            validCode(){
                this.loading = true;
                Auth().post("/validcode",{data:{user:this.correo,hash:this.codigo}}).then((response) => {
                    console.log(response);
                    this.mensajeSnackbar("#388E3C","Codigo validado exitosamente.","done");
                    this.push2();
                }).catch(e => {
                    console.log(e);
                    this.mensajeSnackbar("#D32F2F","Ooops, Error al validar el codigo.","error");
                });
            },
        },
        head: {
            title() {
                return {
                    inner: "Forgot",
                    separator: " ",
                    complement: " "
                };
            }
        }
    }
</script>

<style scoped>
    .background {
        background-color: rgba(0, 82, 152, 0.8);
        height: 30%;
        width: 100%;
    }
    .text-color {
        color: #005598;
    }
    .decoracion {
        text-decoration: underline;
        text-decoration-color: #005598;
        transition-delay: 2s;
        transition-duration: 1s;
    }
</style>