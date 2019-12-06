<template>
    <v-carousel
        height="400"
        show-arrows-on-hover
        :style="$vuetify.breakpoint.smAndDown ? 'margin-top:60px':null"
    >
        <v-carousel-item
            v-for="img in images"
            :key="img.id"
            src="@/assets/COMIDA.jpg"
            transition="fade-transition"
        >
        </v-carousel-item>
    </v-carousel>
</template>

<script>
  export default {
    data () {
        return {
            images:[
                {id:1,img:'@/assets/COMIDA.jpg'},
                {id:2,img:'@/assets/FARMACIA.jpg'},
                {id:3,img:'@/assets/COMIDA.jpg'},
                {id:4,img:'@/assets/COMIDA.jpg'},
                {id:5,img:'@/assets/COMIDA.jpg'},
            ]
        }
    },
  }
</script>