<template>
    <v-card class="mt-8" color="transparent" elevation="0" width="100%" height="400">
        <v-card-text>
            <div class="text-center font-weight-black headline mb-4">
                Producto más vendido
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
import Conceptos from '@/services/Conceptos';
import {mapActions,mapState} from 'vuex';

    export default {
        data(){
            return {
                loading:false,
            }
        },
        mounted(){
            this.getMasVendidos();
        },
        computed:{
            ...mapState(['masVendidos'])
        },
        methods:{
            ...mapActions(['setMasVendidos']),

            getMasVendidos(){
                Conceptos().get("/mostSold").then((response) => {
                    console.log(response);
                }).catch(e => {
                    console.log(e);
                });
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>