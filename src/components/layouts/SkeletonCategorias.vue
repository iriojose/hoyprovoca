<template>
    <div :class="$vuetify.breakpoint.smAndDown ? null:'my-8 mx-10'">
        
        <v-skeleton-loader class="px-5 mx-12" width="30%" height="100" type="paragraph" />

        <v-sheet elevation="0" color="#eee">
            <v-slide-group
                show-arrows
                class="pa-5"
                v-model="model"
            >
                <v-slide-item v-for="n in 5" :key="n">
                    <v-card
                        elevation="2"
                        class="ma-2"
                        height="300"
                        width="250"
                    >
                        <v-skeleton-loader max-width="250" type="card" />
                    </v-card>
                </v-slide-item>
            </v-slide-group>
        </v-sheet>
    </div>
</template>

<script>
    export default {
        inject: ["theme"],
        data() {
            return {
                model:1
            }
        },
    }
</script>