<template>
    <v-carousel
        cycle
        height="300"
        hide-delimiters
        show-arrows-on-hover
        class="mt-1"
    >
        <v-carousel-item>
            <v-img contain :src="require('@/assets/COMIDA.jpg')" />
        </v-carousel-item>

         <v-carousel-item>
            <v-img contain :src="require('@/assets/FARMACIA.jpg')" />
        </v-carousel-item>

         <v-carousel-item>
            <v-img contain :src="require('@/assets/SPORT.jpg')" />
        </v-carousel-item>
    </v-carousel>
</template>