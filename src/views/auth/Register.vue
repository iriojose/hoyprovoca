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
                   

                <v-tooltip right>
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark v-on="on">Button</v-btn>
                    </template>
                <span> 
                    <v-img contain width="300" height="300" :src="require('@/assets/undrawregistro.svg')">
                    </v-img>
                </span>
                </v-tooltip>

                <v-menu open-on-hover right offset-x transition="slide-x-transition">
                    <template v-slot:activator="{ on }">
                        <v-btn
                            color="primary"
                            dark
                            v-on="on"
                        >
                            Dropdown
                        </v-btn>
                    </template>
                    <v-card class="pa-2">
                        <v-img contain width="400" height="400" :src="require('@/assets/undrawregistro.svg')">
                            completa el formulario
                        </v-img>
                    </v-card>
                </v-menu>
            </v-col>
        </v-row>

        
        <div>
            <router-view />
        </div>
    
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
</style>
