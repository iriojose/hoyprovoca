<template>
    <div>
        <v-app-bar app height="50">
            <v-btn text to="/login" elevation="0" depressed>
                <v-icon x-large>
                    keyboard_arrow_left
                </v-icon>
                volver
            </v-btn>

            <v-toolbar-title class="color">Bienvenido a Aftim</v-toolbar-title>
        </v-app-bar>

        <v-tabs class="mt-2" color="#005598" background-color="#eee" centered>
            <v-tab to="/register/cliente">Persona</v-tab>
            <v-tab to="/register/empresa">Compañia</v-tab>
        </v-tabs>

       <transition name="slide-fade">
            <router-view />
       </transition>
    
        <SubFooter />
    </div>
</template>

<script>
import SubFooter from '@/components/footer/SubFooter';

    export default {
        components:{
            SubFooter,
        }
    }
</script>

<style scoped>
    .color{
        color: #6c63ff;
    }

    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */ {
        transform: translateX(10px);
        opacity: 0;
    }
</style>
