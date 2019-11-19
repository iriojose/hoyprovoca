<template>
    <div>
        <v-app-bar app>
            <v-btn to="/login" elevation="0">
                <v-icon x-large>
                    keyboard_arrow_left
                </v-icon>
                volver
            </v-btn>

            <v-toolbar-title class="color mx-8">Bienvenido a Aftim</v-toolbar-title>
        </v-app-bar>

        <v-row class="my-4">
            <v-col cols="12" md="6" lg="6" sm="6" offset="3">
                <v-tabs color="#005598" background-color="#f5f5f5" centered>
                    <v-tab to="/register/cliente">Persona</v-tab>
                    <v-tab to="/register/empresa">Compañia</v-tab>
                </v-tabs>
            </v-col>
        </v-row>

        
        <div>
            <router-view />
        </div>
        
        <FooterAuth />
        <SubFooter />
    </div>
</template>

<script>
import SubFooter from '@/components/footer/SubFooter';
import FooterAuth from '@/components/vistaAuth/FooterAuth';

    export default {
        components:{
            SubFooter,
            FooterAuth
        }
    }
</script>

<style scoped>
    .color{
        color: #005598;
    }
</style>
