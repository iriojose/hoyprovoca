<template>
    <div :style="`background-color:${theme.background.primary};height:100%;width:100%;`">
        <v-app-bar app color="#fff" :elevation="$vuetify.breakpoint.smAndDown ? 1:0" :class="$vuetify.breakpoint.smAndDown ? null:'px-12'">  
            <v-spacer class="hidden-sm-and-up"></v-spacer>
            <v-img
                v-if="theme.background.dark" alt="Hoyprovoca logo"
                class="shrink mr-2 cursor"
                contain src="@/assets/logo6.png" transition="scale-transition"
                width="200" height="100" @click="push2"
            />
            <v-img
                v-else alt="Hoyprovoca logo" class="shrink mr-2 cursor"
                contain src="@/assets/logo2.png" transition="scale-transition"
                width="200" height="100" @click="push2"
            />
            <v-spacer></v-spacer>
            <v-btn class="text-capitalize font-weight-bold mx-2" text to="/register" v-if="!$vuetify.breakpoint.smAndDown">
                Registrate
                <v-icon class="mx-2">
                    mdi-text-box-minus
                </v-icon>
            </v-btn>
            <v-btn class="text-capitalize font-weight-bold mx-2" text to="/" v-if="!$vuetify.breakpoint.smAndDown">
                Inicio
                <v-icon class="mx-2">
                    mdi-home
                </v-icon>
            </v-btn>
        </v-app-bar>

        <v-card
            color="transparent" elevation="0"
            width="100%" :style="`background:${theme.background.light}`"
        >
            <v-card-text>
                <v-row justify="center" class="py-2">
                    <v-col cols="12" md="9" sm="12">
                        <v-card
                            :color="theme.background.light"
                            :style="`color:${theme.background.font}!important`"
                            width="100%"
                            elevation="0"
                            style="padding: 0 15px"
                        >
                            <v-row justify="center">
                                <v-col
                                    cols="12"
                                    md="6"
                                    class="hidden-sm-and-down"
                                >
                                    <v-img
                                        width="100%"
                                        height="400"
                                        contain
                                        :src="
                                            require('@/assets/undrawlogin.svg')
                                        "
                                    ></v-img>
                                </v-col>
                                <v-col
                                    cols="12"
                                    md="6"
                                    sm="12"
                                    class="px-8 py-12"
                                    :style="
                                        `background:${theme.background.light_2}`
                                    "
                                >
                                    <div class="headline text-center mb-5">
                                        Inicia sesión ahora!
                                    </div>

                                    <v-card
                                        elevation="0"
                                        height="50"
                                        :color="theme.background.light_2"
                                    >
                                        <v-fade-transition>
                                            <v-alert
                                                border="left"
                                                colored-border
                                                elevation="2"
                                                dense
                                                :type="type"
                                                v-show="showMessage"
                                            >
                                                {{ mensaje }}
                                            </v-alert>
                                        </v-fade-transition>
                                    </v-card>

                                    <v-form
                                        :style="
                                            `background-color:${theme.background.light_2}`
                                        "
                                        :color="theme.background.light"
                                        v-model="valid"
                                        @submit.prevent=""
                                    >
                                        <v-text-field
                                            :dark="theme.background.dark"
                                            filled
                                            rounded
                                            :disabled="loading"
                                            v-model="data.user"
                                            single-line
                                            dense
                                            :color="theme.background.light_2"
                                            :success-messages="success"
                                            :error-messages="errors"
                                            @input="getUser(data.user)"
                                            label="Ingrese correo electrónico"
                                        >
                                            <template v-slot:append>
                                                <v-fade-transition
                                                    leave-absolute
                                                >
                                                    <v-progress-circular
                                                        v-if="loading2"
                                                        size="24"
                                                        :color="theme.background.primary"
                                                        indeterminate
                                                    ></v-progress-circular>
                                                    <img
                                                        v-else
                                                        width="24"
                                                        height="24"
                                                        :src="require('@/assets/2.png')"
                                                    />
                                                </v-fade-transition>
                                            </template>
                                        </v-text-field>

                                        <v-text-field
                                            :dark="theme.background.dark"
                                            filled
                                            rounded
                                            dense
                                            @click:append="showPassword = !showPassword"
                                            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                            :disabled="loading"
                                            v-model="data.password"
                                            single-line
                                            :type="showPassword ? 'text':'password'"
                                            :rules="[
                                                required('Contraseña'),
                                                minLength('Contraseña', 6),
                                            ]"
                                            label="Contraseña"
                                        ></v-text-field>

                                        <v-btn
                                            rounded
                                            :color="theme.buttons.secondary"
                                            block
                                            :loading="loading"
                                            height="40"
                                            :disabled="valid && success !== '' ? false: true"
                                            @click="login()"
                                            :style="`color:${theme.buttons.font}!important`"
                                            class="text-capitalize caption "
                                        >
                                            Iniciar sesión
                                        </v-btn>
                                    </v-form>

                                    <v-divider class="my-5"></v-divider>

                                    <div
                                        :style="
                                            `background-color:${theme.background.light_2} ;color:${theme.background.font}!important;font-weight:bold; `
                                        "
                                        class="subtitle-2 text-center color"
                                        @click="forgot"
                                    >
                                        ¿Olvidaste tu contraseña? ¡Recuperala!
                                    </div>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>

        <v-footer
            fixed elevation="0"
            :color="theme.background.primary"
        >
            <v-col class="text-center black--text font-weight-black" cols="12">
                {{ new Date().getFullYear() }} — <strong>Hoyprovoca</strong>
            </v-col>
        </v-footer>
    </div>
</template>

<script>
import router from "@/router";
import validations from "@/validations/validations";
import Auth from "@/services/Auth";
import Usuario from "@/services/Usuario";
import Clientes from "@/services/Clientes";
import Pedidos from "@/services/Pedidos";
import { mapActions, mapState } from "vuex";

export default {
    data() {
        return {
            ...validations,
            mensaje: "",
            type: "error",
            showMessage: false,
            showPassword:false,
            loading: false,
            loading2: false,
            valid: false,
            success: "",
            errors: [],
            aux: [],
            data: {
                user: "",
                password: "",
            },
        };
    },
    head: {
        title() {
            return {
                inner: "Iniciar sesión",
                separator: " ",
                complement: " ",
            };
        },
    },
    computed: {
        ...mapState(["theme"]),
    },
    methods: {
        ...mapActions(["logged", "setModalBloqueado", "setPedidos"]),
        push2() {
            router.push("/");
        },
        register() {
            router.push("/register");
        },
        home() {
            router.push("/");
        },
        forgot() {
            router.push("/forgot");
        },
        respuesta(mensaje, type) {
            this.mensaje = mensaje;
            this.type = type;
            this.loading = false;
            this.showMessage = true;
            setTimeout(() => {
                this.showMessage = false;
            }, 2000);
        },
        async getUser(email) {
            this.errors = [];
            this.success = "";
            if (email.length <= 0) return this.errors.push("Debe ingresar un email");
            // eslint-disable-next-line
            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
            if (!regex.test(email)) return this.errors.push(`Debe ingresar un email válido`);
            this.loading2 = true;
            await Usuario().get(`/?email=${email}`).then((response) => {
                this.loading2 = false;
                if (!response.data.data) {
                    return this.errors.push("Este email no esta registrado");
                } else {
                    if (response.data.data[0].bloqueado == 1) {
                        return this.errors.push("Esta cuenta se encuentra bloqueada.");
                    } else {
                        return (this.success = "Email verificado");
                    }
                }
            }).catch((e) => {
                console.log(e);
                this.loading2 = false;
                return this.errors.push("Error de conexión");
            });
        },
        login() {
            this.loading = true;
            Auth().post("/login", { data: this.data }).then((response) => {
                if (response.data.data.bloqueado == 1) {
                    this.setModalBloqueado(true);
                    this.loading = false;
                 } else if (response.data.data.perfil_id == 3) {
                    this.getCliente(response.data);
                } else {
                    this.respuesta("Este usuario no es un cliente.","error");
                }
            }).catch((e) => {
                console.log(e);
                this.respuesta("Contraseña incorrecta.", "error");
            });
        },
        getCliente(data) {
            Clientes().get(`/?usuario_id=${data.data.id}`).then((response) => {
                data.cliente = response.data.data[0];
                this.logged(data);
                this.respuesta("Bienvenido.", "success");
                setTimeout(() => {
                    this.home();
                }, 1000);
                this.getPedidos(data.cliente.id);
            }).catch((e) => {
                this.respuesta("Contraseña incorrecta.", "error");
            });
        },
        getPedidos(id) {
            Clientes().get(`/${id}/pedidos/?rest_estatus_id=1`).then((response) => {
                if (response.data.data) {
                    this.aux = response.data.data;
                    response.data.data.filter((a, i) =>
                        this.getConceptos(a, i)
                    );
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        getConceptos(data, i) {
            //trae los conceptos de un pedido
            Pedidos().get(`/${data.id}/conceptos`).then((response) => {
                this.aux[i].conceptos = response.data.data;
                if (i == this.aux.length - 1) this.setPedidos(this.aux);
            }).catch((e) => {
                console.log(e);
            });
        },
    },
};
</script>

<style lang="scss" scoped>
    .fondo {
        background: #1f3b63;
        height: 100%;
    }
    .color {
        color: #000;
        background: #fff;
    }
    .color:hover {
        cursor: pointer;
        text-decoration: underline;
        background: #fff;
    }
</style>
