<template>
        <div :class="$vuetify.breakpoint.smAndDown ? null:'my-8 mx-10'">
            <div class="display-1 font-weight-bold">{{title}}</div>

            <v-sheet elevation="0" color="#eee">
                <v-slide-group show-arrows class="pa-5" v-model="model">
                    <v-slide-item v-for="n in 7" :key="n">
                        <v-card
                            elevation="4"
                            class="ma-2"
                            height="200"
                            width="200"
                        >
                            <v-skeleton-loader width="200" height="200" type="image" />
                        </v-card>
                    </v-slide-item>
                </v-slide-group>
            </v-sheet>
        </div>
</template>

<script>
    export default {
        inject: ["theme"],
        props:{
            title:{
                type:String,
                default:''
            }
        },
        data() {
            return {
                model:0
            }
        },
    };
</script>

