<template>
    <v-dialog v-model="ubicacion" width="800" close-delay transition="dialog-bottom-transition" >
        <v-card width="800">
            <MapaSimple :longitudes="longitudes" />    
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
        mounted() {
            if (!"geolocation" in navigator) {
                return alert("Tu navegador no soporta el acceso a la ubicación. Intenta con otro");
            }
            let onUbicacionConcedida = ubicacion => {
                this.longitudes.longitud= ubicacion.coords.longitude;
                this.longitudes.latitud = ubicacion.coords.latitude;
            }
            let onErrorDeUbicacion = err => {
                return alert("Error obteniendo ubicación: ", err);
            }
            let opcionesDeSolicitud = {
                enableHighAccuracy: true, 
                maximumAge: 0, 
                timeout: 5000 
            };
            navigator.geolocation.getCurrentPosition(onUbicacionConcedida, onErrorDeUbicacion, opcionesDeSolicitud);
        },
        data() {
            return {
                longitudes:{
                    latitud:0,
                    longitud:0
                }
            }
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