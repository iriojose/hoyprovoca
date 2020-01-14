<template>
    <v-slide-group
        show-arrows
        class="my-5"
    >
        <v-slide-item v-for="(empresa,i) in empresas" :key="i">
            <v-avatar size="60">
                <v-img src="@/assets/noimage.png" contain></v-img>
            </v-avatar>
        </v-slide-item>
    </v-slide-group>
</template>

<script>
    export default {
        props:{
            empresas:{
                type:Array,
                default:() => []
            }
        }
    }
</script>