 <template>
    <v-carousel
        cycle
        progress-color="#6772e5"
        progress
        continuous
        :show-arrows="false"
        mandatory
        dark
        delimiter-icon="bubble_chart"
        :height="$vuetify.breakpoint.smAndDown ? 200:350"
        :style="$vuetify.breakpoint.smAndDown ? 'margin-top:65px':'margin-top:5px'"
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