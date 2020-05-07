<template>
    <l-map 
        :zoom="zoom" 
        :center="center" 
        style="height: 500px" 
        :options="{zoomControl: false}"
        :minZoom="11"
        :attribution="attribution"
        @update:zoom="zoomUpdated"
        @update:center="centerUpdated"
        @update:bounds="boundsUpdated"
    >
        <l-tile-layer :url="url"></l-tile-layer>

        <l-marker :lat-lng="marker">
            <l-icon :icon-anchor="staticAnchor">
                <img src="@/assets/senales.png">
            </l-icon>
        </l-marker>
        <l-control-zoom position="bottomright"></l-control-zoom>
    </l-map>
</template>

<script>
import L from 'leaflet';
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
        mounted(){
            console.log(this.longitudes);
        },
        data() {
            return {
                zoom:12,
                center:[11.028457999999999,-63.858148500000006],
                url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
                attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                marker:[11.028457999999999,-63.858148500000006],
                staticAnchor:[64, 85],
                bounds: null
            }
        },
        methods: {
            zoomUpdated (zoom) {
                this.zoom = zoom;
            },
            centerUpdated (center) {
                this.center = center;
            },
            boundsUpdated (bounds) {
                this.bounds = bounds;
            }
        }
    }
</script>
