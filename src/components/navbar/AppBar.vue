<template>
    <div>
        <BarraLateral />
        <v-app-bar app elevation="3" id="scroll-target">

            <v-app-bar-nav-icon @click="change()" v-if="drawer==false"/>
            <v-btn v-else  @click="change()" icon depressed>
                <v-icon>
                    close
                </v-icon>
            </v-btn>
               
            <v-toolbar-title class="mx-8 text-center">
                <v-btn text router to="/">
                    <v-img src="@/assets/log.png"></v-img>
                </v-btn>
            </v-toolbar-title>

            <v-progress-linear
                :active="loading"
                :indeterminate="loading"
                absolute
                bottom
                color="#005598"
            ></v-progress-linear>

            <v-text-field
                v-model="busquedas"
                label="Buscar producto..."
                prepend-inner-icon="search"
                clearable
                hide-details
                dense 
                outlined
                v-on:keyup.enter="search"
                class="hidden-sm-and-down mx-8"
                background-color="#f7f7f7"
                color="#999"
                single-line
            />

            <v-spacer/>
            <v-divider vertical class="hidden-sm-and-down color"></v-divider>
            <v-toolbar-items v-if="user.loggedIn">
                <v-btn icon class="mx-3" to="/account/notificaciones">
                    <v-icon size="30">notifications</v-icon>
                </v-btn>
            </v-toolbar-items>

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
                                    <img :src="imagen" alt="JN">
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title>{{nombre+' '+apellido}}</v-list-item-title>
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
                                    Cerrar sesión
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
                imagen:'',
                nombre:'',
                apellido:'',
                link:[
                    {text:'Ajustes de cuentas',path:'/account/profile'},
                    {text:'Agregar tarjeta de credito',path:'/account/credit-card'},
                    {text:'centro de ayuda',path:'/account/ayuda'},
                ],
                loading:false,
                scroll:0,
            }
        },
        computed: {
            ...mapState(['drawer']),

            ...mapGetters({
                user: "user"
            }),
        },

        methods: {
            ...mapActions(['setDrawer']),

            onScroll (e) {
                this.offsetTop = e.target.scrollTop
            },

            transition(){
                return "slide-y-transition"
            },

            search() {
                this.loading=true;
                setTimeout(() => {
                    this.loading=false;
                    router.push("/search");
                },3000);
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
            },
            async getImage(){
                let uid = await firebase.auth().currentUser.uid;
                var ref = await firebase
                    .firestore()
                    .collection("profile")
                    .doc(uid);

                ref.onSnapshot(snap => {
                    this.imagen= snap.data().imagen;
                    this.nombre=snap.data().nombre;
                    this.apellido=snap.data().apellido;
                });
                    
            }
        },
        mounted(){
            this.getImage();
        }
    }
</script>

<style lang="scss" scoped>
    .color{
        color:black;
    }
</style>