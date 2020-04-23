<template>
    <div>
        <Toolbar />

        <v-row justify="center" align="center" class="mt-5 mb-5">
            <v-img contain width="100" height="50" :src="require('@/assets/logo2.png')"></v-img>
        </v-row>

        <v-row justify="center" align="center" :class="$vuetify.breakpoint.smAndDown ? 'mx-5':null">
            <v-col cols="12" md="4" lg="4" class="hidden-sm-and-down">
                <v-img contain width="100%" height="300" :src="require('@/assets/undrawlogin2.svg')"></v-img>
            </v-col>

            <v-col cols="12" md="4" sm="10">
                <v-card width="100%" height="400" elevation="5" class="py-5">
                    <div class="text-center my-5 font-weight-black subtitle-1">Iniciar sesión en Hoyprovoca</div>
                    
                    <v-card-text>
                        <FormLogin />
                    </v-card-text>

                    <div class="mx-10 my-5">
                        <v-divider></v-divider>
                    </div>

                    <div @click="push()" class="text-center" >
                        <a class="mx-2 subtitle-2 underline text-color">
                            ¿No puede iniciar sesión?
                        </a>
                    </div>
                </v-card>

                <div class="text-center my-3">
                    <span class="underline font-weight-medium mx-2 caption">
                        Politicas de privacidad
                    </span>
                    ·
                    <span class="underline font-weight-medium mx-2 caption">
                        condiciones del servicio
                    </span>
                </div>
            </v-col>

            <v-col cols="12" md="4" lg="4" class="hidden-sm-and-down">
                <v-img contain width="100%" height="300" :src="require('@/assets/undrawlogin.svg')"></v-img>
            </v-col>
        </v-row>

        <SubFooter class="mt-5" />
    </div>
</template>

<script>
import SubFooter from "@/components/footer/SubFooter";
import Toolbar from "@/components/auths/Toolbar";
import FormLogin from '@/components/auths/FormLogin';
import router from '@/router';

    export default {
        components:{
            SubFooter,
            Toolbar,
            FormLogin
        },
        head: {
            title() {
                return {
                    inner: "Iniciar sesión",
                    separator:' ',
                    complement:' '
                };
            }
        },
        methods: {
            push(){ router.push('/forgot') }
        },
    }
</script>

<style lang="scss" scoped>
    .text-color{
        color: #232323;
    }

    $thetransition: all .5s cubic-bezier(1,.25,0,.75) 0s;

    .underline{
        text-decoration: none;
        position: relative;
        /*
        webkit-transition: all 0.15s ease-out;
        -moz-transition: all 0.15s ease-out;
        -o-transition: all 0.15s ease-out;
        -ms-transition: all 0.15s ease-out;
        transition: all 0.15s ease-out;
        */
        &:before {
            content: "";
            position: absolute;
            width: 100%;
            height: 1px;
            bottom: 0;
            left: 0;
            background-color: #232323;
            visibility: hidden;
            -webkit-transform: scaleX(0);
            transform: scaleX(0);
            -webkit-transition: $thetransition;
            transition: $thetransition;
        }
        &:hover:before {
            visibility: visible;
            -webkit-transform: scaleX(1);
            transform: scaleX(1);
        }
    }
</style>