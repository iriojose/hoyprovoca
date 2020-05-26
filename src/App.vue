<template>
    <v-app style="background-color:#f7f7f7;">
        <AppBar v-if="ruta() "/>
        
        <transition name="fade">
            <router-view/>
        </transition> 

        <ModalBloqueado /> 
        <ModalProducto />
        <ModalSesion />
        <ModalImagen />

        <Footer v-if="ruta()" class="margen" />
    </v-app>
</template>

<script>
import AppBar from '@/components/navbar/AppBar';
import ModalBloqueado from '@/components/dialogs/ModalBloqueado';
import ModalImagen from '@/components/dialogs/ModalImagen';
import ModalProducto from '@/components/dialogs/ModalProducto';
import ModalSesion from '@/components/dialogs/ModalSesion';
import Footer from '@/components/footer/Footer';

    export default {
        name: 'App',
        components:{
            AppBar,
            ModalBloqueado,
            ModalProducto,
            ModalSesion,
            ModalImagen,
            Footer,
        },
        methods:{
            ruta(){
                if(
                    this.$route.name == 'login' || 
                    this.$route.name == 'forgot' ||
                    this.$route.name == 'register' ||
                    this.$route.name == 'notauthorized' ||
                    this.$route.name == 'notfound' ||
                    this.$route.name == 'checkout' ||
                    this.$route.name == 'prueba' ||
                    this.$route.name == 'comopagar' || 
                    this.$route.name == 'terminosycondiciones' ||
                    this.$route.name == 'privacidad'
                ){
                    return false;
                }else{
                    return true;
                }
            },
        }
    }
</script>

<style>
    html {
        scroll-behavior: smooth;
    }
    .margen{
        margin-top:150px;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to{
        opacity: 0;
    }
    ::-webkit-scrollbar {
        width: 8px;     
        height: 8px;   
    }
    ::-webkit-scrollbar-thumb {
        background: #ccc;
        border-radius: 12px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: #b3b3b3;
        box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
    }
    ::-webkit-scrollbar-thumb:active {
        background-color: #999999;
    }
    ::-webkit-scrollbar-track {
        background: #fff;
        border-radius: 12px;
    }
    ::-webkit-scrollbar-track:hover,
    ::-webkit-scrollbar-track:active {
        background: #fff;
    }
    
</style>