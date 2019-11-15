<template>
    <div>
        <v-card color="#f5f5f5" elevation="4">
            <v-img gradient="to bottom right, rgba(0,0,0,.1), rgba(0,0,0,.5)" 
                    height="400" 
                    :src="aliado.imagen2">
                <v-row>
                    <v-col cols="12" md="5" sm="10" lg="5" class="mt-12 mx-10">
                        <v-card elevation="5" width="100%"  height="250">
                            <v-card-title class="mx-10 headline font-weight-bold">
                                {{aliado.nombre}}
                            </v-card-title>
                            <div>
                                <p class="my-5 mx-10 overline font-weight-bold">
                                    <span class="green--text">$$</span>
                                    • {{aliado.tipo1}} • 
                                    {{aliado.tipo2}} • 
                                    {{aliado.tipo3}} •
                                    {{aliado.tipo4}}...
                                </p>

                                <p class="my-5 mx-10 overline font-weight-bold">
                                    {{aliado.ubicacion}} •
                                    <router-link to="" class="green--text">
                                        <span class="green--text">
                                            Mas información
                                        </span>
                                    </router-link>
                                </p>
                            </div>
                        </v-card>
                    </v-col>
                </v-row>
            </v-img>
        </v-card>

        <v-tabs 
            color="#000" 
            centered class="mt-5" 
            background-color="#f5f5f5"
        >
            <v-tabs-slider></v-tabs-slider>
            <v-tab 
                v-for="n in num" 
                :key="n.id"
                :href="`#tab-${n.id}`"
            >
                {{n.id}}
            </v-tab>

            <v-tab-item
                v-for="n in num" 
                :key="n.id"
                :value="'tab-' + n.id"
                class="color"
            >
                <v-card class="mx-10 mt-10" elevation="0" color="#f5f5f5" height="400" width="100%">
                    <span class="subtitle-1 font-weight-bold">{{n.id}}</span>
                    <v-row>
                        <v-col cols="12" md="3">
                            <v-card height="150" width="100%">
                                <v-layout row>
                                    <v-flex md6 sm6>
                                        <div class="mx-3">producto</div>
                                    </v-flex>
                                    <v-flex md6 sm6 lg6 class="mt-2">
                                        <v-img height="135" width="90%" src="https://cdn.pixabay.com/photo/2014/06/11/17/00/cook-366875_960_720.jpg" />
                                    </v-flex>
                                </v-layout>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card>
            </v-tab-item>
            
        </v-tabs>
        
    </div>
</template>

<script>
import router from '@/router';
import firebase from 'firebase';

    export default {
        data() {
            return {
                num:[
                    {id:'Sugeridos'},
                    {id:'Promociones'},
                    {id:'Calorias'},
                    {id:'Nuevos'}
                ],
                aliado:{
                    nombre:'',
                    ubicacion:'',
                    tipo1:'',
                    tipo2:'',
                    tipo3:'',
                    tipo4:'',
                    imagen2:''
                },
                activo:false
            }
        },

        watch:{
            aliado(){
                this.activo=true;
                console.log(this.activo);
            }
        },

        mounted() {
            this.getAliado();  
        },

        methods: {
            async getAliado(){
                var uid = this.$route.params.id;
                var ref = await firebase.firestore().collection('aliados').doc(uid);

                ref.onSnapshot( snap => {
                    this.aliado.nombre = snap.data().nombre;
                    this.aliado.ubicacion = snap.data().ubicacion;
                    this.aliado.imagen2 = snap.data().imagen2;
                    this.aliado.tipo1 = snap.data().tipo1;
                    this.aliado.tipo2 = snap.data().tipo2;
                    this.aliado.tipo3 = snap.data().tipo3;
                    this.aliado.tipo4 = snap.data().tipo4;
                });
           }
        },
    }
</script>
 <style scope>
    .mapa{
        height:200px;
    }

    .color{
        background-color: #f5f5f5;
    }
 </style>