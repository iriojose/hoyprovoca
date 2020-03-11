<template>
    <v-row
        justify="center"
        align="center"
        :class="$vuetify.breakpoint.smAndDown ? 'fill-height mx-5':'fill-height'"
    >
        <v-col cols="12" md="4" lg="4" class="hidden-sm-and-down">
            <v-img contain width="100%" height="300" :src="require('@/assets/undrawregistro2.svg')"></v-img>
        </v-col>
        <v-col cols="12" md="3" sm="10">
            <v-card elevation="5" class="py-5" width="100%">
                <div class="text-center my-5 font-weight-black subtitle-1">Registrate en Aftim</div>
                <v-card-text>
                    <FormCliente />
                </v-card-text>
                <div class="mx-10 my-5">
                    <v-divider></v-divider>
                </div>
                <v-hover v-slot:default="{hover}">
                    <div @click="push()" class="text-center" >
                        <a :class="hover ? 'mx-2 subtitle-2 text-color decoracion':'mx-2 subtitle-2 text-color'">
                            ¿ya tienes una cuenta? inicie sesión
                        </a>
                    </div>
                </v-hover>
            </v-card>
            <div class="text-center my-3">
                <v-hover v-slot:default="{hover}">
                    <span
                        :class="hover ? 'mx-2 caption decoracion text-color font-weight-medium':'font-weight-medium mx-2 caption text-color'"
                    >Politicas de privacidad</span>
                </v-hover>·
                <v-hover v-slot:default="{hover}">
                    <span
                        :class="hover ? 'mx-2 caption decoracion text-color font-weight-medium':' font-weight-medium mx-2 caption text-color'"
                    >condiciones del servicio</span>
                </v-hover>
            </div>
        </v-col>
        <v-col cols="12" md="4" lg="4" class="hidden-sm-and-down"></v-col>
    </v-row>
</template>

<script>
import FormCliente from "@/components/vistaAuth/FormCliente";
import router from '@/router';

export default {
    components: {
        FormCliente
    },
    methods: {
        push(){
            router.push('/login');
        }
    },
};
</script>

<style scoped>
    .background {
        background-color: rgba(0, 82, 152, 0.8);
        height: 30%;
        width: 100%;
    }
    .margen {
        margin-top: 250px;
    }
    .text-color {
        color: #005598;
    }
    .decoracion {
        text-decoration: underline;
        text-decoration-color: #005598;
        transition-delay: 2s;
        transition-duration: 1s;
    }
</style>