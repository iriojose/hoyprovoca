<template>
    <div>
        <v-app-bar app height="50">
            <v-btn to="/login" elevation="0">
                <v-icon x-large>
                    keyboard_arrow_left
                </v-icon>
                volver
            </v-btn>

            <v-toolbar-title class="color mx-8">Bienvenido a Aftim</v-toolbar-title>
        </v-app-bar>

        <v-row class="mt-2">
            <v-col cols="12" md="6" lg="6" sm="6" offset="3">
                
                <v-tabs color="#005598" background-color="#f5f5f5" centered v-on="on">
                    <v-tab to="/register/cliente">Persona</v-tab>
                    <v-tab to="/register/empresa">Compañia</v-tab>
                </v-tabs>
            </v-col>
        </v-row>

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
        color: #005598;
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
