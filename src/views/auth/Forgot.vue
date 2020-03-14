<template>
    <div>
        <v-row justify="center" align="center" class="fill-height mt-12 mb-5">
            <v-img contain width="100" height="30" :src="require('@/assets/log.png')"></v-img>
        </v-row>

        <v-row justify="center" align="center" class="fill-height">

            <v-col cols="12" md="4" lg="4" class="hidden-sm-and-down">
                <v-img contain width="100%" :height="send ? 400:300" :src="require('@/assets/forgot.svg')"></v-img>
            </v-col>

            <v-col cols="12" md="4" sm="12">
                <v-card width="100%" height="400" elevation="5" class="pa-5">
                    <div class="text-center my-5 font-weight-black subtitle-1">¿No puede iniciar sesión?</div>

                    <v-card-text>
                        <div class="font-weight-black body-2 mb-2">Le enviaremos un enlace de recuperación</div>
                        <v-form v-model="valid" @submit.prevent>
                            <v-text-field
                                v-if="!send"
                                label="Introduzca su correo electrónico"
                                single-line
                                outlined 
                                dense
                                color="#005598"
                                v-model="correo"
                                type="text"
                                :rules="[required('Correo Electrónico'),emailFormat()]"
                            />
                            <v-text-field 
                                v-if="send"
                                v-model="codigo"
                                single-line
                                label="Codigo de recuperacion"
                                dense 
                                outlined
                                color="#005598"
                                type="text"
                                :rules="[required('Codigo')]"
                            />
                            <v-hover v-slot:default="{hover}">
                                <v-btn 
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
                                    Enviar enlace de recuperación
                                </v-btn>
                            </v-hover>
                        </v-form>
                    </v-card-text>

                    <div class="mx-10 my-5">
                        <v-divider></v-divider>
                    </div>

                    <v-hover v-slot:default="{hover}">
                        <div @click="push()" class="text-center" >
                            <a :class="hover ? 'mx-2 subtitle-2 text-color decoracion':'mx-2 subtitle-2 text-color'">
                                Regresar al incio de sesión
                            </a>
                        </div>
                    </v-hover>
                </v-card>
            </v-col>
            <v-col cols="12" md="4" lg="4" class="hidden-sm-and-down"></v-col>
        </v-row>

        <v-footer fixed color="#eee">
            <SubFooter />
        </v-footer>
    </div>
</template>

<script>
import validations from '@/validations/validations';
import router from '@/router';
import SubFooter from "@/components/footer/SubFooter";

    export default {    
        components:{
            SubFooter
        },
        data() {
            return {
                valid:false,
                loading:false,
                send:false,
                correo:'',
                codigo:'',
                ...validations
            }
        },
        methods: {
            push(){
                router.push('/login');
            },
            sendMail(){
                this.send = true;
            },
            validar(){
                console.log('valido');
            }
        },
        head: {
        title() {
            return {
                inner: "HoyProvoca",
                separator: "|",
                complement: "Forgot"
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