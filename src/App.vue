<template>
    <v-app style="background-color:#f7f7f7;">
        <AppBar v-show="ruta() && !loading" />

        <v-card elevation="0" color="#fff" width="100%" height="100%" v-show="loading">
            <v-row justify="center" class="fill-height" align="center">
                <v-img width="500" height="500" contain :src="require('@/assets/loader.gif')"></v-img>
            </v-row>
        </v-card>
        
        <transition name="fade">
            <router-view v-show="!loading" />
        </transition> 

        <ModalBloqueado /> 
        <ModalProducto />
        <ModalSesion />
        <ModalImagen />

        <Footer v-show="ruta() && !loading" class="margen" />
    </v-app>
</template>

<script>
//services
import Pedidos from '@/services/Pedidos';
import Auth from '@/services/Auth';
import Clientes from '@/services/Clientes';
import Empresa from "@/services/Empresa";
import Grupos from "@/services/Grupos";
import {mapActions,mapState} from 'vuex';

    export default {
        name: 'App',
        components:{
            AppBar:() => import('@/components/navbar/AppBar'),
            ModalBloqueado:() => import('@/components/dialogs/ModalBloqueado'),
            ModalProducto:() => import('@/components/dialogs/ModalProducto'),
            ModalSesion:() => import('@/components/dialogs/ModalSesion'),
            ModalImagen:() => import('@/components/dialogs/ModalImagen'),
            Footer:() => import('@/components/footer/Footer'),
        },
        data(){
            return {
                loading:true,
                aux:[]
            }
        },
        computed: {
            ...mapState(['user'])
        },
        created() {
            let token = JSON.parse(window.sessionStorage.getItem('token_client'));
            if(token) this.sesion(token);
            else this.loading = false;
        },
        mounted(){
            let grupos = JSON.parse(window.localStorage.getItem("gruposMasVendidos"));
            if (!grupos) this.getGrupos();
            else this.setGrupos(grupos);

            let empresas = JSON.parse(window.localStorage.getItem("empresasMasVendidas"));
            if (!empresas) this.getEmpresas();
            else this.setEmpresas(empresas);
        },
        methods:{
            ...mapActions(['logged','setModalBloqueado','setGrupos','setEmpresas','setPedidos']),

            pedidosLocalStorage(){
                let pedidos = JSON.parse(window.localStorage.getItem("pedidos"));
                if(!pedidos) this.getPedidos();
                else this.setPedidos(pedidos);//trae pedidos del cliente
            },
            sesion(token){//valida el token
                Auth().post("/sesion",{token:token}).then((response) => {
                    if(response.data.response.data.bloqueado == 1){
                        this.setModalBloqueado(true);
                        this.loading = false;
                    }else {
                        response.data.response.token = token;
                        this.getClient(response.data.response);
                    }
                }).catch(e => {
                    console.log(e);
                    this.loading = false;
                });
            },
            getClient(data){//trae el cliente perteneciente a la cuenta
                Clientes().get(`/?usuario_id=${data.data.id}`).then((response) => {
                    data.cliente = response.data.data[0];
                    this.logged(data);
                    this.loading = false;
                    this.pedidosLocalStorage();//verifica los pedidos del localStorage
                }).catch(e => {
                    console.log(e);
                    this.loading = false;
                });
            },
            getPedidos(){
                Clientes().get(`/${this.user.cliente.id}/pedidos/?rest_estatus_id=1`).then((response) => {
                    if(response.data.data){
                        this.aux = response.data.data;
                        response.data.data.filter((a,i) => this.getConceptos(a,i));
                    }
                }).catch(e => {
                    console.log(e);
                });
            },
            getConceptos(data,i){//trae los conceptos de un pedido
                Pedidos().get(`/${data.id}/conceptos`).then((response) => {
                    this.aux[i].conceptos = response.data.data;
                    if(i == this.aux.length - 1) this.setPedidos(this.aux);
                }).catch(e => {
                    console.log(e);
                });
            },
            getEmpresas() {//trae las empreasa
                Empresa().get("/?limit=8").then((response) => {
                    window.localStorage.setItem("empresasMasVendidas",JSON.stringify(response.data.data));
                    this.setEmpresas(response.data.data);
                }).catch((e) => {
                    console.log(e);
                });
            },
            getGrupos() {//trae los grupos de la aplicacion
                Grupos().get("/mostsold/?limit=10").then((response) => {
                    window.localStorage.setItem("gruposMasVendidos",JSON.stringify(response.data.data));
                    this.setGrupos(response.data.data);
                }).catch((e) => {
                    console.log(e);
                });
            },
            ruta(){
                if(
                    this.$route.name == 'login' || 
                    this.$route.name == 'forgot' ||
                    this.$route.name == 'register' ||
                    this.$route.name == 'notauthorized' ||
                    this.$route.name == 'notfound' ||
                    this.$route.name == 'checkout' ||
                    this.$route.name == 'prueba' ||
                    this.$route.name == 'comopagar' || 
                    this.$route.name == 'terminosycondiciones' ||
                    this.$route.name == 'privacidad' ||
                    this.$route.name == 'reset' ||
                    this.$route.name == 'verify'
                ){
                    return false;
                }else{
                    return true;
                }
            },
        }
    }
</script>

<style>
    html {
        scroll-behavior: smooth;
    }
    .margen{
        margin-top:150px;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to{
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
</style>