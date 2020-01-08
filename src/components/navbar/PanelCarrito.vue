<template>
    <v-navigation-drawer
        app
        right
        temporary
        v-model="panels" 
        hide-overlay
        :transition="transition()"  
        width="500"
    >
        <v-card color="#f7f7f7" elevation="0" height="100%">
            <!--HEADER DEL PANEL -->
            <v-toolbar elevation="0">
                <div class="title">
                    HoyProvoca 
                </div>
                <v-subheader>
                    compra ahora mismo
                </v-subheader>
                <v-spacer></v-spacer>
                <v-btn icon text depressed @click="change">
                    <v-icon>close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-divider class="mb-2"></v-divider>

            <!--si no hay pedidos se muestra un svg -->
            <div v-if="pedidos.length == 0">
                <v-img contain width="100%" height="100%" :src="require('@/assets/undrawempty.svg')"></v-img>
                <p class="mt-5 text-center font-weight-bold">su carrito esta vacio</p>
            </div>

            <!--pedidos-->
            <v-expansion-panels v-else>
                <v-expansion-panel
                    v-for="(pedido,i) in pedidos"
                    :key="i"
                    class="my-1"
                >
                    <v-expansion-panel-header>
                        <v-toolbar elevation="0" height="60">
                            <v-btn icon @click="deletePedido(pedido.id)"><v-icon>delete</v-icon></v-btn>
                            <v-spacer></v-spacer>
                            <v-avatar class="elevation-10" color="#eee" size="50">
                                <v-img src="@/assets/noimage.png"></v-img>
                            </v-avatar>
                            <!--
                            <v-spacer></v-spacer>
                            <div class="font-weight-bold">{{pedido.nombre}}</div>-->
                            <v-spacer></v-spacer>
                            <div class="font-weight-black">BsS. {{Number.parseFloat(totalPedido[i])}}</div>
                        </v-toolbar>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-divider></v-divider>
                        <v-toolbar elevation="0" height="60" v-for="(detalle,i) in pedido.detalles" :key="i">
                            <v-img 
                                width="50" 
                                height="50" 
                                contain 
                                src="@/assets/noimage.png"
                            />

                            <v-spacer></v-spacer>
                                <v-btn  class="mx-2" tile icon v-if="detalle.cantidad > 1">
                                    <v-icon dark>exposure_neg_1</v-icon>
                                </v-btn>
                                
                                <v-btn v-else @click="deletePedidosDetail(pedido,detalle)" class="mx-2" tile icon :loading="loading">
                                    <v-icon dark>delete</v-icon>
                                </v-btn>

                                <div class="mx-2 font-weight-black subtitle-1">{{Number.parseInt(detalle.cantidad)}}</div>

                                <v-btn class="mx-2" tile icon>
                                    <v-icon dark>plus_one</v-icon>
                                </v-btn> 
                            <v-spacer></v-spacer>

                            <div class="font-weight-black">Bss. {{detalle.precio}}</div>
                        </v-toolbar>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>

            <!--Totales-->
            <v-divider></v-divider>
            <v-toolbar elevation="0" height="100">
                <div>
                    <div class="py-2 text-center">BsS.</div>
                    <v-text-field 
                        solo
                        v-model="totalCarrito"
                        dense
                        color="#000"
                        hide-details
                        disabled
                        single-line
                        type="number"
                    />
                </div>
                <v-spacer></v-spacer>
                <div class="px-2">
                    <div class="py-2 text-center">$</div>
                    <v-text-field 
                        solo
                        v-model="dolares"
                        dense
                        color="#000"
                        hide-details
                        disabled
                        single-line
                        type="number"
                    />
                </div>
            </v-toolbar>
            <v-divider></v-divider>

            <div class="mt-3 py-3 text-center">
                <v-btn to="/checkout" color="#005598" :disabled="pedidos.length == 0 ? true:false" class="white--text" width="50%" rounded>
                    Ir a pagar
                </v-btn>
            </div>
        </v-card>
    </v-navigation-drawer>
</template>

<script>
import {mapState,mapActions,mapGetters} from 'vuex';
import Pedidos from '@/services/Pedidos';
import Usuario from '@/services/Usuario';

    export default {
        data(){
            return{
                dolares:53,
                totales:[],
                loading:false,
                index:null
            }
        },

        mounted(){
            if(this.user.loggedIn){
                this.getUsuario();
            }
        },

        computed: {
            ...mapState(['panel','pedidos','totalCarrito','totalPedido']),
            ...mapGetters(['user']),

            panels:{
                get(){
                    return this.panel; 
                },
                set(val){
                    this.setPanel(val);
                }
            }
        },

        methods: {
            ...mapActions(['setPanel','deletePedidos','deleteDetallePedidos','setPedidosServices','setDetallePedidos']),

            transition(){//animacion del panel
              if(this.panel){
                return "slide-x-transition";
              }else{
                return "slide-y-transition";
              }
            },

            change(){//cambia estado del panel de true a false
                if(this.panel==true){
                    this.setPanel(false);
                }else{
                    this.setPanel(true);
                }
            },

            //LLAMADAS A LA API
            getPedidosUsuario(id){//trae los pedidos del usuario logeado
                Usuario().get(`/${id}/pedidos`).then((response) =>{
                    if(response.data !== 'This entity is empty'){
                        this.setPedidosServices(response.data.data);//local method
                    }else{
                        console.log('no tienes pedidos');
                    }
                }).catch(e => {
                    console.log(e);
                });
            },

            getUsuario(){//metodo get para el usuario logeado
                Usuario().post("/validate", {user_token:this.user.token}).then((response) => {
                    this.getPedidosUsuario(response.data.data.id);
                }).catch(e => {
                    console.log(e);
                });
            },

            updatePedidosDetalles(id,id2){//actualiza un detalle del pedido (pricipalmente la cantidad)
                this.loading=true;

                Pedidos().post(`/${id}/detalles/${id2}`).then((response) => {
                    console.log(response);
                    this.loading=false;
                }).catch(e => {
                    console.log(e);
                    this.loading=false;
                });
            },

            deletePedidosDetail(pedido,detalle){//elimina el detalle de un pedido
                this.loading=true;
                
                if(pedido.detalles.length == 1){//se elimina el pedido entero si solo queda un detalle
                    this.deletePedido(pedido.id);
                }else{
                    Pedidos().delete(`/${pedido.id}/detalles/${detalle.id}`).then((response) => {
                        console.log(response);
                        this.deleteDetallePedidos(detalle);//local method
                        this.loading=false;
                    }).catch(e => {
                        console.log(e);
                        this.loading=false;
                    });
                }
            },

            deletePedido(id){//elimina un pedido completo
                this.loading=true;

                Pedidos().delete(`/${id}`).then((response) => {
                    console.log(response);
                    this.deletePedidos(id);//metodo local 
                    this.loading=false;
                }).catch(e => {
                    console.log(e);
                    this.loading=false;
                });
            },

            getConceptoExistencia(id){
                Conceptos().get(`/${id}/depositos`).then((response) =>{
                    console.log(response);
                }).catch(e => { 
                    console.log(e);
                });
            },
        },
    }
</script>