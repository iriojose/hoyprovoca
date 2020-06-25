<template>
    <v-card width="100%" elevation="0" color="#1f3b63" height="1200">
        <v-card-text>
            <v-row justify="center" class="py-4">
                <v-col cols="12" md="8" sm="12" :class="$vuetify.breakpoint.smAndDown ? 'mx-4':null">
                    <v-row justify="center" class="pb-4">
                        <v-img contain width="100" height="50" :src="require('@/assets/logo 6.png')"></v-img>
                    </v-row>
                    <v-card width="100%">
                        <v-row justify="center">
                            <v-col cols="12" md="6" class="hidden-sm-and-down">
                                <v-img width="100%" height="400" contain :src="require('@/assets/forgot.svg')"></v-img>
                            </v-col>
                            <v-col cols="12" md="6" sm="12" class="pa-12">
                                <div class="headline text-center mb-5">Resetear contraseña</div>
                                
                                <v-card elevation="0" height="50">
                                    <v-fade-transition>
                                        <v-alert border="left" colored-border elevation="2"  dense :type="type" v-show="showMessage">
                                            {{mensaje}}
                                        </v-alert>
                                    </v-fade-transition> 
                                </v-card>

                                <v-form v-model="valid" @submit.prevent="">
                                    <v-text-field
                                        filled rounded :disabled="loading" dense
                                        v-model="contraseña" single-line type="password"
                                        color="#0f2441" :rules="[required('Contraseña'),minLength('Contraseña',8)]"
                                        label="Nueva contraseña"
                                    ></v-text-field>

                                    <v-text-field
                                        filled rounded :disabled="loading"
                                        v-model="contraseña2" single-line
                                        type="password" color="#0f2441"
                                        :rules="[required('Confirmar contraseña'),passwordConfirmationRule()]"
                                        label="Confirmar contraseña" dense
                                    ></v-text-field>

                                    <v-btn
                                        rounded color="#2950c3" block
                                        :disabled="!valid" :loading="loading"
                                        height="40" @click="reset"
                                        class="text-capitalize caption white--text"
                                    >
                                        Resetear contraseña
                                    </v-btn>
                                </v-form>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
import Auth from '@/services/Auth';
import validations from '@/validations/validations';
import router from '@/router';

    export default {
        data(){
            return {
                ...validations,
                valid:false,
                mensaje:'',
                type:'error',
                loading:false,
                showMessage:false,
                contraseña:'',
                contraseña2:''
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
        computed: {
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
            reset(){
                this.loading = true;
                Auth().post("/resetpassword",{data:{user:this.email,password:this.contraseña}}).then(() => {
                    this.respuesta("Contraseña cambiada.","success");
                    setTimeout(() => {
                        this.login();
                    },1000);
                }).catch(e => {
                    console.log(e);
                    this.respuesta("Error al resetear la contraseña.","error");
                });
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>