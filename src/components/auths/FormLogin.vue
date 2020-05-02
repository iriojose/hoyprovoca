<template>
    <div>
        <v-form v-model="valid" class="mx-5">
            <v-text-field
                label="Usuario / Correo"
                v-model="data.user"
                type="email"
                outlined
                prepend-inner-icon="mdi-email"
                color="#005598"
                dense
                :disabled="loading"
                single-line
                :rules="[required('Usuario / Correo'), maxLength('Usuario / Correo',100)]"
            />    
            <v-text-field
                v-model="data.password"
                label="Contraseña"
                single-line
                :type="showPassword ? 'text' : 'password'"
                :rules="[required('Contraseña'), minLength('Contraseña',8)]"
                @click:append="showPassword = !showPassword"
                :append-icon="showPassword ?  'mdi-eye' : 'mdi-eye-off-outline'"
                :prepend-inner-icon="showPassword ?  'mdi-lock-open' : 'mdi-lock'"
                outlined
                color="#005598"
                :disabled="loading"
                dense
            />  
            <v-hover v-slot:default="{hover}" open-delay="200">
                <v-btn 
                    block 
                    type="submit" 
                    class="text-capitalize mt-5"
                    :disabled="!valid || loading" 
                    :color="hover ? '#388E3C':'#43A047'" 
                    :dark="valid && !loading"
                    :loading="loading"
                    :elevation="hover ? 5:0"
                    @click="login()"
                >
                    Iniciar Sesión
                </v-btn>
            </v-hover>
        </v-form>
    </div>
    
</template>

<script>
import Auth from '@/services/Auth';
import validations from '@/validations/validations';
import {mapActions} from 'vuex';
import router from '@/router';

    export default {
        data(){
            return {
                data: {
                    user: "",
                    password: "",
                },
                valid:false,
                ...validations,
                showPassword:false,
                loading:false,
            }
        },
        methods: {
            ...mapActions(['logged','setModalSesion','setModalBloqueado']),

            success(nombre,apellido){
                this.$toasted.success("Bienvenido "+nombre+" "+apellido+".", { 
                    theme: "toasted-primary", 
                    position: "top-right", 
                    duration : 2000,
                    icon : "done",
                });
                this.loading = false;
                setTimeout(() =>{ 
                    if(this.$route.name=='login'){
                        router.push('/');
                    }
                    this.setModalSesion(false);
                },1000);
            },
            mensajeSnackbar(icon,mensaje){
                this.$toasted.error(mensaje, { 
                    theme: "toasted-primary", 
                    position: "top-right", 
                    duration : 2000,
                    icon : icon,
                });
                this.loading = false;
            },
            login(){
                this.loading = true;
                Auth().post("/login",{data:this.data}).then((response) =>{
                    if(response.data.data.perfil_id == 4){
                        this.setModalBloqueado(true);
                        this.loading = false;
                    }else if(response.data.data.perfil_id == 3){
                        this.logged(response.data);
                        this.success(response.data.data.nombre,response.data.data.apellido);
                    }else{
                        this.mensajeSnackbar("error","Usuario no permitido.");
                    }
                }).catch((e) => {
                    this.mensajeSnackbar("error","Error al intentar ingresar al sistema.");
                });
            }
        },
    }
</script>
