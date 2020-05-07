<template>
    <v-app-bar color="#ffbd07" app
        :elevation="$vuetify.breakpoint.smAndDown ? 0:null" 
        :elevate-on-scroll="$vuetify.breakpoint.smAndDown ? false:true" 
        :extended="$vuetify.breakpoint.smAndDown && $route.name !== 'home' ? true:false"
    >
        <v-app-bar-nav-icon 
            v-if="drawer==false"
            @click="change"
        />

        <v-btn fab v-else  @click="change" icon depressed>
            <v-icon>
                mdi-close
            </v-icon>
        </v-btn>

        <v-spacer v-if="$vuetify.breakpoint.smAndDown"></v-spacer>

        <v-toolbar-title @click="push2" class="cursor">
            <v-img 
                contain
                width="100"
                height="60"
                src="@/assets/logo 3.png"
            />
        </v-toolbar-title>

        <v-text-field
            v-if="$route.name !== 'home'"
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
                <v-icon color="#D32F2F">mdi-magnify</v-icon>
            </v-btn>
        </v-text-field>

        <v-spacer></v-spacer>
            
        <v-btn 
            fab class="mx-3" 
            small 
            color="#232323"
            v-if="user.loggedIn && !$vuetify.breakpoint.smAndDown"
            @click="abrirModal"
        >
            <v-icon color="#fff">
                gps_fixed
            </v-icon>
        </v-btn>

        <v-btn 
            fab class="mx-3" 
            color="#232323"
            small to="/account/notificaciones"
            v-if="user.loggedIn && !$vuetify.breakpoint.smAndDown"
        >
            <v-icon color="#fff">
                mdi-bell
            </v-icon>
        </v-btn>

        <Carrito /> 
        <Perfil />
        <MovilOpciones />
            
        <div v-if="!user.loggedIn" class="hidden-sm-and-down">
            <v-btn text to="/login" class="mx-1 font-weight-bold text-capitalize">
                Iniciar sesión
            </v-btn>
                
            <v-hover v-slot:default="{hover}">
                <v-btn :elevation="hover ? 10:0" color="#232323" height="30" to="/register" class="mx-1 font-weight-bold white--text text-capitalize">
                    Registrate
                </v-btn>
            </v-hover>
        </div>

        <v-text-field 
            v-if="$vuetify.breakpoint.smAndDown && $route.name !=='home'"
            class="mx-5 index"
            slot="extension"
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
                <v-icon color="#D32F2F">mdi-magnify</v-icon>
            </v-btn>
        </v-text-field>

        <BarraLateral />
        <ModalUbicacion />
    </v-app-bar>
</template>

<script>
import {mapState,mapActions} from 'vuex';
import BarraLateral from '@/components/navbar/BarraLateral';
import ModalUbicacion from '@/components/dialogs/ModalUbicacion';
import Perfil from './Perfil';
import Carrito from './Carrito';
import MovilOpciones from './MovilOpciones';
import router from '@/router';

    export default {
        components:{
            BarraLateral,
            Carrito,
            Perfil,
            ModalUbicacion,
            MovilOpciones
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

<style scoped lang="scss">
    .cursor{
        cursor:pointer;
    }
    .index{
        z-index:0;
    }
</style>