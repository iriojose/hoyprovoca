<template>
    <div>
        <h2 class="grey--text text-center headline my-5">Simulación</h2>

       <v-layout row wrap justify-space-around>
        
            <v-flex md3 lg3 sm3 xs3>
                <v-text-field 
                    single-line
                    label="Tiempo en el sistema"
                    v-model="sistema"
                    outlined
                    color="#005598"
                    dense
                    type="number"
                    suffix="seg"
                    :disabled="button"
                />
            </v-flex>

            <v-flex md3 lg3 sm3 xs3>
                <v-text-field 
                    single-line
                    label="Repeticiones"
                    v-model="repetir"
                    outlined
                    color="#005598"
                    dense
                    type="number"
                    suffix="rep"
                    :disabled="button"
                />
            </v-flex>
       </v-layout>

        <v-card width="90%" height="400" class="mx-auto" elevation="5">
            <v-img src="@/assets/via.jpg" height="400" width="100%">
                <v-slider
                    v-model="slider"
                    thumb-label="always"
                    color="#005598"
                    class="my-10 mx-4"
                    track-color="#000"
                >
                    <template v-slot:thumb-label="props">
                        <v-icon dark>
                            directions_car
                        </v-icon>
                    </template>
                </v-slider>

                <v-slider
                    v-model="slider2"
                    thumb-label="always"
                    color="#005598"
                    class="my-10 mx-4"
                    track-color="#000"
                >
                    <template v-slot:thumb-label="props">
                        <v-icon dark>
                            directions_car
                        </v-icon>
                    </template>
                </v-slider>
            </v-img>
        </v-card>

        <div class="text-center my-5">
            <v-btn text @click="iniciar"  depressed :disabled="button">
                iniciar
            </v-btn>
            <v-btn text text-center depressed :disabled="!button" @click="clear">
                cancelar
            </v-btn>
        </div>
    </div>
</template>

<script>
import Carril1 from './Carril1';

    export default {
        components:{
            Carril1
        },

        data(){
            return {
                button:false,
                llegada:0,
                sistema:0,
                repetir:0,
                slider:0,
                slider2:0,
                interval:0,
                count:0
            }
        },

        methods: {
            clear(){
                this.button=false;
                clearInterval(this.interval);
            },
         
            sistem(){
                console.log(10/this.sistema);
                return (10/this.sistema);
            },

            iniciar(){
                this.button=true;
                this.slider=0;
                this.slider2=0;

                this.interval = setInterval(() => {
                    if(this.slider >= 100 || this.slider2 >= 100){
                        clearInterval(this.interval);
                        setTimeout(() => {
                            return this.iniciar();
                        },1000);
                    }else{
                        this.slider += this.sistem();
                        this.slider2 += 1;
                    }
                },100);
            }
        }
    }
</script>