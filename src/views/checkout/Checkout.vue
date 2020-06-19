<template>
    <v-card elevation="0" color="#f7f7f7">
        <v-toolbar elevation="2" color="#0f2441">
            <v-toolbar-title>
                <v-img 
                    contain 
                    height="100"
                    width="150"  
                    src="@/assets/logo 6.png"
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

        <v-card-text>
            <div class="text-center my-5 display-1 font-weight-bold">Checkout</div>

            <v-slide-group multiple show-arrows :class="$vuetify.breakpoint.smAndDown? null:'mx-10'">
                <v-slide-item v-for="(pedi,i) in pedidos" :key="i">
                    <v-btn :disabled="pedido.id == pedi.id" class="mx-2" depressed rounded height="50" @click="selectPedido(pedi,i)">
                        <v-avatar size="40">
                            <v-img :src="image+pedi.imagen"></v-img>
                        </v-avatar>
                    </v-btn>
                </v-slide-item>
            </v-slide-group>

            <v-card 
                :class="$vuetify.breakpoint.smAndDown ? 'my-5 mx-2':'mx-10 my-5'" 
            >
                <v-card-text>
                    <v-scroll-x-transition>
                        <v-row justify="center" v-show="view == 1">
                            <v-col cols="12" md="6" sm="12" class="pa-5">

                                <div class="font-weight-bold title">Tus productos</div>
                                <div class="font-weight-bold subtitle-1">{{pedido.detalles.length +' '}} item</div>

                                <v-list>
                                    <v-list-item v-for="(detalle,i) in pedido.detalles" :key="i">
                                        <v-list-item-avatar>
                                            <v-img :src="image+detalle.imagen"></v-img>
                                        </v-list-item-avatar>
                                        <v-list-item-title>
                                            {{detalle.precio}}
                                        </v-list-item-title>
                                        <v-list-item-title>
                                            {{detalle.cantidad}}
                                        </v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-col>
                            <v-col cols="12" md="4" sm="12">
                                <div class="font-weight-bold title">Subtotal a pagar</div>
                                <div class="font-weight-bold subtitle-1">{{total}}</div>

                                <v-select
                                    :items="tiposDePago" dense color="#0f2441" filled
                                    rounded item-value="nombre" return-object item-text="nombre"
                                    persistent-hint hint="Metodo De Pago" label="Seleccione su metodo de pago"
                                    single-line v-model="pago" class="my-5"
                                ></v-select>

                                <v-btn 
                                    block color="#0f2441" :disabled="pago ? false:true"
                                    class="text-capitalize subtitle-2 my-5 white--text font-weight-bold"
                                    @click="view = 2"
                                >Pagar</v-btn>
                            </v-col>
                        </v-row>
                    </v-scroll-x-transition>

                    <v-scroll-x-transition>
                        <v-row v-show="view == 2" justify="center">
                            <v-col cols="12" md="6" sm="12" class="pa-5">
                                <div class="font-weight-bold title">Subtotal a pagar</div>
                                <div class="font-weight-bold subtitle-1">{{total}}</div>

                                <div class="text-center font-weight-bold title my-5">
                                    Datos de la cuenta
                                </div>
                                <div>Nombre:Jesus Bellorin</div>
                                <div>cedula:212121212</div>
                                <div>cuenta:212121212121212</div>
                                <div>banco:zelle</div>

                                <v-form v-model="valid" class="my-5">
                                    <v-text-field
                                        v-model="data.codigo_referencia" filled
                                        dense color="#0f2441" hint="Referencia del pago"
                                        persistent-hint rounded single-line label="Codigo de referencia"
                                        :rules="[required('Codigo de referencia')]"
                                    ></v-text-field>
                                </v-form>

                                <v-btn block color="#0f2441"
                                    class="text-capitalize subtitle-2 my-5 white--text font-weight-bold"
                                    @click="postPago()"
                                >Enviar pago</v-btn>
                            </v-col>
                            <v-col cols="12" md="4" sm="12" class="pa-5">
                                <FilePond  
                                    ref="pond"
                                    label-idle="Drop image here..."
                                    labelFileAdded = "Archivo Añadido"
                                />

                                <v-btn fab small @click="view = 1">
                                    <v-icon>mdi-chevron-left</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-scroll-x-transition>
                </v-card-text>
            </v-card>
        </v-card-text>
    </v-card>
</template>

<script>
import variables from '@/services/variables_globales';
//import Pagos from '@/services/Pagos';
import Pedidos from '@/services/Pedidos';
import accounting from 'accounting';
import Usuario from '@/services/Usuario';
import {mapState,mapActions} from 'vuex';
import validations from '@/validations/validations';

import vueFilePond from 'vue-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.esm.js';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
const FilePond = vueFilePond(FilePondPluginImagePreview);


    export default {
        components:{
            FilePond
        },
        data() {
            return {
                ...validations,
                ...variables,
                model: null,
                valid:false,
                view:1,
                total:0,
                pedido:{},
                conceptos:[],
                pago:null,
                tiposDePago:[
                    {
                        id:1,
                        nombre:"Banesco Panama"
                    },
                    {
                        id:2,
                        nombre:"Zelle"
                    },
                    {
                        id:3,
                        nombre:"Banco nacional"
                    },
                ],
                data:{
                    emisor:"",
                    receptor:"Jesus Bellorin",
                    adm_pedidos_id:"",
                    adm_tipo_pago_id:"",
                    adm_status_id: "",
                    monto: "",
                    codigo_referencia:"",
                    imagen:"",
                    usuario_id:""
                }
            }
        },
        mounted() {
            this.getPedidos();
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
        watch: {
            view(){
                if(this.view == 2){
                    this.data.emisor = this.user.data.nombre+" "+this.user.data.apellido;
                    this.data.usuario_id = this.user.data.id;
                    this.data.monto = this.total;
                    this.data.adm_tipo_pago_id = this.pago.id;
                    this.dataadm_status_id = 1;
                    this.data.adm_pedidos_id = this.pedido.id;
                }
            }
        },
        computed: {
            ...mapState(['user','pedidos','totalPedidos'])
        },
        methods:{
            ...mapActions(['setPedidos','deletePedidoStore']),

            getPedidos(){
                Usuario().get(`/${this.user.data.id}/pedidos/?rest_estatus_id=1`).then((response) => {
                    if(response.data.data){
                        this.setPedidos(response.data.data);
                        this.pedido = this.pedidos[0];
                        this.total = accounting.formatMoney(+this.totalPedidos[0],{symbol:"Bs ",thousand:'.',decimal:','});
                    }else {
                        this.pedido = this.pedidos[0];
                        this.pedido.detalles.filter(a => a.precio =  accounting.formatMoney(+a.precio,{symbol:"Bs ",thousand:'.',decimal:','}));
                        this.total = accounting.formatMoney(+this.totalPedidos[0],{symbol:"Bs ",thousand:'.',decimal:','});
                    }
                }).cathc(e => { 
                    console.log(e);
                });
            },
            selectPedido(pedido,i){
                this.view = 1;
                this.pedido = pedido;
                this.pedido.detalles.filter(a => a.precio =  accounting.formatMoney(+a.precio,{symbol:"Bs ",thousand:'.',decimal:','}));
                this.total = accounting.formatMoney(+this.totalPedidos[i],{symbol:"Bs ",thousand:'.',decimal:','});
            },
            getConceptos(id){
                Pedidos().get(`/${id}/conceptos`).then((response) => {
                    this.conceptos = response.data.data;
                    console.log(response);
                }).catch(e => {
                    console.log(e);
                });
            },
            postPago(){
                Pagos().post("/",{data:this.data}).then((response) => {
                    this.process();
                }).catch(e => {
                    console.log(e);
                })
            },
            process(fieldName, file, metadata, load, error,abort) {
                let formdata = new FormData();
                formdata.append('image',file);
                abort();
                
                Images().post(`/main/pagos/${this.pedido.id}`,formdata).then((response) => {
                    load("Imagen añadida");
                }).catch(e =>  {
                    console.log(e);
                    error("Erro al subir la imagen");
                }); 
            },
        }
    }

//adm_tipo_pago_id = 1 (Banesco panama)
//adm_tipo_pago_id = 2 (Zelle)
//adm_tipo_pago_id = 3 (Bancos nacionales)
</script>

<style lang="scss" scoped>

</style>
