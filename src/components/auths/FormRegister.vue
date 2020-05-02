<template>
    <v-form v-model="valid" @submit.prevent="">
        <v-stepper v-model="e1" class="elevation-0">
            <v-stepper-items>
                <v-stepper-content step="1" class="py-2">
                    <v-form v-model="valid1">
                        <v-text-field
                            type="text"
                            v-model="data.nombre"
                            :disabled="loading"
                            label="Nombre(s)"
                            color="#005598"
                            outlined
                            dense
                            single-line
                            append-icon="mdi-account"
                            :rules="[required('Nombre(s)'), minLength('Nombre(s)',3),maxLength('Nombre(s)',40)]"
                        />
                        <v-text-field
                            type="text"
                            append-icon="mdi-account"
                            v-model="data.apellido"
                            label="Apellido(s)"
                            single-line
                            :disabled="loading"
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
                            label="Correo"
                            v-model="data.email"
                            type="email"
                            prepend-inner-icon="mdi-email"
                            outlined
                            color="#005598"
                            dense
                            :disabled="loading"
                            single-line
                            :rules="[required('Correo'), emailFormat(), maxLength('Correo',50)]"
                        />
                        <v-text-field
                            label="Usuario"
                            v-model="data.login"
                            type="text"
                            prepend-inner-icon="mdi-account"
                            outlined
                            color="#005598"
                            dense
                            :disabled="loading"
                            single-line
                            :rules="[required('Usuario'),minLength('Usuario',2), maxLength('Usuario',100)]"
                        />
                        <v-text-field
                            v-model="data.password"
                            label="Contraseña"
                            single-line
                            :disabled="loading"
                            :type="showPassword ? 'text' : 'password' "
                            :rules="[required('Contraseña'), minLength('Contraseña',8)]"
                            @click:append="showPassword = !showPassword"
                            :append-icon="showPassword ?  'mdi-eye' : 'mdi-eye-off-outline'"
                            :prepend-inner-icon="showPassword ?  'mdi-lock-open' : 'mdi-lock'"
                            outlined
                            color="#005598"
                            dense
                        />
                        <v-card-actions>
                            <v-btn @click="e1=1" text icon>
                                <v-icon large>mdi-chevron-left</v-icon>
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
    </v-form>
</template>

<script>
import validations from "@/validations/validations";
import Auth from "@/services/Auth";
import router from "@/router";
import {mapActions} from 'vuex';

    export default {
        data() {
            return {
                valid:false,
                valid1:false,
                valid2:false,
                loading:false,
                showPassword: false,
                e1:1,
                ...validations,
                data:{
                    nombre: "",
                    apellido: "",
                    email: "",
                    password: "",
                    login: "",
                    fotografia: "perfil.jpg",
                    perfil_id: 3
                }
            }
        },
        methods:{
            ...mapActions(['logged']),

            signup(){
                this.loading = true;
                Auth().post("/signup",{data:this.data}).then((response) => {
                    this.logged(response.data);
                    this.$toasted.success("Se registro exitosamente"+response.data.nombre, { 
                        theme: "toasted-primary", 
                        position: "top-right", 
                        duration : 2000,
                        icon : "done",
                    });
                    this.loading = false;
                    router.push('/');
                }).catch((e) =>{
                    this.$toasted.error("Oops, Error al intentar registrarse.", { 
                        theme: "toasted-primary", 
                        position: "top-right", 
                        duration : 2000,
                        icon : "error",
                    });
                    this.loading = false;
                });
            }
        }
    }
</script>