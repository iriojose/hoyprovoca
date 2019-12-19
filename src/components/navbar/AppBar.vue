<template>
    <div>
        <!--Barra lateral , solo sale un menu de grupos y subgrupos 
        de conceptos-->
        <BarraLateral />

        <!--navbar principal -->
        <v-app-bar 
            :elevation="$vuetify.breakpoint.smAndDown ? 0:null" 
            :elevate-on-scroll="$vuetify.breakpoint.smAndDown ? false:true" 
            fade-img-on-scroll 
            app 
            color="#005598"
        >

            <!--botones de abrir y cerrar la navegacion lateral -->
            <v-app-bar-nav-icon 
                dark
                @click="change()" 
                v-if="drawer==false"
            />
            <v-btn fab v-else  @click="change()" icon depressed>
                <v-icon color="#fff">
                    close
                </v-icon>
            </v-btn>
            
            <!--titulo y logo de la pagina -->
            <v-toolbar-title :class="$vuetify.breakpoint.smAndDown ? null:'mx-5'">
                <v-btn to="/" text>
                    <v-img 
                        contain 
                        width="120" 
                        height="120" 
                        src="@/assets/logo2.png"
                    />
                </v-btn>
            </v-toolbar-title>

            <!--text field para buscar conceptos,
                PD:al darle enter mientras se esta en focus
                redireccion a a la vista buscar
            -->
            <v-text-field
                v-model="busquedas"
                label="Buscar producto..."
                prepend-inner-icon="search"
                clearable
                hide-details
                dense 
                outlined
                v-on:keyup.enter="search"
                class="hidden-sm-and-down ml-10"
                background-color="#f7f7f7"
                color="#006788"
                single-line
            />

            <!--items de navegacion -->
            <v-spacer/>
            <v-divider dark vertical class="hidden-sm-and-down mx-2"></v-divider>
        
        <!--items mientras esta logeado -->
            <!--item notificacion-->
            <v-btn v-if="user.loggedIn" icon class="mx-2" to="/account/notificaciones">
                <v-badge transition="fade-transition" color="teal" left overlap>
                    <v-icon size="25" color="#fff">notifications</v-icon>
                    <template v-slot:badge>
                        0
                    </template>
                </v-badge>
            </v-btn>

             <!--y panel de carrito -->
            <ItemCarrito /> 

            <!--perfil del usuario -->
            <ItemPerfil />

            <!--mientras no se esta logeado -->
             <v-toolbar-items v-if="!user.loggedIn">
                <v-btn text to="/login" class="white--text">
                    Iniciar sesión
                </v-btn>
            </v-toolbar-items>

            <!--aparece al presionar buscar en el text field -->
            <v-progress-linear
                :active="loading"
                :indeterminate="loading"
                absolute
                bottom
                color="#fff"
            ></v-progress-linear>
        </v-app-bar>

        <!--toolbar para movil ,aparece cuando la pantalla esta en
            tamaño sm (sm=900px)
        -->
        <v-toolbar color="#005598" width="100%" class="px-5 fix" v-if="$vuetify.breakpoint.smAndDown">
            <v-text-field
                v-model="busquedas"
                label="Buscar producto..."
                prepend-inner-icon="search"
                clearable
                hide-details
                dense 
                outlined
                background-color="#f7f7f7"
                color="#006788"
                single-line
                v-on:keyup.enter="search"
                class="mx-5"
            />
        </v-toolbar>
    </div>
</template>

<script>
//router
import router from '@/router';
//components
import ItemCarrito from './ItemCarrito';
import ItemPerfil from './ItemPerfil';
import BarraLateral from './BarraLateral';
//vuex , (state globales)
import {mapState,mapActions,mapGetters} from  'vuex';

    export default {
        components:{
            BarraLateral,
            ItemCarrito,
            ItemPerfil
        },
        data(){
            return {
                busquedas:'',
                loading:false
            }
        },
        computed: {
            ...mapGetters(['user']),
            ...mapState(['drawer']),
        },
        methods: {
            ...mapActions(['setDrawer']),
            
            search() {//metodo para cambiar a la vista buscar
                this.loading=true;
                setTimeout(() => {
                    this.loading=false;
                    router.push("/search");
                },1000);
            },
            change(){//cambia el valor de la barra de navegacion
                if(this.drawer==true){
                    this.setDrawer(false);
                }else{
                    this.setDrawer(true);
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .color{
        color:#005598;
    }
    .fix{
        position:fixed;
        z-index:3;
        top: 56px;
        
    }
    .margen{
        margin-top:65px;
    }
</style>