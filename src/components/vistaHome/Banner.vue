<!--template>
    <v-carousel
        cycle
        continuous
        progress-color="#005598"
        progress
        :height="$vuetify.breakpoint.smAndDown ? 150:500"
        :show-arrows="false"
        mandatory
        :style="$vuetify.breakpoint.smAndDown ? 'margin-top:103px':'margin-top:64px'"
    >
        <v-carousel-item 
            v-for="img in images" 
            :key="img.id" 
            :src="require(`@/assets/`+img.img)"
        >
            <v-row justify="center" align="center" class="fill-height">
                <v-card width="400" color="transparent">
                    <v-text-field 
                        label="Buscar producto..."
                        hide-details
                        solo
                        color="#fff"
                        single-line
                    >
                        <v-btn slot="append" color="#D32F2F" class="text-capitalize">
                            Buscar
                            <v-icon dark class="mx-2">mdi-magnify</v-icon>
                        </v-btn>
                    </v-text-field>
                </v-card>
            </v-row>
        </v-carousel-item>
    </v-carousel>
</template-->

<template>
    <v-img 
        :src="require('@/assets/banner.jpeg')" 
        width="100%" 
        gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
        :height="$vuetify.breakpoint.smAndDown ? 500:500"
        :style="$vuetify.breakpoint.smAndDown ? 'margin-top:46px':'margin-top:46px'"
    >
        <v-row justify="center" align="center" class="fill-height">
            <v-card :width="$vuetify.breakpoint.smAndDown ? 400:500" color="transparent" elevation="0">
                <div class="display-2 text-center my-10 white--text">¿Que te provoca?</div>
                <v-text-field 
                    label="Buscar producto..."
                    hide-details
                    solo
                    v-model="busquedas"
                    v-on:keyup.enter="push"
                    color="#fff"
                    single-line
                >
                    <v-btn slot="append" @click="push" color="#D32F2F" class="text-capitalize white--text">
                        Buscar
                        <v-icon color="#fff" class="mx-2">mdi-magnify</v-icon>
                    </v-btn>
                </v-text-field>
            </v-card>
        </v-row>
    </v-img>
</template>
<script>
import router from '@/router';
import {mapState,mapActions} from 'vuex';

    export default {
        data () {
            return {
                images:[
                    {id:1,img:'1.png'},
                    {id:2,img:'2.png'},
                    //{id:3,img:'deporte.jpg'},
                ],
            }
        },
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