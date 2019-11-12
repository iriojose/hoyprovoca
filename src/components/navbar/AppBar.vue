<template>
    <div>
        <BarraLateral />
        <v-app-bar app elevation="3">
            <v-app-bar-nav-icon @click="change()" v-if="drawer==false"/>
            <v-icon v-else  @click="change()">
                close
            </v-icon>

            <v-toolbar-title class="mx-8 text-center">
                <v-btn text router to="/">
                    <v-img src="@/assets/log.png"></v-img>
                </v-btn>
            </v-toolbar-title>
                
            <v-text-field
                v-model="busquedas"
                label="Search store..."
                append-icon="search"
                color="#005598"
                hide-details
                outlined
                dense
                rounded
                v-on:keyup.enter="search"
                class="hidden-sm-and-down"
            />
                
            <v-spacer />
            <v-divider vertical class="hidden-sm-and-down color"></v-divider>

            <v-toolbar-items v-if="user.loggedIn==false">
                <v-hover v-slot:default="{ hover }">
                    <v-btn text to="/login" :color="hover ? 'dark':null">
                        Iniciar sesión
                    </v-btn>
                </v-hover>
            </v-toolbar-items>

            <v-toolbar-items v-if="user.loggedIn">
                <v-menu
                    :transition="transition()"
                    bottom
                    open-on-hover 
                    offset-y
                >
                    <template v-slot:activator="{ on }">
                        <v-avatar color="#f5f5f5" class="mx-3 my-1 elevation-3">
                            <v-btn icon v-on="on">
                                <v-icon size="30">person</v-icon>
                            </v-btn>
                        </v-avatar>
                    </template>
                    <!-- lista de opciones-->
                    <v-card>
                        <v-list dense>
                            <v-list-item>
                                <v-list-item-avatar color="grey" dark>
                                    <!-- <img :src="dont" alt="John" width="30" height="30"> -->
                                    IG
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title>Irio Gomez</v-list-item-title>
                                </v-list-item-content>

                            </v-list-item>
                        </v-list>

                        <v-divider></v-divider>

                        <v-list dense rounded>
                            <v-list-item v-for="item in link" :key="item.text" :to="item.path">
                                <v-list-item-title>
                                    {{item.text}}
                                </v-list-item-title>
                            </v-list-item>

                            <v-divider/>

                            <v-list-item>
                                <v-list-item-title @click="logOut()">
                                    Cerrar sesion
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-card>
                </v-menu>
            </v-toolbar-items>

            <v-toolbar-items v-if="user.loggedIn">
                <v-btn icon class="mx-3">
                    <v-icon size="30">shopping_cart</v-icon>
                </v-btn>
            </v-toolbar-items>

        </v-app-bar>
    </div>
</template>

<script>
import router from '@/router';
import SubNavbar from './SubNavbar';
import {mapState,mapActions,mapGetters} from  'vuex';
import BarraLateral from './BarraLateral';
import firebase from 'firebase';

    export default {
        components:{
            SubNavbar,
            BarraLateral
        },
        data(){
            return {
                busquedas:'',
                link:[
                    {text:'Ajustes de cuentas',path:'/account/profile'},
                    {text:'Agregar tarjeta de credito',path:'/account/credit-card'},
                    {text:'centro de ayuda',path:'/account/ayuda'},
                ]
            }
        },
        computed: {
            ...mapState(['drawer']),

            ...mapGetters({
                user: "user"
            })
        },
        methods: {
            ...mapActions(['setDrawer']),

            transition(){
                return "slide-y-transition"
            },
            search() {
                router.push("/search");
            },
            change(){
                if(this.drawer==true){
                    this.setDrawer(false);
                }else{
                    this.setDrawer(true);
                }
            },

            logOut(){
                firebase.auth().signOut().then(() => {
                    this.$router.replace({ name: "login" });
                });
            }
        },
    }
</script>

<style lang="scss" scoped>
    .color{
        color:black;
    }
</style>