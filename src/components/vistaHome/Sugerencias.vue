<template>
    <div>
        <v-divider class="my-12"></v-divider>
        <div class="headline ml-12 mt-12 font-weight-black">Visita nuestras tiendas </div>
        <v-slide-group
            show-arrows
            class="my-5 py-5"
        >
            <v-slide-item
                v-for="sugerencia in  sugerencias"
                :key="sugerencia.id"
                class="mx-4"
            >
                <v-hover v-slot:default="{hover}">
                    <v-card height="250" width="300" elevation="10" v-ripple :to="{name:'local', params:{local:sugerencia.nombre}}">
                        <v-card-text>
                            <v-img contain :src="sugerencia.img"/>
                        </v-card-text>
                    </v-card>
                </v-hover>
            </v-slide-item>
        </v-slide-group>
    </div>
</template>

<script>
    export default {
        props: ["sugerencias", "title"],
        data() {
            return {
            model: 1,
        };
    },
};
</script>