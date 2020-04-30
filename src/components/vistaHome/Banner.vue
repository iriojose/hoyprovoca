<template>
    <v-carousel
        cycle
        continuous
        progress-color="#005598"
        progress
        :height="$vuetify.breakpoint.smAndDown ? 150:500"
        :show-arrows="false"
        mandatory
        :style="$vuetify.breakpoint.smAndDown ? 'margin-top:103px':'margin-top:64px'"
    >
        <v-carousel-item 
            v-for="img in images" 
            :key="img.id" 
            :src="require(`@/assets/`+img.img)"
        >
            <v-row justify="center" align="center" class="fill-height">
                <v-card width="400" color="transparent">
                    <v-text-field 
                        label="Buscar producto..."
                        hide-details
                        solo
                        color="#fff"
                        single-line
                    >
                        <v-btn slot="append" color="#D32F2F" class="text-capitalize">
                            Buscar
                            <v-icon dark class="mx-2">mdi-magnify</v-icon>
                        </v-btn>
                    </v-text-field>
                </v-card>
            </v-row>
        </v-carousel-item>
    </v-carousel>
</template>

<script>
    export default {
        data () {
            return {
                images:[
                    {id:1,img:'1.png'},
                    {id:2,img:'2.png'},
                    //{id:3,img:'deporte.jpg'},
                ],
            }
        },
    }
</script>