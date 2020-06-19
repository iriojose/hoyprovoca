<template>
    <l-map 
        :zoom="zoom" 
        :center="dinamicLocation" 
        style="height: 300px" 
        :options="{zoomControl: false}"
        :minZoom="11"
        :attribution="attribution"
        :max-bounds="maxBounds"
        
    >
        <l-tile-layer :url="url"></l-tile-layer>
        <l-marker :lat-lng="dinamicMarket" :draggable="true">
            <l-icon
                :icon-size="dynamicSize"
                :icon-anchor="dynamicAnchor"
            >
                <v-icon color="red">room</v-icon>
            </l-icon>
        </l-marker>
        <l-control-zoom position="bottomright"></l-control-zoom>
    </l-map>
</template>

<script>
import { latLng,latLngBounds } from "leaflet";
import { LMap, LTileLayer, LMarker ,LPopup ,LControlZoom, LIcon} from 'vue2-leaflet';

    export default {
        components: { 
            LMap, 
            LTileLayer, 
            LMarker,
            LPopup,
            LControlZoom,
            LIcon
        },
        props:{
            longitudes:{
                type:Object,
                default:() => ({})
            }
        },
        data() {
            return {
                zoom:14,
                center:[11.03333,-63.8627815],
                url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
                attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                marker:[11.03333,-63.8627815],
                staticAnchor:[64, 85],
                iconSize: [32, 37],
                iconAnchor: [16, 37],
                maxBounds: latLngBounds([
                    [11.143245, -64.585779],
                    [10.855805, -63.597649]
                ]),
            }
        },
        computed: {
            dynamicSize () {
                return [this.iconSize, this.iconSize * 1.15];
            },
            dynamicAnchor () {
                return [this.iconSize / 2, this.iconSize * 1.15];
            },
            dinamicLocation(){
                return latLng(this.longitudes.latitud,this.longitudes.longitud);
            },
            dinamicMarket(){
                return latLng(this.longitudes.latitud,this.longitudes.longitud);
            }
        },
        watch: {
            longitudes(){
                this.center = latLng(this.longitudes.latitud,this.longitudes.longitud);
                this.marker = latLng(this.longitudes.latitud,this.longitudes.longitud,{draggable:'true'});
            }
        },
        methods: {
            centerUpdated (center) {
                this.longitudes.latitud = center.lat;
                this.longitudes.longitud = center.lng; 
            },
        }
    }
</script>
