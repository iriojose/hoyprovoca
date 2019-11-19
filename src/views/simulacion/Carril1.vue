<template>
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
</template>

<script>
import { setInterval } from 'timers';
    export default {
        props:['llegada','sistema'],

        data() {
            return {
                slider:0
            }
        },

        mounted() {
            this.iniciar();
        },

        methods: {
            iniciar(){
                this.slider = 0;
                setTimeout(() => {
                    setInterval(() => {
                        if(this.slider >=100){
                            this.slider=0;
                        }else{
                            this.slider=this.sistema;
                        }
                    },100);
                },this.llegada);
            }
        },
    }
</script>