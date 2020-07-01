<template>
    <v-card :height="$vuetify.breakpoint.smAndDown ? 450:500" color="#e6e6e6" width="100%" style="margin-top:46px" :class="$vuetify.breakpoint.smAndDown ? 'mx-auto':null">
        <v-card-text>
            <v-row justify="center">
                <v-col cols="12" md="4" class="hidden-sm-and-down">
                    <v-img 
                        class="transition-chica" 
                        contain 
                        height="500" 
                        widht="100%" 
                        :src="require('@/assets/chica.png')"
                    ></v-img>
                </v-col>
                <v-col cols="12" md="4" sm="10">
                    <div 
                        :class="$vuetify.breakpoint.smAndDown ? 'black--text display-1 text-center my-12 font-weight-medium':'display-1 text-center my-10 black--text font-weight-medium'">
                        ¿Pensando en comprarte algo?
                    </div>

                    <!--v-text-field 
                        label="¿Que te provoca?..."
                        hide-details
                        solo
                        v-model="busquedas"
                        v-on:keyup.enter="push"
                        color="#fff"
                        single-line
                    >
                        <v-btn slot="append" @click="push" color="#0F2441" tile class="text-capitalize white--text">
                            <v-icon color="#fff" class="mx-2">mdi-magnify</v-icon>
                        </v-btn>
                    </v-text-field-->

                    <div 
                        :class="$vuetify.breakpoint.smAndDown ? 'headline text-center mt-12 font-weight-black black--text':'headline black--text text-center font-weight-black'">
                        Mejor hazlo desde aqui...
                    </div>
                </v-col>
                <v-col cols="12" md="4" class="hidden-sm-and-down">
                    <v-img 
                        class="transition-chico" 
                        contain 
                        height="500" 
                        widht="100%" 
                        :src="require('@/assets/chico.png')"
                    ></v-img>
                </v-col>

                <v-col cols="6" sm="6" v-if="$vuetify.breakpoint.smAndDown">
                    <v-img 
                        class="transition-chica" 
                        contain 
                        height="200"
                        widht="200" 
                        :src="require('@/assets/chica.png')"
                    ></v-img>
                </v-col>
                <v-col cols="6" sm="6" v-if="$vuetify.breakpoint.smAndDown">
                    <v-img 
                        class="transition-chico" 
                        contain 
                        height="200" 
                        widht="200" 
                        :src="require('@/assets/chico.png')"
                    ></v-img>
                </v-col>
            </v-row>
        </v-card-text>
        
    </v-card>
</template>

<script>
import router from '@/router';
import {mapState,mapActions} from 'vuex';

    export default {
        computed: {
            ...mapState(['search','bandera']),

            busquedas:{
                get(){ return this.search},
                set(val){ this.setBuscar(val)}
            },
        },
        methods:{
            ...mapActions(['setBuscar','setBandera']),

            push(){ 
                if(this.bandera){
                    this.setBandera(false);
                }else{
                    this.setBandera(true);
                }
                router.push("/search") 
            },
        }
    }
</script>

<style lang="scss" scoped>
    .margen{
        margin-top:150px;
    }
    .transition-chico{
        animation: animat 1s 600ms ease 1;
    }
    @keyframes animat{
        0% {
            transform: translateX(400px);
        }
    }
    .transition-chica{
        animation:animat2 1s 600ms ease 1;
    }
    @keyframes animat2{
        0% {
            transform: translateX(-400px);
        }
    }
</style>