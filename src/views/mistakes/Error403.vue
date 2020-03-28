<template>
    <div>
        <v-row justify="center" align="center" class="mt-12">
            <v-col cols="12" md="6" sm="6" lg="6">
                <v-img contain height="500" :src="require('@/assets/error403.svg')"></v-img>
                <v-row justify="center" align="center" class="mt-2">
                    <v-hover v-slot:default="{hover}">
                        <v-btn
                            class="text-capitalize subtitle-1 font-weight-bold"
                            depressed
                            text
                            @click="back"
                            :elevation="hover ? 5:0"
                        >
                            <v-fade-transition>
                                <v-icon class="mx-2" v-show="hover">arrow_back_ios</v-icon>
                            </v-fade-transition>Volver
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
import router from "@/router";

    export default {
        components: {
            SubFooter
        },
        methods: {
            back() {
                router.go(-1);
            }
        },
        head:{
            title(){
                return {
                    inner:'HoyProvoca',
                    separator:'|',
                    complement: '403'
                }
            }
        },
    };
</script>