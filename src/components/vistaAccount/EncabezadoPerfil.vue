<template>
    <v-card elevation="1" class="text-center">
        <!-- imagen de encabezado con datos de la cuenta -->
        <v-card-text>
            <v-hover v-slot:default="{hover}">
                <v-avatar size="150">
                    <v-img :src="fotografia" :class="hover ? 'elevation-10':'elevation-2'">
                        <v-row class="fill-height" align="center" justify="center">
                            <template v-if="hover">
                                <v-btn fab color="blue darken-5" @click="modal= !modal" elevation="3">
                                    <v-icon color="#fff">edit</v-icon>
                                </v-btn>
                            </template>
                        </v-row>
                    </v-img>
                </v-avatar>
            </v-hover>
        </v-card-text>

        <!--modal para editar foto -->
        <v-dialog v-model="modal" width="400" close-delay>
            <v-card>
                <v-card-title class="headline grey lighten-4">
                    Editar foto  <v-spacer />
                    <v-btn icon color="#005598" text @click="modal = !modal">
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-divider/>

                <v-card-text class="mt-5">     
                    <v-row>
                        <v-col cols="12" md="8" sm="12" :offset="$vuetify.breakpoint.smAndDown ? null:2">
                            <!-- plugins para recortar la imagen -->
                            <croppa 
                                v-model="myCroppa"
                                :width="250"
                                :height="250"
                                :canvas-color="'#eee'"
                                prevent-white-space
                                :placeholder="'Selecciona una imagen'"
                                :placeholder-font-size="20"
                                @new-image-drawn="onNewImage()"
                                @zoom="onZoom()"
                                @init="onInit()"
                                initial-image="https://zhanziyang.github.io/vue-croppa/static/500.jpeg"
                            ></croppa>
                        </v-col>
                        <v-col cols="12" md="8" sm="12" :offset="$vuetify.breakpoint.smAndDown ? null:2">
                            <!-- slider para hacer zoom -->
                            <v-slider
                                track-color="#eee"
                                class="mt-8"
                                id="#slider"
                                v-model="sliderVal"
                                append-icon="panorama"
                                prepend-icon="photo"
                                thumb-label
                                color="teal"
                                @input="onSliderChange($event)"
                                :min="sliderMin" 
                                :max="sliderMax" 
                                step="0.001" 
                            ></v-slider>
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-card-actions class="mx-5">
                    <v-spacer/>
                    <v-btn text @click="modal = !modal" elevation="0" class="blue--text">
                        Cancelar
                    </v-btn>
                    <v-hover v-slot:default="{hover}">
                        <v-btn 
                            :color="hover ? '#005598':'#005598'" 
                            :elevation="hover ? '5':'1'" 
                            dark 
                            class="px-4"
                            @click="editImage()"
                        >
                            Guardar
                        </v-btn>
                    </v-hover>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="snackbar" bottom right color="green" :timeout="time">
            <div>
                <v-icon dark>
                check_circle
                </v-icon>
                Se ha editado exitosamente
            </div>
        </v-snackbar>
    </v-card>
</template>

<script>
import Usuario from '@/services/Usuario';
import {mapState} from 'vuex';

    export default {
        data(){
            return{
                modal:false,
                snackbar:false,
                time:2000,
                myCroppa:{},
                sliderVal:0,
                sliderMin:0,
                sliderMax:0,
                fotografia:'http://192.168.0.253:81/api/images/default.png'
            }
        },
        mounted() {
            this.getUsuario();
        },
        computed: {
            ...mapState(['user'])
        },
        methods: {
            getUsuario(){
                Usuario().post('/validate',{user_token:this.user.token}).then((response) => {
                    this.fotografia = response.data.data.fotografia;
                }).catch(e => {
                    console.log(e);
                });
            },
            //al colocar una nueva imagen
            onNewImage() {
                this.sliderVal = this.myCroppa.scaleRatio;
                this.sliderMin = this.myCroppa.scaleRatio / 2;
                this.sliderMax = this.myCroppa.scaleRatio * 2;
            },
            //al mover el slide se desencadena este evento
            onSliderChange(evt) {
                var increment = evt;
                this.myCroppa.scaleRatio = + increment;
            },
            //zoom a la imagen
            onZoom() {
                this.sliderVal = this.myCroppa.scaleRatio;
            },
            //le pone el fondo circular
            onInit() {
                this.myCroppa.addClipPlugin(function (ctx, x, y, w, h) {
                    ctx.beginPath()
                    ctx.arc(x + w / 2, y + h / 2, w / 2, 0, 2 * Math.PI, true)
                    ctx.closePath()
                });
            },
            //edita la imagen
            editImage(){
                let url = this.myCroppa.generateDataUrl();

                if(!url){//requiere una imagen
                    alert('No imagen');
                    return
                }else{
                    this.fotografia=url;
                    this.snackbar=true;
                    this.modal=false;
                }
            },
        },
    }
    
</script>