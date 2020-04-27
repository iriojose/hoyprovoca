<template>
    <div>
        <v-form v-model="valid" class="mx-5">
            <v-text-field
                label="Usuario / Correo"
                v-model="data.user"
                type="email"
                outlined
                prepend-inner-icon="email"
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
                :append-icon="showPassword ?  'visibility' : 'visibility_off'"
                :prepend-inner-icon="showPassword ?  'lock_open' : 'lock'"
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

            <Snackbar :icon="icon" :color="color" :mensaje="mensaje"/>
        </v-form>
    </div>
    
</template>

<script>
import Auth from '@/services/Auth';
import validations from '@/validations/validations';
import Snackbar from '@/components/snackbars/Snackbar';
import {mapActions} from 'vuex';
import router from '@/router';

    export default {
        components:{
            Snackbar
        },
        data(){
            return {
                data: {
                    user: "",
                    password: "",
                },
                valid:false,
                ...validations,
                showPassword:false,
                mensaje:"",
                icon:"",
                color:"",
                loading:false,
            }
        },
        methods: {
            ...mapActions(['setSnackbar','logged','setModalSesion','setModalBloqueado']),

            success(nombre,apellido){
                this.color="#388E3C"
                this.icon = "done";
                this.mensaje = "Bienvenido "+nombre+" "+apellido+".";
                this.setSnackbar(true);
                this.loading = false;
                setTimeout(() =>{ 
                    if(this.$route.name=='login'){
                        router.push('/');
                    }
                    this.setModalSesion(false);
                },1000);
            },
            mensajeSnackbar(icon,mensaje,color){
                this.color = color;
                this.icon = icon;
                this.mensaje = mensaje;
                this.setSnackbar(true);
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
                        this.mensajeSnackbar("error","Usuario no permitido.","#D32F2F");
                    }
                }).catch(e => {
                    console.log(e);
                    this.mensajeSnackbar("error","Error al intentar ingresar al sistema.","#D32F2F");
                });
            }
        },
    }
</script>
