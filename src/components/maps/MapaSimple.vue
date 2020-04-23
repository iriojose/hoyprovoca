<template>
    <div>
        <LMap :zoom="zoom" :center="center">
            <LTileLayer :url="url" :attribution="attribution"></LTileLayer>
            <LMarker :lat-lng="marker"></LMarker>
        </LMap>
    </div>
</template>

<script>
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';

    export default {
         components: { LMap, LTileLayer, LMarker },
        data() {
            return {
                zoom:13,
                center: L.latLng(47.413220, -1.219482),
                url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
                attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                marker: L.latLng(47.413220, -1.219482),
            }
        },
    }
</script>