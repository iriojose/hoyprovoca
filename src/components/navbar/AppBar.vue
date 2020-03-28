<template>
    <div>
        <BarraLateral />

        <v-app-bar color="#005598" app
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

            <v-toolbar-title>
                <v-btn to="/" text class="mx-3">
                    <v-img 
                        contain 
                        width="120"  
                        src="@/assets/logoaftim.png"
                    />
                </v-btn>
            </v-toolbar-title>

            <v-text-field
                v-model="busquedas"
                label="Buscar producto..."
                append-icon="search"
                hide-details
                dense 
                outlined
                v-on:keyup.enter="push"
                class="hidden-sm-and-down ml-10"
                background-color="#fff"
                color="secondary"
                single-line
            />

            <v-spacer></v-spacer>

            <v-btn v-if="user.loggedIn" icon class="mx-2" to="/account/notificaciones">
                <v-badge transition="fade-transition" color="#232323" left overlap>
                    <v-icon size="25" color="#fff">notifications</v-icon>
                    <template v-slot:badge>
                        0
                    </template>
                </v-badge>
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

        <v-toolbar dense color="#005598" width="100%" class="px-5 fix" v-if="$vuetify.breakpoint.smAndDown">
            <v-text-field
                v-model="busquedas"
                label="Buscar producto..."
                append-icon="search"
                hide-details
                dense 
                outlined
                v-on:keyup.enter="push"
                background-color="#fff"
                color="#secondary"
                single-line
                class="mx-5"
            />
        </v-toolbar>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex';
import BarraLateral from '@/components/navbar/BarraLateral';
import Perfil from './Perfil';
import Carrito from './Carrito';
import router from '@/router';

    export default {
        components:{
            BarraLateral,
            Carrito,
            Perfil
        },
        computed: {
            ...mapState(['drawer','user','search']),

            busquedas:{
                get(){ return this.search},
                set(val){ this.setBuscar(val)}
            },
        },
        methods: {
            ...mapActions(['setDrawer']),
            
            change(){
                this.drawer ? this.setDrawer(false):this.setDrawer(true);
            },
            push(){ router.push("/search") }
        },
    }
</script>

<style scoped>
    .fix{
        position:fixed;
        z-index:3;
        top: 56px;
    }
</style>