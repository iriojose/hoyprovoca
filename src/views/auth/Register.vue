<template>
    <div>
        <v-toolbar elevation="0" color="#005598" width="100%">
            <v-toolbar-items>
                <v-btn color="#005598" elevation="0" to="/" icon>
                    <v-icon large color="#fff">
                        home
                    </v-icon>
                </v-btn>
            </v-toolbar-items>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn color="#005598" elevation="0" to="/login">
                    <span class="white--text">
                        Inicia sesión
                    </span>
                    <v-icon x-large color="#fff">
                        keyboard_arrow_right
                    </v-icon>
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>

        <!-- <v-tabs class="mt-2" color="#005598" background-color="#eee" centered>
            <v-tab to="/register/cliente">Persona</v-tab>
            <v-tab to="/register/empresa">Compañia</v-tab>
        </v-tabs> -->

        <transition name="slide-fade">
            <router-view />
        </transition>

        <v-footer fixed>
            <SubFooter />
        </v-footer>
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
