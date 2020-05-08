<template>
    <v-dialog v-model="ubicacion" width="400" close-delay transition="dialog-bottom-transition" >
        <v-card width="400">
            <v-card-title class="font-weight-black">
                <v-hover v-slot:default="{hover}" v-if="e1!==1">
                    <v-btn text fab small @click="back" >
                        <v-icon :color="hover ? '#D32F2F':'#232323'">mdi-chevron-left</v-icon>
                    </v-btn>
                </v-hover>

                <v-spacer></v-spacer>
                Nueva esparta
                <v-spacer></v-spacer>

                <v-hover v-slot:default="{hover}">
                    <v-btn text fab small @click="close">
                        <v-icon :color="hover ? '#D32F2F':'#232323'">mdi-close</v-icon>
                    </v-btn>
                </v-hover>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-row justify="center" v-if="e1 == 1">
                    <v-stepper v-model="e1" class="elevation-0">
                        <v-stepper-items class="elevation-0">
                            <v-stepper-content step="1" class="elevation-0">
                                <v-list dense width="250">
                                    <v-list-item v-for="(ciudad,i) in ciudades" :key="i" @click="citySelect(ciudad)">
                                        <v-list-item-title>
                                            {{ciudad.text}}
                                        </v-list-item-title>
                                        <v-list-item-icon>
                                            <v-icon>mdi-chevron-right</v-icon>
                                        </v-list-item-icon>
                                    </v-list-item>
                                </v-list>
                            </v-stepper-content>
                        </v-stepper-items>
                    </v-stepper>
                </v-row>
                <v-card v-else width="100%" elevation="0">
                    <v-card-actions>
                        <v-text-field
                            solo
                            dense
                            label="Referencia del lugar"
                            hint="piso |dept |oficina |num casa"
                            persistent-hint
                            v-model="referencia"
                            color="#005598"
                        >
                        </v-text-field>
                    </v-card-actions>
                    <MapaSimple :longitudes="longitudes" />
                    <div class="text-center font-weight-black mt-2">Dirección de mi:</div>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-radio-group v-model="row" row="center">
                            <v-radio on-icon="mdi-home" label="Casa" value="Casa" color="#005598"></v-radio>
                            <v-radio on-icon="mdi-domain" label="Oficina" value="Oficina" color="#005598"></v-radio>
                        </v-radio-group>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                    <v-card-actions>
                        <v-btn class="text-capitalize white--text" block color="#005598">
                            Guardar
                        </v-btn>
                    </v-card-actions>
                </v-card>

            </v-card-text>
        </v-card>
    </v-dialog> 
</template>

<script>
import {mapState,mapActions} from 'vuex';
import MapaSimple from '@/components/maps/MapaSimple'; 

    export default {
        components:{
            MapaSimple
        },
        data() {
            return {
                row:null,
                referencia:null,
                e1:1,
                longitudes:{
                    text:'',
                    latitud:0,
                    longitud:0
                },
                ciudades:[
                    {text:'Porlamar',latitud:10.9577103,longitud:-63.869709},
                    {text:'La Asuncion',latitud:11.03333,longitud:-63.8627815},
                    {text:'Villa rosa',latitud:10.9514832,longitud:-63.9344109},
                    {text:'El Valle',latitud:10.9813851,longitud:-63.8788287},
                    {text:'El Espinal',latitud:10.9726701,longitud:-63.9904144},
                    {text:'San juan bautista',latitud:11.0160141,longitud:-63.9463199},
                    {text:'Juan griego',latitud:11.0848587,longitud:-63.9746547},
                    {text:'Santa ana',latitud:11.0673807,longitud:-63.9302266},
                    {text:'Pampatar',latitud:11.0058395,longitud:-63.8221406},
                    {text:'Paraguachi',latitud:11.099325,longitud:-63.870349},
                    {text:'El Tirano',latitud:11.1165378,longitud:-63.8662345},
                    {text:'Playa el agua',latitud:11.1454976,longitud:-63.8765462},
                    {text:'Manzanillo',latitud:11.1558952,longitud:-63.8932229},
                ]
            }
        },
        computed: {
            ...mapState(['modalUbicacion']),

            ubicacion:{
                get(){ return this.modalUbicacion },
                set(val){ this.setModalUbicacion(val) }
            },
        },
        methods: {
            ...mapActions(['setModalUbicacion']),

            close(){
                this.e1 = 1;
                this.setModalUbicacion(false);
            },
            back(){
                this.e1-=1;
            },
            citySelect(ciudad){
                this.longitudes = ciudad;
                this.e1 = 2;
            }
        },
    }
</script>
