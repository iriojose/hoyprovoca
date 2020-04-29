<template>
    <div>
        <v-row justify="center" align="center" class="mt-12">
            <v-col cols="12" md="6" sm="6">
                <v-img contain :src="require('@/assets/error404.svg')"></v-img>
                <v-row justify="center" align="center" class="mt-4">
                    <v-hover v-slot:default="{hover}">
                        <v-btn class="font-weight-bold text-capitalize subtitle-1" text depressed to="/" :elevation="hover ? 5:0">
                            Ir a inicio
                            <v-slide-y-transition>
                                <v-icon class="mx-2" v-show="hover">home</v-icon>
                            </v-slide-y-transition>
                        </v-btn>
                    </v-hover>
                </v-row>
            </v-col>
        </v-row>

        <SubFooter />
    </div>
</template>

<script>
import SubFooter from "@/components/footer/SubFooter";

    export default {
        components: {
            SubFooter
        },
        head:{
            title(){
                return {
                    inner:'Hoyprovoca',
                    separator:'|',
                    complement: '404'
                }
            }
        },
    };
</script>