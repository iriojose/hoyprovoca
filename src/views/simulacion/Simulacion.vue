<template>
    <div>
        <h2 class="grey--text text-center headline my-5">Simulación</h2>

       <v-layout row wrap justify-space-around>

            <v-flex md3 lg3 sm3 xs3>
                <v-text-field 
                    single-line
                    label="Media de llegada"
                    v-model="llegada"
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
                    label="Media de tiempo"
                    v-model="tiempo"
                    outlined
                    color="#005598"
                    dense
                    type="number"
                    suffix="seg"
                    :disabled="button"
                />
            </v-flex>

       </v-layout>

        <v-card class="mx-auto" elevation="0" color="#f5f5f5" width="600" >
            <v-img src="@/assets/via.jpg" contain height="500" width="600">
                <v-slider
                    v-model="slider"
                    thumb-label="always"
                    color="#005598"
                    style="margin-left:45px; margin-top:50px; margin-right:45px;"
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
                    style="margin-left:45px; margin-top:50px; margin-right:45px;"
                    track-color="#000"
                >
                    <template v-slot:thumb-label="props">
                        <v-icon dark>
                            directions_car
                        </v-icon>
                    </template>
                </v-slider>

                <v-slider
                    v-model="slider3"
                    thumb-label="always"
                    color="#005598"
                    style="margin-left:45px; margin-top:100px; margin-right:45px;"
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
            <v-btn @click="carril(),carril2()" depressed :disabled="button">
                iniciar
            </v-btn>
            <v-btn text text-center depressed :disabled="!button" @click="clear">
                cancelar
            </v-btn>
            <v-btn @click="data">
                crear data
            </v-btn>
        </div>

        <v-snackbar v-model="snackbar" :timeout="time" top right color="green">
            Ha finalizado la Simulación
            <v-icon dark>
                help_outline
            </v-icon>
        </v-snackbar>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                time:2000,
                button:false,
                snackbar:false,
                llegada:null,
                tiempo:null,
                slider:0,
                slider2:0,
                slider3:100,
                interval:0,
                interval2:0,
                interval3:0,
                count:0,
                llegadas:[],
                tiempos:[],
                selectLlegadas1:[],
                selectTiempos1:[],
                selectLlegadas2:[],
                selectTiempos2:[]
            }
        },

        

        methods: {
            clear(){
                this.button=false;
                this.snackbar=true;
                this.count=0;
                clearInterval(this.interval);
                clearInterval(this.interval2);
                clearInterval(this.interval3);
            },

            randomg(min, max) {
                return Math.floor(Math.random() * (max - min)) + min;
            },

            data(){
                for (let index = 0; index < 100; index++) {
                    this.llegadas.push(this.randomg(1,this.llegada));
                    this.tiempos.push(this.randomg(1,this.tiempo));
                }

                for (let index = 0; index < 20; index++) {
                    let i = this.randomg(1,99);
                    let i2 = this.randomg(1,99);
                    let i3 = this.randomg(1,99);
                    let i4 = this.randomg(1,99);
                    this.selectLlegadas1.push(this.llegadas[i]);
                    this.selectTiempos1.push(this.tiempos[i2]);
                     this.selectLlegadas2.push(this.llegadas[i3]);
                    this.selectTiempos2.push(this.tiempos[i4]);
                }

                console.log(this.llegadas);
                console.log(this.tiempos);
                console.log(this.selectTiempos1);
                console.log(this.selectLlegadas1);
                console.log(this.selectLlegadas2);
                console.log(this.selectTiempos2);
            },
         
            carril(){
                this.button=true;
                this.slider=0;

                setTimeout( () => {
                    this.interval = setInterval(() => {
                        if(this.slider >= 100){
                            this.count++;
                            console.log(this.count);
                            clearInterval(this.interval);
                            return this.carril();
                        }else{
                            this.slider += 10/this.selectTiempos1[this.count];
                        }
                    },100);
                },this.selectLlegadas1[this.count]*1000);
            },

            carril2(){
                this.button=true;
                this.slider2=0;

                setTimeout( () => {
                    this.interval2 = setInterval(() => {
                        if(this.slider2 >= 100){
                            console.log(this.count);
                            clearInterval(this.interval2);
                            return this.carril2();
                        }else{
                            this.slider2 += 10/this.selectTiempos2[this.count];
                        }
                    },100);
                },this.selectLlegadas2[this.count]*1000);
            },

        }
    }
</script>