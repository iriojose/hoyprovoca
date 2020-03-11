<template>
    <div>
        <v-toolbar color="#005598" width="100%">
            <v-toolbar-items>
                <v-hover v-slot:default="{hover}">
                    <v-btn class="white--text text-capitalize" elevation="0" to="/" text>
                        Inicio
                        <v-slide-y-transition>
                            <v-icon large color="#fff" v-show="hover">home</v-icon>
                        </v-slide-y-transition>
                    </v-btn>
                </v-hover>
            </v-toolbar-items>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-hover v-slot:default="{hover}">
                    <v-btn width="200" color="#005598" elevation="0" to="/register/cliente">
                        <span class="white--text text-capitalize">Registrate</span>
                        <v-slide-x-transition>
                            <v-icon color="#fff" x-large v-show="hover">keyboard_arrow_right</v-icon>
                        </v-slide-x-transition>
                    </v-btn>
                </v-hover>
            </v-toolbar-items>
        </v-toolbar>

        <v-row justify="center" align="center" class="fill-height my-12">
            <v-img contain width="100" height="30" :src="require('@/assets/log.png')"></v-img>
        </v-row>

        <v-row
            justify="center"
            align="center"
            :class="$vuetify.breakpoint.smAndDown ? 'fill-height mx-5':'fill-height'"
        >
            <v-col cols="12" md="4" lg="4" class="hidden-sm-and-down">
                <v-img contain width="100%" height="300" :src="require('@/assets/undrawlogin.svg')"></v-img>
            </v-col>

            <v-col cols="12" md="3" sm="10">
                <v-card width="100%" height="400" elevation="5" class="py-5">
                    <div class="text-center my-5 font-weight-black subtitle-1">Iniciar sesión en Aftim</div>
                    <v-card-text>
                        <FormLogin />
                    </v-card-text>
                    <div class="mx-10 my-5">
                        <v-divider></v-divider>
                    </div>
                    <v-hover v-slot:default="{hover}">
                        <div @click="push()" class="text-center" >
                            <a :class="hover ? 'mx-2 subtitle-2 text-color decoracion':'mx-2 subtitle-2 text-color'">
                                ¿No puede iniciar sesión?
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

            <v-col cols="12" md="4" lg="4" class="hidden-sm-and-down">
                <v-img contain width="100%" height="300" :src="require('@/assets/undrawlogin2.svg')"></v-img>
            </v-col>
        </v-row>

        <v-footer fixed color="#eee">
            <SubFooter />
        </v-footer>
    </div>
</template>

<script>
import FormLogin from "@/components/vistaAuth/FormLogin";
import SubFooter from "@/components/footer/SubFooter";
import router from '@/router';

export default {
    components: {
        FormLogin,
        SubFooter
    },
    methods: {
        press() {},
        push(){
            router.push('/forgot');
        }
    },
    head: {
        title() {
            return {
                inner: "HoyProvoca",
                separator: "|",
                complement: "Login"
            };
        }
    }
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