<template>
    <v-carousel
        cycle
        continuous
        progress-color="#005598"
        progress
        height="300"
        :show-arrows="false"
        mandatory
        :style="$vuetify.breakpoint.smAndDown ? 'margin-top:103px':'margin-top:64px'"
    >
        <v-carousel-item 
            v-for="img in images" 
            :key="img.id" 
            :src="require(`@/assets/`+img.img)"
        ></v-carousel-item>
    </v-carousel>
</template>

<script>
    export default {
        data () {
            return {
                images:[
                    {id:1,img:'comida.jpg'},
                    {id:2,img:'farmacia.jpg'},
                    {id:3,img:'deporte.jpg'},
                ],
            }
        },
    }
</script>