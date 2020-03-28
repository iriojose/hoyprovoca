<template>
    <v-form v-model="valid">
        <v-stepper v-model="e1" class="elevation-0">
            <v-stepper-items>
                <v-stepper-content step="1">
                    <v-form v-model="valid1">
                        <v-text-field
                            type="text"
                            v-model="data.nombre"
                            label="Nombre(s)"
                            color="#005598"
                            outlined
                            dense
                            single-line
                            append-icon="person"
                            :rules="[required('Nombre(s)'), minLength('Nombre(s)',3),maxLength('Nombre(s)',40)]"
                        />
                        <v-text-field
                            type="text"
                            append-icon="person"
                            v-model="data.apellido"
                            label="Apellido(s)"
                            single-line
                            color="#005598"
                            outlined
                            dense
                            :rules="[required('Apellido(s)'), minLength('Apellido(s)',3),maxLength('Apellido(s)',40)]"
                        />
                        <v-hover v-slot:default="{hover}" open-delay="200">
                            <v-btn 
                                class="white--text text-capitalize"
                                :disabled="!valid1"
                                :color="hover ? '#388E3C':'#43A047'" 
                                :elevation="hover ? 5:0"
                                @click="e1=2"
                                block
                            >
                                Siguiente
                            </v-btn>
                        </v-hover>
                    </v-form>
                </v-stepper-content>

                <v-stepper-content step="2">
                    <v-form v-model="valid2" @submit.prevent>
                        <v-text-field
                            label="Usuario / Correo"
                            v-model="data.email"
                            type="email"
                            prepend-inner-icon="email"
                            outlined
                            color="#005598"
                            dense
                            single-line
                            :rules="[required('Usuario / Correo'), emailFormat(), maxLength('Usuario / Correo',50)]"
                        />
                        <v-text-field
                            label="Usuario"
                            v-model="data.login"
                            type="text"
                            prepend-inner-icon="person"
                            outlined
                            color="#005598"
                            dense
                            single-line
                            :rules="[required('Usuario'),minLength('Usuario',2), maxLength('Usuario',100)]"
                        />
                        <v-text-field
                            v-model="data.password"
                            label="Contraseña"
                            single-line
                            :type="showPassword ? 'text' : 'password' "
                            :rules="[required('Contraseña'), minLength('Contraseña',8)]"
                            @click:append="showPassword = !showPassword"
                            :append-icon="showPassword ?  'visibility' : 'visibility_off'"
                            :prepend-inner-icon="showPassword ?  'lock_open' : 'lock'"
                            outlined
                            color="#005598"
                            dense
                        />
                        <v-card-actions>
                            <v-btn @click="e1=1" text icon>
                                <v-icon large>arrow_back</v-icon>
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-hover v-slot:default="{hover}" open-delay="200">
                                <v-btn 
                                    type="submit"
                                    class="text-capitalize"
                                    :disabled="!valid2 || loading" 
                                    :color="hover ? '#388E3C':'#43A047'" 
                                    :dark="valid2 && !loading"
                                    :loading="loading"
                                    :elevation="hover ? 5:0"
                                     @click="signup"
                                >
                                    Registrarse
                                </v-btn>
                            </v-hover>
                        </v-card-actions>
                    </v-form>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>

        <Snackbar :color="color" :mensaje="mensaje" :icon="icon" :time="1000"/>
    </v-form>
</template>

<script>
import validations from "@/validations/validations";
import Auth from "@/services/Auth";
import Snackbar from '@/components/snackbars/Snackbar';
import router from "@/router";
import {mapActions} from 'vuex';

    export default {
        components:{
            Snackbar
        },
        data() {
            return {
                valid:false,
                valid1:false,
                valid2:false,
                loading:false,
                showPassword: false,
                e1:0,
                color:"",
                mensaje:"",
                icon:"",
                ...validations,
                data:{
                    nombre: "",
                    apellido: "",
                    email: "",
                    password: "",
                    login: "",
                    fotografia: "perfil.jpg",
                    perfil_id: 1
                }
            }
        },
        methods: {
            ...mapActions(['setSnackbar']),

            error(){
                this.color="#D32F2F"
                this.icon = "error";
                this.mensaje = "Usuario y/o contraseña incorrecta."
                this.setSnackbar(true);
                this.loading = false;
            },
            success(nombre){
                this.color="#388E3C"
                this.icon = "done";
                this.mensaje = "Se registro exitosamente "+nombre;
                this.setSnackbar(true);
                this.loading = false;
                setTimeout(() =>{ router.push('/login') },1000);
            },
            signup(){
                this.loading = true;
                Auth().post("/signup",{data:this.data}).then((response) => {
                    this.success(this.data.nombre);
                }).catch(e =>{
                    console.log(e);
                    this.error();
                });
            }
        },
    }
</script>