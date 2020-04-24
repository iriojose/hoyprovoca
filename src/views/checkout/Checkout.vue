<template>
    <div>
        <v-toolbar elevation="2" dark>
            <v-toolbar-title>
                <v-img 
                    contain 
                    height="60"
                    width="100"  
                    src="@/assets/logo 4.png"
                />
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-hover v-slot:default="{hover}">
                <v-btn :elevation="hover ? 2:0" color="#fff"
                    class="text-capitalize body-2 font-weight-bold black--text" to="/"
                >
                    Seguir comprando
                </v-btn>
            </v-hover>
        </v-toolbar>
        <v-divider></v-divider>

        <div class="text-center my-5 display-1 font-weight-bold">Checkout</div>

        <v-row justify="center" :class="$vuetify.breakpoint.smAndDown ? 'mx-2':'mx-10'">
            <v-col cols="12" sm="12" md="7">
                <v-card elevation="2" width="100%" height="300" class="py-3">
                    <v-list>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>Tus pedidos</v-list-item-title>
                                <v-list-item-subtitle>{{pedidos.length +' '}} pedidos</v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-content></v-list-item-content>
                        </v-list-item>
                    </v-list>
                    <v-slide-group show-arrows class="mx-5">
                        <v-slide-item v-for="(pedido,i) in pedidos" :key="i" class="mx-2 my-2">
                            <v-avatar size="50" class="elevation-2" @click="changePedido(i)">
                                <v-img :src="image+pedido.imagen"></v-img>
                            </v-avatar>
                        </v-slide-item>
                    </v-slide-group>

                    <v-list>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>Tus productos</v-list-item-title>
                                <v-list-item-subtitle>{{pedido.detalles.length +' '}} item</v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-content></v-list-item-content>
                        </v-list-item>
                    </v-list>

                    <v-slide-group show-arrows class="mx-5">
                        <v-slide-item v-for="(detalle,i) in pedido.detalles" :key="i" class="mx-2 my-2">
                            <v-avatar size="50" class="elevation-2">
                                <v-img :src="image+detalle.imagen"></v-img>
                            </v-avatar>
                        </v-slide-item>
                    </v-slide-group>
                </v-card>
            </v-col>

            <v-col cols="12" sm="12" md="4">
                <v-card elevation="2" width="100%" height="250">
                    <v-list dense>
                        <v-list-item>
                            <v-list-item-content class="grey--text subtitle-1">Subtotal:</v-list-item-content>
                            <v-list-item-content>{{total}}</v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content class="grey--text subtitle-1">Propina:</v-list-item-content>
                            <v-list-item-content>Bs 00,00</v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content class="grey--text subtitle-1">Domicilio:</v-list-item-content>
                            <v-list-item-content>Bs 00,00</v-list-item-content>
                        </v-list-item>

                        <v-divider class="mx-5 my-5"></v-divider>

                        <v-list-item>
                            <v-list-item-content class="font-weight-black title">
                                Total:
                            </v-list-item-content>
                            <v-list-item-content>
                                {{total}}
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-col>

            <v-col cols="12" md="8" sm="12">
                <v-card elevation="2" width="100%" height="500">
                    <v-row justify="center" align="center">
                        <v-col cols="12" md="8" sm="12">
                            <v-file-input
                                label="Abjuntar Pago"
                                counter
                                prepend-icon="mdi-camera"
                                accept="image/png, image/jpeg"
                                @change="change($event)"
                                dense
                                color="#005598"
                                outlined
                            />
                        </v-col>
                        <v-col cols="12" md="12" sm="12">
                            <v-img :width="$vuetify.breakpoint.smAndDown ? '100%':'100%'" height="350" contain v-if="bauche" :src="bauche" />
                        </v-col>
                        <v-col cols="12" md="12" sm="12" v-if="bauche">
                            <v-btn 
                                block color="#005598" 
                                class="text-capitalize white--text" 
                                rounded @click="pagar"
                                :loading="loading"
                            >
                                Enviar pago
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>

        <v-snackbar v-model="snackbar" :color="color" bottom right :timeout="1000">
            <div>
                <v-icon color="#fff" class="mx-2">{{icon}}</v-icon>{{mensaje}}
            </div>
        </v-snackbar>
    </div>
</template>

<script>
import accounting from 'accounting';
import {mapState,mapActions} from 'vuex';
import variables from '@/services/variables_globales';
import Usuario from '@/services/Usuario';
import Pedidos from '@/services/Pedidos';
import Images from '@/services/Images';
import Movimiento_banco from '@/services/Movimiento_banco';
import router from '@/router';

    export default {
        data() {
            return {
                ...variables,
                pedido:{},
                empresa:{},
                total:'',
                sales:[],
                bauche:null,
                imagen:null,
                mensaje:'',
                color:'',
                icon:'',
                loading:false,
                snackbar:false,
                index:0,
                movimiento:{
                    adm_banco_id: 1,
                    adm_tipo_pago_id: 3,
                    credito: 0,
                    origen: "PEDIDO",
                    documento: "0",
                }
            }
        },
        mounted() {
            this.getPedidosUsuario();
        },
        head:{
            title(){
                return {
                    inner:'Checkout',
                    separator:' ',
                    complement: ' '
                }
            }
        },
        computed: {
            ...mapState(['user','pedidos','totalPedidos'])
        },
        methods:{
            ...mapActions(['setPedidos','deletePedidoStore']),
            
            change(evt){
                this.bauche=null;
                if(evt){
                    var reader = new FileReader();
                    reader.onload = (e) => {
                        this.bauche = e.target.result;
                        this.imagen = evt;
                    }
                    reader.readAsDataURL(evt);
                }
            },
            mensajeSnackbar(color,icon,mensaje){
                this.color=color;
                this.icon=icon;
                this.mensaje=mensaje;
                this.loading=false;
                this.snackbar=true;
            },
            changePedido(index){
                this.index = index;
                this.pedido = this.pedidos[index];
                this.total = accounting.formatMoney(+this.totalPedidos[index],{symbol:"Bs ",thousand:'.',decimal:','});
            },
            getPedidosUsuario(){
                Usuario().get(`/${this.user.data.id}/pedidos/?rest_estatus_id=1`).then((response) => {
                    if(response.data !== 'This entity is empty'){
                        this.setPedidos(response.data.data);
                        this.pedido = this.pedidos[0];
                        this.total = accounting.formatMoney(+this.totalPedidos[0],{symbol:"Bs ",thousand:'.',decimal:','});
                    }
                }).catch(e => {
                    console.log(e);
                });
            },
            pagar(){
                this.loading=true;
                this.movimiento.credito = this.total;
                this.movimiento.documento = this.pedido.id;

                Movimiento_banco().post("/",{data:this.movimiento}).then((response) => {
                    console.log(response);
                    this.postImagen(response.data.response.data.id);
                    this.updatePedido();
                }).catch(e => {
                    console.log(e);
                    this.mensajeSnackbar('#D32F2F','error','Ooops, ocurrio un error.');
                });
            },
            postImagen(id){
                let formdata = new FormData();
                formdata.append('image',this.imagen);

                Images().post(`/main/movimientos_bancos/${id}`,formdata).then((response) => {
                    //this.mensajeSnackbar('#388E3C','done','Pago enviado exitosamente.');
                }).catch(e =>  {
                    console.log(e);
                    //this.mensajeSnackbar('#D32F2F','error','Ooops, ocurrio un error.');
                });
            },  
            updatePedido(){
                Pedidos().post(`/${this.pedido.id}`,{data:{rest_estatus_id:2}}).then((response) => {
                    this.mensajeSnackbar('#388E3C','done','Pago enviado exitosamente.');
                    this.deletePedidoStore(this.index);
                    setTimeout(() => { router.push("/") },1000);
                }).catch(e => {
                    console.log(e);
                    this.mensajeSnackbar('#D32F2F','error','Ooops, ocurrio un error.');
                });
            }
        }
    }
</script>

<style lang="css" scope>
    .margen-top{
        margin-top:75px;
    }
    .margen-movil{
        margin-top:120px;
    }
    .shadow{
        box-shadow: 0px 5px 9px -1px rgba(135,127,135,1);
    }
</style>