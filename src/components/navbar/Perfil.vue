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
                            <img :src="imagen" alt="JN">
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
import {mapGetters} from  'vuex';
import firebase from 'firebase';

    export default {
        data(){
            return{
                imagen:'',
                nombre:'',
                apellido:'',
                link:[
                    {text:'Ajustes de cuentas',path:'/account/profile',icon:'build'},
                    {text:'Agregar metodo de pago',path:'/account/metodo-de-pago',icon:'credit_card'},
                    {text:'centro de ayuda',path:'/account/ayuda',icon:'help'},
                ],
            }
        },
        computed: {
            ...mapGetters({
                user: "user"
            }),
        },
        methods: {
            transition(){
                return "slide-y-transition"
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
            },

            logOut(){
                firebase.auth().signOut().then(() => {
                    this.$router.replace({ name: "login" });
                });
            },
        },
        mounted(){
            this.getImage();
        }
    }
</script>
