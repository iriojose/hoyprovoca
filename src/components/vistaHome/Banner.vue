<template>
    <v-img 
        style="margin-top:46px" 
        :height="500" width="100%" 
        :src="require('@/assets/index2.jpg')"
        v-if="!$vuetify.breakpoint.smAndDown"
    >
        <v-row justify="center">
            <v-col cols="12" md="5">
                <div class="text-center display-1 my-12 white--text">
                    Te llevamos el <span class="font-weight-black">Mercado</span> o lo que te <span class="font-weight-black">provoque</span> a la puerta de tu <span class="font-weight-black">casa</span>...
                </div>
            </v-col>
        </v-row>
    </v-img>
    <v-img 
        style="margin-top:46px" 
        :height="500" width="100%" 
        :src="require('@/assets/index_movil.jpg')"
        v-else
    >
        <v-row justify="start">
            <v-col cols="12" sm="4" offset-sm="4" style="padding-right:150px">
                <div style="padding-top:46px" class="text-center title my-12 white--text">
                    Te llevamos el <span class="font-weight-black">Mercado</span> o lo que te <span class="font-weight-black">provoque</span> a la puerta de tu <span class="font-weight-black">casa</span>...
                </div>
            </v-col>
        </v-row>
    </v-img>
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