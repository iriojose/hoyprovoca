<template>
    <v-dialog v-model="ubicacion" close-delay width="600" transition="dialog-bottom-transition">
        <v-card width="600" class="px-5 py-2">
            <div id="mapid">
                <MapaSimple />
            </div>
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
        computed: {
            ...mapState(['modalUbicacion']),

            ubicacion:{
                get(){ return this.modalUbicacion },
                set(val){ this.setModalUbicacion(val) }
            }
        },
        methods: {
            ...mapActions(['setModalUbicacion']),

            close(){
                this.setModalUbicacion(false);
            }
        },
    }
</script>

<style lang="scss" scope>
    #mapid{
        height:400px;
    }
</style>