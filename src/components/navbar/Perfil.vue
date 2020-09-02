<template>
    <div v-if="user.loggedIn && !$vuetify.breakpoint.smAndDown">
        <v-menu
            :transition="transition()"
            bottom
            open-on-hover 
            offset-y
            style="box-shadow: 0 5px 5px -3px rgba(0,0,0,0), 0 8px 10px 1px rgba(0,0,0,0), 0 3px 14px 2px rgba(0,0,0,0);padding: 2px 12px;"
        >
            <template v-slot:activator="{ on }">
                <v-btn v-on="on" fab class="mx-3" elevation="0" small color="transparent">
                    <v-icon :color="theme.background.font">
                        mdi-account-circle
                    </v-icon>
                </v-btn>
            </template>
            <!-- lista de opciones-->
            <v-card  :color="theme.background.primary" class="customized">
                <v-list :style="`background-color:${theme.background.light_2}`" width="250" elevation="0">
                    <v-list-item class="border">
                        <v-list-item-avatar size="70">
                            <v-img
                                :src="user.data.imagen === 'default.png' && !fotoChanged? fotoChanged ? foto  : require('@/assets/user.jpg') :  fotoChanged ? foto : image+user.data.imagen"
                            ></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title :style="`color:${theme.background.font}`" v-text="user.data.nombre+' '+user.data.apellido"></v-list-item-title>
                            <v-list-item-subtitle :style="`color:${theme.background.font}`">Cliente</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
                <v-divider></v-divider>
                <v-list dense :style="`background-color:${theme.background.light_2}`">
                    <v-hover v-slot:default="{hover}">
                        <v-list-item to="/account/profile">   
                            <v-list-item-icon>
                                <v-icon :color="hover ? theme.background.font:null">mdi-cogs</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title :style="`color:${theme.background.font}`">
                                Ajustes
                            </v-list-item-title>        
                        </v-list-item>
                    </v-hover>
                    <v-hover v-slot:default="{hover}">
                        <v-list-item to="/account/ordenes">   
                            <v-list-item-icon>
                                <v-icon :color="hover ? theme.background.font:null">mdi-arrow-down-bold-box</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title :style="`color:${theme.background.font}`">
                                Últimas ordenes
                            </v-list-item-title>        
                        </v-list-item>
                    </v-hover>
                    <v-hover v-slot:default="{hover}">
                        <v-list-item @click="logOut()">   
                            <v-list-item-icon>
                                <v-icon :color="hover ? theme.background.font:null">mdi-exit-to-app</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title :style="`color:${theme.background.font}`">
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
            ...mapState(['user','fotoChanged','foto','theme']),
        },
        methods: {
            ...mapActions(["logout","setFotoChanged","setFoto"]),
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

<style lang="scss" scoped>
    .customized {
        margin-top: 10px;
    }
    .customized {
        border: 1px solid #d5cec8;
        display: block;
        background: white;
    }
    .customized:before,
    .customized:after {
        content: " ";
        height: 0;
        position: absolute;
        width: 0;
        border: 11px solid transparent;
        /* arrow size */
        right: 1%;
        transform: translateX(-100%);
    }
    .customized:before {
        border-bottom: 12px solid rgba(0, 0, 0, 0.1);
        border-right: 12px solid rgba(0, 0, 0, 0);
        border-top: 12px solid rgba(0, 0, 0, 0);
        content: "";
        display: inline-block;
        position: absolute;
        top: -24px;
    }
    .customized:after {
        border-bottom: 12px solid #fff;
        border-right: 12px solid rgba(0, 0, 0, 0);
        border-top: 12px solid rgba(0, 0, 0, 0);
        content: "";
        display: inline-block;
        position: absolute;
        top: -22px;
    }
</style>