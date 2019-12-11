<template>
    <v-toolbar-items v-if="user.loggedIn">
        <v-menu
            :transition="transition()"
            bottom
            open-on-hover 
            offset-y
        >
            <template v-slot:activator="{ on }">
                <v-avatar color="#f5f5f5" class="mx-3 mt-1 elevation-3">
                    <v-btn icon v-on="on">
                        <v-icon size="35">person</v-icon>
                    </v-btn>
                </v-avatar>
            </template>
            <!-- lista de opciones-->
            <v-card width="300">
                <v-list >
                    <v-list-item>
                        <v-list-item-avatar color="grey" dark size="70">
                            <img :src="imagen">
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title>{{nombre+' '+apellido}}</v-list-item-title>
                        </v-list-item-content>

                    </v-list-item>
                </v-list>

                <v-divider></v-divider>

                <v-list>
                    <v-list-item v-for="item in link" :key="item.text" :to="item.path">   
                        <v-list-item-icon>
                            <v-icon color="">{{item.icon}}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>
                            {{item.text}}
                        </v-list-item-title>
                                
                    </v-list-item>

                    <v-divider/>
                    <v-hover v-slot:default="{hover}">
                        <v-list-item @click="logOut()">
                            <v-list-item-icon>
                                <v-icon :color="hover ? '#005598':null">
                                    power_settings_new
                                </v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>
                                Cerrar sesión
                            </v-list-item-title>
                        </v-list-item>
                    </v-hover>
                </v-list>
            </v-card>
        </v-menu>
    </v-toolbar-items>
</template>

<script>
import {mapGetters,mapActions} from  'vuex';

    export default {
        data(){
            return{
                imagen:'https://us.123rf.com/450wm/thesomeday123/thesomeday1231712/thesomeday123171200009/91087331-icono-de-perfil-de-avatar-predeterminado-para-hombre-marcador-de-posici%C3%B3n-de-foto-gris-vector-de-ilustr.jpg?ver=6',
                nombre:'irio',
                apellido:'gomez',
                link:[
                    {text:'Ajustes de cuentas',path:'/account/profile',icon:'build'},
                    {text:'Agregar metodo de pago',path:'/account/metodo-de-pago',icon:'credit_card'},
                    {text:'Centro de ayuda',path:'/account/ayuda',icon:'help'},
                ],
            }
        },
        computed: {
            ...mapGetters({
                user: "user"
            }),
        },
        methods: {
            ...mapActions(['logout']),

            transition(){
                return "slide-y-transition"
            },

            async getImage(){//metodo que trae el usuario
                
            },

            logOut(){
                //logout
            },
        },
        mounted(){
            //this.getImage();
        }
    }
</script>
