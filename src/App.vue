<template>
    <v-app>
        <div v-show="false" id="talkjs-chat-global" style="width: 100%;; height: 450px"><i><v-spacer></v-spacer><v-spacer></v-spacer></i></div>

        <Navbar v-if="ruta() && !loading" />
        <BarraLateral style="z-index:4;" />
        
        <v-main
            v-if="!loading"
            :style="`background-color:${theme.background.light}`"
        >
            <transition name="fade">
                <router-view />
            </transition>
        </v-main>

        <v-card elevation="0" width="100%" height="100%" v-if="loading">
            <v-card-text>
                <v-row
                    justify="center"
                    align="center"
                    class="fill-height margen"
                >
                    <div>
                        <v-row justify="center">
                            <Loading />
                        </v-row>
                        <v-btn
                            v-show="error"
                            color="#c9242b"
                            @click="sesion(token)"
                            rounded
                            class=" my-4 text-capitalize subtitle-2 font-weight-bold white--text"
                        >
                            Recargar
                            <v-icon class="mx-2" color="#fff"
                                >mdi-reload</v-icon
                            >
                        </v-btn>
                    </div>
                </v-row>
            </v-card-text>
        </v-card>

        <Footer v-if="ruta() && !loading" />

        <ModalBloqueado />
        <ModalSesion />
        <ModalProducto />

        <BottomNavigation v-if="ruta() && $vuetify.breakpoint.smAndDown && !loading" />

        <BottomNavigationOff v-if="!ruta() && !loading && $route.name !== 'checkout'" />
    </v-app>
</template>

<script>
import Pedidos from "@/services/Pedidos";
import Auth from "@/services/Auth";
import Clientes from "@/services/Clientes";
import Empresa from "@/services/Empresa";
import Grupos from "@/services/Grupos";
import Direcciones from '@/services/Direcciones';
import { mapActions, mapState } from "vuex";

export default {
    name: "App",
    components: {
        Navbar: () => import("@/components/navbar/AppBar"),
        Footer: () => import("@/components/footer/Footer"),
        ModalBloqueado: () => import("@/components/dialogs/ModalBloqueado"),
        ModalSesion: () => import("@/components/dialogs/ModalSesion"),
        ModalProducto: () => import("@/components/dialogs/ModalProducto"),
        BottomNavigation: () => import("@/components/footer/BottomNavigation"),
        Loading:() => import("@/components/loaders/Loading"),
        BottomNavigationOff:() => import("@/components/footer/FooterOff"),
        BarraLateral:() => import("@/components/navbar/BarraLateral"),
    },
    data() {
        return {
            loading: false,
            error: false,
            token: null,
            aux: [],
        };
    },
    computed: {
        ...mapState(["user", "bloqueado", "theme"]),
    },
    watch: {
        user() {
            this.setChatSession()
        }
    },
    created() {
        this.token = JSON.parse(window.sessionStorage.getItem("token_client"));
        if (this.token != null && this.token != "" && this.token != undefined) this.sesion(this.token);
        else this.loading = false;

        let grupos = JSON.parse(window.localStorage.getItem("gruposMasVendidos"));
        if (!grupos) this.getGrupos();
        else this.setGrupos(grupos);

        let empresas = JSON.parse(window.localStorage.getItem("empresasMasVendidas"));
        if (!empresas) this.getEmpresas();
        else this.setEmpresas(empresas);

        let municipios = JSON.parse(window.localStorage.getItem('municipios'));
        if(municipios) this.setMunicipios(municipios);
        else this.getUbicaciones();
    },
    methods: {
        ...mapActions([
            "logged",
            "setModalBloqueado",
            "setGrupos",
            "setEmpresas",
            "setPedidos",
            "setChatSession",
            "setMunicipios"
        ]),

        ruta() {
            if (
                this.$route.name == "login" ||
                this.$route.name == "forgot" ||
                this.$route.name == "register" ||
                this.$route.name == "notauthorized" ||
                this.$route.name == "notfound" ||
                this.$route.name == "checkout" ||
                this.$route.name == "trabajar" ||
                this.$route.name == "comopagar" ||
                this.$route.name == "terminosycondiciones" ||
                this.$route.name == "privacidad" ||
                this.$route.name == "reset" ||
                this.$route.name == "verify"
            ) {
                return false;
            } else {
                return true;
            }
        },
        getEmpresas() {
            //trae las empreasa
            Empresa().get("/?activo<0&limit=100").then((response) => {
                console.log(response.data.data);
                window.localStorage.setItem("empresasMasVendidas",JSON.stringify(response.data.data));
                this.setEmpresas(response.data.data);
            }).catch((e) => {
                console.log(e);
            });
        },
        getGrupos() {
            //trae los grupos de la aplicacion
            Grupos().get("/mostsold/?limit=10").then((response) => {
                window.localStorage.setItem("gruposMasVendidos",JSON.stringify(response.data.data));
                this.setGrupos(response.data.data);
            }).catch((e) => {
                console.log(e);
            });
        },
        getUbicaciones(){
            Direcciones().get("/16").then((response) => {
                this.setMunicipios(response.data.data.detalles);
                window.localStorage.setItem("municipios",JSON.stringify(response.data.data.detalles));
            }).catch(e => {
                console.log(e);
            });
        },
        //sesion
        sesion(token) {
            //valida el token
            this.loading = true;
            this.error = false;
            Auth().post("/sesion", { token: token }).then((response) => {
                if(response.data.code == 440){
                    this.loading = false;
                    this.error = false;
                    localStorage.removeItem("token_client");
                }
                if(response.data.response.data.bloqueado == 1){
                    this.setModalBloqueado(true);
                    this.loading = false;
                    this.error = false;
                    localStorage.removeItem("token_client");
                } 
                if(response.data.code == 200) {
                    response.data.response.token = token;
                    response.data.response.cliente = response.data.response.data.cliente[0];
                    delete response.data.response.data.cliente;
                    this.logged(response.data.response);
                    this.loading = false;
                    this.pedidosLocalStorage(); //verifica los pedidos del localStorage
                }
            }).catch((e) => {
                this.error = true;
            });
        },
        getPedidos() {
            Clientes().get(`/${this.user.cliente.id}/pedidos/?rest_estatus_id=1`).then((response) => {
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
        pedidosLocalStorage() {
            //let pedidos = JSON.parse(window.localStorage.getItem("pedidos"));
            //if(!pedidos) this.getPedidos();
            //else this.setPedidos(pedidos);//trae pedidos del cliente
            this.getPedidos();
        },
    },
    mounted() {
        this.setChatSession("talkjs-chat-global")
    },
    beforeUpdated(){
        this.setChatSession("talkjs-chat-global")
    }
};
</script>

<style lang="scss">
    /*@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=swap');*/
    /*@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=swap');*/
    @import url("https://fonts.googleapis.com/css2?family=Alata&display=swap");


    html {
        scroll-behavior: smooth;
    }


    body {
    overflow-x: hidden!important;
    }

    .margen {
        margin-top: 150px;
    }
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s;
    }
    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }
    ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }
    ::-webkit-scrollbar-thumb {
        background: #ccc;
        border-radius: 12px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: #b3b3b3;
        box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
    }
    ::-webkit-scrollbar-thumb:active {
        background-color: #999999;
    }
    ::-webkit-scrollbar-track {
        background: #fff;
        border-radius: 12px;
    }
    ::-webkit-scrollbar-track:hover,
    ::-webkit-scrollbar-track:active {
        background: #fff;
    }
    .v-application {
        font-family: "Spartan", sans-serif!important;
    }
    .v-application .headline, .v-application .title {
        font-family: "Spartan", sans-serif!important;
        padding:1px
    }
</style>
