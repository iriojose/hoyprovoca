<template>
    <v-layout class="p-0 m-0">
        <v-carousel 
            cycle
            height="240"
            hide-delimiter-background
        >
            <v-carousel-item>
                <v-row
                    class="fill-height"
                    align="center"
                    justify="center"
                >
                    <v-img contain=""
                    :src="require('@/assets/COMIDA.jpg')"
                    aria-placeholder="asdasdasda"
                    width="100%"
                    />
                </v-row>
            </v-carousel-item>
    
            <v-carousel-item>
                <v-row
                    class="fill-height"
                    align="center"
                    justify="center"
                >
                    <v-img 
                        contain=""
                        :src="require('@/assets/FARMACIA.jpg')"
                        aria-placeholder="asdasdasda"
                    />
                </v-row>
            </v-carousel-item>

            <v-carousel-item>
                <v-row
                    class="fill-height"
                    align="center"
                    justify="center"
                >
                    <v-img contain=""
                        :src="require('@/assets/SPORT.jpg')"
                        aria-placeholder="asdasdasda" 
                    />
                </v-row>
            </v-carousel-item>
        </v-carousel>
    </v-layout>
</template>

<script>
    export default {
        inject: ['theme'],
    }
</script>

<style lang="scss" scoped>
    .v-card--reveal {
        align-items: center;
        bottom: 0;
        justify-content: center;
    
        position: absolute;
        width: 100%;
    }
</style>