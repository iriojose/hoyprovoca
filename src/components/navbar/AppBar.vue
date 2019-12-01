<template>
    <div>
        <BarraLateral />
        <v-app-bar app elevation="3" height="80">

            <v-app-bar-nav-icon  
                @click="change()" 
                v-if="drawer==false"
                class="ml-2"
            />
            <v-btn v-else  @click="change()" icon depressed class="ml-2">
                <v-icon :color="color ? '#fff':null">
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
                :color="color ? '#000':'#005598'"
                single-line
            />

            <v-spacer/>
            <v-divider vertical class="hidden-sm-and-down"></v-divider>
            <v-toolbar-items v-if="user.loggedIn">
                <v-btn icon class="mx-3" to="/account/notificaciones">
                    <v-icon size="35">notifications</v-icon>
                </v-btn>
            </v-toolbar-items>

            <v-toolbar-items v-if="user.loggedIn">
                <v-btn icon class="mx-3">
                    <v-icon size="35">shopping_cart</v-icon>
                </v-btn>
            </v-toolbar-items>

            <v-toolbar-items v-if="!user.loggedIn">
                <v-btn text to="/login" >
                    Iniciar sesión
                </v-btn>
            </v-toolbar-items>

            <v-toolbar-items v-if="user.loggedIn">
                <v-menu
                    :transition="transition()"
                    bottom
                    open-on-hover 
                    offset-y
                >
                    <template v-slot:activator="{ on }">
                        <v-avatar color="#f5f5f5" class="mx-3 my-3 elevation-3">
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
                    {text:'Ajustes de cuentas',path:'/account/profile',icon:'build'},
                    {text:'Agregar metodo de pago',path:'/account/metodo-de-pago',icon:'credit_card'},
                    {text:'centro de ayuda',path:'/account/ayuda',icon:'help'},
                ],
                loading:false
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
        color:#005598;
    }
</style>