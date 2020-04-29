<template>
    <div>
        <BarraLateral />
        <ModalUbicacion />

        <v-app-bar color="#232323" app
            :elevation="$vuetify.breakpoint.smAndDown ? 0:null" 
            :elevate-on-scroll="$vuetify.breakpoint.smAndDown ? false:true" 
        >
            <v-app-bar-nav-icon 
                dark
                v-if="drawer==false"
                @click="change"
            />

            <v-btn fab v-else  @click="change" icon depressed>
                <v-icon color="#fff">
                    close
                </v-icon>
            </v-btn>

            <v-toolbar-title @click="push2" class="cursor">
                <v-img 
                    contain 
                    height="60"
                    width="100"  
                    src="@/assets/logo 4.png"
                />
            </v-toolbar-title>

            <v-text-field
                v-model="busquedas"
                label="Buscar producto..."
                hide-details
                dense 
                v-on:keyup.enter="push"
                solo
                class="ml-10 hidden-sm-and-down"
                single-line
                color="#232323"
            >
                <v-divider slot="append" vertical></v-divider>
                <v-btn slot="append" tile @click="push" text small>
                    <v-icon color="#D32F2F">search</v-icon>
                </v-btn>
            </v-text-field>

            <v-spacer></v-spacer>

            <v-divider vertical dark class="mx-2"></v-divider>
            
            <!--v-btn 
                fab class="mx-3" 
                small 
                v-if="user.loggedIn"
                @click="abrirModal"
            >
                <v-icon dark>
                    gps_fixed
                </v-icon>
            </v-btn-->

            <v-btn 
                fab class="mx-3" 
                small to="/account/notificaciones"
                v-if="user.loggedIn"
            >
                <v-icon dark>
                    notifications
                </v-icon>
            </v-btn>

            <Carrito /> 
            <Perfil />

            <div v-if="!user.loggedIn">
                <v-btn text to="/login" class="mx-1 font-weight-bold white--text text-capitalize">
                    Iniciar sesión
                </v-btn>
                
                <v-hover v-slot:default="{hover}">
                    <v-btn :elevation="hover ? 10:0" color="#fff" height="30" to="/register" class="mx-1 hidden-sm-and-down font-weight-bold color text-capitalize">
                        Registrate
                    </v-btn>
                </v-hover>
            </div>
        </v-app-bar>

        <v-toolbar dense color="#232323" width="100%" class="px-5 fix" v-if="$vuetify.breakpoint.smAndDown">
            <v-text-field
                v-model="busquedas"
                label="Buscar producto..."
                hide-details
                dense 
                v-on:keyup.enter="push"
                solo
                single-line
                color="#232323"
            >
                <v-divider slot="append" vertical></v-divider>
                <v-btn slot="append" tile @click="push" text small>
                    <v-icon color="#D32F2F">search</v-icon>
                </v-btn>
            </v-text-field>
        </v-toolbar>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex';
import BarraLateral from '@/components/navbar/BarraLateral';
import ModalUbicacion from '@/components/dialogs/ModalUbicacion';
import Perfil from './Perfil';
import Carrito from './Carrito';
import router from '@/router';

    export default {
        components:{
            BarraLateral,
            Carrito,
            Perfil,
            ModalUbicacion
        },
        computed: {
            ...mapState(['drawer','user','search','bandera']),

            busquedas:{
                get(){ return this.search},
                set(val){ this.setBuscar(val)}
            },
        },
        methods: {
            ...mapActions(['setDrawer','setBuscar','setBandera','setModalUbicacion']),
            
            change(){
                this.drawer ? this.setDrawer(false):this.setDrawer(true);
            },
            abrirModal(){
                this.setModalUbicacion(true);
            },
            push(){ 
                if(this.bandera){
                    this.setBandera(false);
                }else{
                    this.setBandera(true);
                }
                router.push("/search") 
            },
           
            push2(){ router.push('/')}
        },
    }
</script>

<style scoped>
    .fix{
        position:fixed;
        z-index:3;
        top: 56px;
    }
    .cursor{
        cursor:pointer;
    }
</style>