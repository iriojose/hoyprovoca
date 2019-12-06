<template>
    <div :class="$vuetify.breakpoint.smAndDown ? null:'my-8 mx-10'">
    <div class="display-1 font-weight-bold">{{title}}</div>

    <v-sheet elevation="0" color="#eee">
        <v-slide-group
            show-arrows
            class="pa-5"
            v-model="model"
            prev-icon="arrow_back"
            next-icon="arrow_forward"
        >
            <v-slide-item v-for="sugerencia in sugerencias" :key="sugerencia.uid">
                <v-hover v-slot:default="{hover}">
                    <v-card
                        :elevation="hover ? '5':'2'"
                        class="ma-2"
                        height="300"
                        width="250"
                        :to="{name:'local', params:{local:sugerencia.nombre}}"
                    >
                        <v-img contain width="250" height="250" :src="sugerencia.imagen" />
                        <v-divider></v-divider>
                        <div class="div text-center pt-3">
                            <strong class="font-weight-bold">{{sugerencia.nombre}}</strong>
                        </div>
                    </v-card>
                </v-hover>
            </v-slide-item>
        </v-slide-group>
    </v-sheet>
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

<style scope>
    .div{
        width: 100%;
        background: #f5f5f5;
        height: 50px;
    }
</style>