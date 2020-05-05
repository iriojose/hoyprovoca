<template>
    <!--gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"-->
    <v-img 
        :src="require('@/assets/index.jpeg')" 
        width="100%" 
        class="px-5"
        :height="$vuetify.breakpoint.smAndDown ? 400:500"
        :style="$vuetify.breakpoint.smAndDown ? 'margin-top:46px':'margin-top:46px'"
    >
        <v-row justify="center" :align="$vuetify.breakpoint.smAndDown ? 'top':'center'" class="fill-height">
            <v-card :width="$vuetify.breakpoint.smAndDown ? 400:600" color="transparent" elevation="0">
                <div class="display-2 text-center my-10 white--text font-weight-black">¿Pensando en algo rico?</div>
                <v-text-field 
                    label="¿Que te provoca?..."
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