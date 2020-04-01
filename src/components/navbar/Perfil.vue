<template>
    <div v-if="user.loggedIn">
        <v-menu
            :transition="transition()"
            bottom
            open-on-hover 
            offset-y
        >
            <template v-slot:activator="{ on }">
                <v-avatar color="#f5f5f5" size="40" class="mx-2 elevation-3">
                    <v-btn icon v-on="on">
                        <v-icon>person</v-icon>
                    </v-btn>
                </v-avatar>
            </template>
            <!-- lista de opciones-->
            <v-card id="cono">
                <v-list width="250" elevation="0">
                    <v-list-item class="border">
                        <v-list-item-avatar>
                            <v-img :src="image+user.data.fotografia"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title v-text="user.data.nombre+' '+user.data.apellido"></v-list-item-title>
                            <v-list-item-subtitle>Cliente</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
                <v-divider></v-divider>
                <v-list dense>
                    <v-hover v-slot:default="{hover}">
                        <v-list-item to="/account/profile">   
                            <v-list-item-icon>
                                <v-icon :color="hover ? '#005598':null">settings</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>
                                Ajustes
                            </v-list-item-title>        
                        </v-list-item>
                    </v-hover>
                    <v-hover v-slot:default="{hover}">
                        <v-list-item @click="logOut()">   
                            <v-list-item-icon>
                                <v-icon :color="hover ? '#005598':null">exit_to_app</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>
                                Cerrar sesíon
                            </v-list-item-title>        
                        </v-list-item>
                    </v-hover>
                </v-list>
            </v-card>
        </v-menu>
    </div>
</template>

<script>
import {mapActions,mapState} from 'vuex';
import variables from '@/services/variables_globales';
import router from '@/router';

    export default {
        data() {
            return {
                ...variables
            }
        },
        computed: {
            ...mapState(['user'])
        },
        methods: {
            ...mapActions(['logout']),

            transition(){
                return "slide-y-transition"
            },
            logOut(){
                this.logout();
                router.push('/login');
            },
        },
    }
</script>