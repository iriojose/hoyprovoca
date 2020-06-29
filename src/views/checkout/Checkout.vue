<template>
    <v-card elevation="0" color="#f7f7f7">
        <v-toolbar elevation="2" color="#0f2441">
            <v-toolbar-title>
                <v-img contain height="100" width="150" src="@/assets/logo 6.png" />
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn
                elevation="2" color="#fff" to="/"
                class="text-capitalize body-2 font-weight-bold black--text"
            >
                Seguir comprando
            </v-btn>
        </v-toolbar>
            <v-scroll-x-transition>
                <v-card v-show="view ==1" elevation="0" color="#f7f7f7">
                    <v-slide-group
                        multiple
                        show-arrows
                        :class="$vuetify.breakpoint.smAndDown ? null : 'mx-10'"
                    >
                        <v-slide-item v-for="(pedi, i) in pedidos" :key="i">
                            <v-btn
                                :disabled="pedido.id == pedi.id"
                                class="mx-2"
                                depressed
                                rounded
                                height="50"
                                @click="selectPedido(pedi, i)"
                            >
                                <v-avatar size="40">
                                    <v-img :src="image + pedi.imagen"></v-img>
                                </v-avatar>
                            </v-btn>
                        </v-slide-item>
                    </v-slide-group>

                    <v-card
                        :class="
                            $vuetify.breakpoint.smAndDown
                                ? 'my-5 mx-2'
                                : 'mx-10 my-5'
                        "
                    >
                        <v-card-text>
                            <v-row
                                class="align"
                                justify="center"
                                v-show="view == 1"
                            >
                                <v-col
                                    cols="12"
                                    md="8"
                                    sm="12"
                                    class="pa-5 products-list"
                                >
                                    <div class="font-weight-bold title">
                                        Tus productos
                                    </div>
                                    <div class="font-weight-bold subtitle-1">
                                        {{ pedido.detalles.length + " " }} item
                                    </div>
                                    <v-list>
                                        <v-list-item class="products-row">
                                            <v-list-item-title class="imag">
                                                <p>Imagen</p>
                                            </v-list-item-title>
                                            <v-list-item-title>
                                                <p>Nombre</p>
                                            </v-list-item-title>
                                            <v-list-item-title>
                                                <p>Precio</p>
                                            </v-list-item-title>
                                            <v-list-item-title>
                                                <p>Cantidad</p>
                                            </v-list-item-title>
                                            <v-list-item-title>
                                                <p style="padding-left:10px">
                                                    Estado
                                                </p>
                                            </v-list-item-title>
                                        </v-list-item>
                                        <v-list-item
                                            class="products-row"
                                            v-for="(detalle,
                                            i) in pedido.detalles"
                                            :key="i"
                                        >
                                            <v-list-item-title>
                                                <v-list-item-avatar>
                                                    <v-img
                                                        :src="
                                                            image +
                                                                detalle.imagen
                                                        "
                                                    ></v-img>
                                                </v-list-item-avatar>
                                            </v-list-item-title>
                                            <v-list-item-title
                                                class="product-text"
                                            >
                                                <p>
                                                    {{ detalle.nombre }}
                                                </p>
                                            </v-list-item-title>
                                            <v-list-item-title
                                                class="product-text"
                                            >
                                                {{ detalle.precio }}
                                            </v-list-item-title>
                                            <v-list-item-title
                                                class="product-text"
                                            >
                                                <p style="padding-left:10px">
                                                    {{ detalle.cantidad }}
                                                </p>
                                            </v-list-item-title>
                                            <v-list-item-title
                                                class="product-text"
                                            >
                                                <v-chip
                                                    class="ma-2"
                                                    v-bind:color="
                                                        detalle.estado ==
                                                        'ACTIVO'
                                                            ? 'green'
                                                            : 'red'
                                                    "
                                                    text-color="white"
                                                    >{{
                                                        detalle.estado
                                                    }}</v-chip
                                                >
                                            </v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-col>
                                <v-col cols="6" md="4" sm="12">
                                    <v-row>
                                        <v-col cols="12" md="6" sm="12">
                                            <div class="font-weight-bold title">
                                                Empresa
                                            </div>
                                            <div
                                                class="font-weight-bold subtitle-1"
                                            >
                                                {{ pedido.nom_empresa }}
                                            </div>
                                        </v-col>
                                        <v-col cols="12" md="6" sm="12">
                                            <div class="font-weight-bold title">
                                                Subtotal a pagar
                                            </div>
                                            <div
                                                class="font-weight-bold subtitle-1"
                                            >
                                                {{ total }}
                                            </div>
                                        </v-col>
                                    </v-row>

                                    <div class="font-weight-bold subtitle-2">
                                        Cantidad de Personas :
                                        {{ pedido.cant_personas }}
                                    </div>
                                    <v-btn
                                        block
                                        color="#0f2441"
                                        class="text-capitalize subtitle-2 my-5 white--text font-weight-bold"
                                        @click="view = 2"
                                        >Pagar</v-btn
                                    >
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
            </v-card>
        </v-scroll-x-transition>
        <v-scroll-x-transition>
            <div class="center" v-show="view == 2">
                <v-stepper v-model="stepper">
                    <v-stepper-header>
                        <v-stepper-step
                            color="#0f2441"
                            :complete="stepper > 1"
                            step="1"
                            >Check Stock</v-stepper-step
                        >

                        <v-divider></v-divider>

                        <v-stepper-step
                            color="#0f2441"
                            :complete="stepper > 2"
                            step="2"
                            >tipos de pago</v-stepper-step
                        >

                        <v-divider></v-divider>

                        <v-stepper-step step="3" color="#0f2441"
                            >Pagar</v-stepper-step
                        >
                    </v-stepper-header>

                    <v-stepper-items>
                        <v-stepper-content step="1">
                            <v-card
                                :class="
                                    $vuetify.breakpoint.smAndDown
                                        ? 'my-5 mx-2'
                                        : 'mx-10 my-5'
                                "
                            >
                                <v-row class="align" justify="center">
                                    <v-col
                                        cols="12"
                                        md="6"
                                        sm="12"
                                        class="pa-5 products-list"
                                    >
                                        <div class="font-weight-bold title">
                                            Tus productos
                                        </div>
                                        <div
                                            class="font-weight-bold subtitle-1"
                                        >
                                            {{ pedido.detalles.length + " " }}
                                            item
                                        </div>

                                        <v-list>
                                            <v-list-item class="products-row">
                                                <v-list-item-title class="imag">
                                                    <p>Imagen</p>
                                                </v-list-item-title>
                                                <v-list-item-title>
                                                    <p>Precio</p>
                                                </v-list-item-title>
                                                <v-list-item-title>
                                                    <p>solicitada</p>
                                                </v-list-item-title>
                                                <v-list-item-title>
                                                    <p>en Stock</p>
                                                </v-list-item-title>
                                            </v-list-item>
                                            <v-list-item
                                                class="products-row"
                                                v-for="(detalle,
                                                i) in pedido.detalles"
                                                :key="i"
                                            >
                                                <v-list-item-title>
                                                    <v-list-item-avatar>
                                                        <v-img
                                                            :src="
                                                                image +
                                                                    detalle.imagen
                                                            "
                                                        ></v-img>
                                                    </v-list-item-avatar>
                                                </v-list-item-title>
                                                <v-list-item-title
                                                    class="product-text"
                                                >
                                                    {{ detalle.precio }}
                                                </v-list-item-title>
                                                <v-list-item-title
                                                    class="product-text"
                                                >
                                                    <p
                                                        style="padding-left:10px"
                                                    >
                                                        {{ detalle.cantidad }}
                                                    </p>
                                                </v-list-item-title>
                                                <v-list-item-title
                                                    class="product-text"
                                                >
                                                    {{ detalle.stock }}
                                                </v-list-item-title>
                                            </v-list-item>
                                        </v-list>
                                    </v-col>
                                    <v-col cols="6" md="4" sm="12">
                                        <div class="font-weight-bold title">
                                            Subtotal a pagar
                                        </div>
                                        <div
                                            class="font-weight-bold subtitle-1"
                                        >
                                            {{ total }}
                                        </div>
                                        <div
                                            class="font-weight-bold subtitle-3"
                                        >
                                            <span
                                                v-if="stock == null"
                                                style="color:green"
                                                >{{ stock_message }}</span
                                            >
                                            <span v-else style="color:red">{{
                                                stock_message
                                            }}</span>
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-card>

                            <v-btn color="#0f2441" @click="stepper = 2">
                                <span style="color:white">Continue</span>
                            </v-btn>

                            <v-btn text @click="view = 1">Cancel</v-btn>
                        </v-stepper-content>

                        <v-stepper-content step="2">
                            <v-col cols="12" md="12" sm="12">
                                <div class="font-weight-bold title">
                                    Tus productos
                                </div>
                                <div class="font-weight-bold subtitle-1">
                                    {{ pedido.detalles.length + " " }} item
                                </div>
                                <div class="font-weight-bold title">
                                    Subtotal a pagar
                                </div>
                                <div class="font-weight-bold subtitle-1">
                                    {{ total }}
                                </div>
                                <v-row>
                                    <v-col cols="12" md="12" sm="12">
                                        <v-checkbox
                                            @click="resetPago($event)"
                                            v-model="diferentes"
                                            label="diferentes tipos de pago?"
                                            color="#0f2441"
                                            value="multiple"
                                            hide-details
                                        ></v-checkbox>
                                        <v-select 
                                            :items="tiposDePago"
                                            dense
                                            color="#0f2441"
                                            filled
                                            item-value="nombre"
                                            return-object
                                            item-text="nombre"
                                            v-if=" diferentes.length > 0"
                                            multiple
                                            chips
                                            persistent-hint
                                            hint="Metodo De Pago"
                                            label="Seleccione su metodo de pago"
                                            single-line
                                             v-model="pago"
                                            @input="addTipo($event)"
                                            class="my-5"
                                        ></v-select>
                                        <v-select 
                                            :items="tiposDePago"
                                            dense
                                            color="#0f2441"
                                            filled
                                            item-value="nombre"
                                            return-object
                                            item-text="nombre"
                                            v-else
                                            chips
                                            persistent-hint
                                            hint="Metodo De Pago"
                                            label="Seleccione su metodo de pago"
                                            single-line
                                           v-model="pago"
                                            class="my-5"
                                        ></v-select>
                                    </v-col>
                                </v-row>
                            </v-col>

                            <v-btn
                                color="#0f2441"
                                :disabled="pago ? false : true"
                                @click="stepper = 3"
                            >
                                <span style="color:white">Continue</span>
                            </v-btn>

                            <v-btn text @click="stepper = 1">Atras</v-btn>
                        </v-stepper-content>

                        <v-stepper-content step="3">
                            <v-row justify="center">
                                <v-col cols="12" md="12" sm="12" class="pa-5">
                                    <div class="font-weight-bold title">
                                        Subtotal a pagar
                                    </div>
                                    <div class="font-weight-bold subtitle-1">
                                        {{ total }}
                                    </div>

                                    <div
                                        class="text-center font-weight-bold title my-5"
                                    >
                                        Datos de la cuenta
                                    </div>
                                    <div>Nombre:Jesus Bellorin</div>
                                    <div>cedula:212121212</div>
                                    <div>cuenta:212121212121212</div>
                                    <div>banco:zelle</div>

                                    <v-form v-model="valid" class="my-5">
                                        <v-text-field
                                            v-model="data.codigo_referencia"
                                            filled
                                            dense
                                            color="#0f2441"
                                            hint="Referencia del pago"
                                            persistent-hint
                                            rounded
                                            single-line
                                            label="Codigo de referencia"
                                            :rules="[
                                                required(
                                                    'Codigo de referencia'
                                                ),
                                            ]"
                                        ></v-text-field>
                                    </v-form>
                                </v-col>
                                <v-col cols="12" md="4" sm="12" class="pa-5">
                                    <FilePond
                                        class="file"
                                        ref="pond"
                                        label-idle="Drop image here..."
                                        labelFileAdded="Archivo Añadido"
                                    />
                                </v-col>
                            </v-row>

                            <v-btn color="#0f2441" @click="stepper = 1">
                                <span style="color:white">Enviar</span>
                            </v-btn>

                            <v-btn text @click="stepper = 2">Atras</v-btn>
                        </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>
            </div>
               </v-scroll-x-transition>
    </v-card>
</template>

<script>
import variables from "@/services/variables_globales";
//import Pagos from '@/services/Pagos';
import Pedidos from "@/services/Pedidos";
import accounting from "accounting";
import Usuario from "@/services/Usuario";
import { mapState, mapActions } from "vuex";
import validations from "@/validations/validations";

import vueFilePond from "vue-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.esm.js";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
const FilePond = vueFilePond(FilePondPluginImagePreview);

const avaible = "Verificacion Exitosa, los productos se encuentran disponibles";
const isOut =
    "Lo sentimos, se acabo la existencia de algunos de sus Productos, Desea continuar con los disponibles?";
const checking = "Checkeando existencias...";

export default {
    components: {
        FilePond,
    },
    data() {
        return {
            ...validations,
            ...variables,
            model: null,
            valid: false,
            view: 1,
            total: 0,
            metodo: 1,
            stepper: 1,
            stock: null,
            stock_message: avaible,
            diferentes: [],
            pedido: {},
            conceptos: [],
            pago: [],
            numeroDePagos: [
                { id: 1, value: 1 },
                { id: 2, value: 2 },
            ],
            tiposDePago: [
                {
                    id: 1,
                    nombre: "Banesco Panama",
                },
                {
                    id: 2,
                    nombre: "Zelle",
                },
                {
                    id: 3,
                    nombre: "Banco nacional",
                },
            ],
            data: {
                emisor: "",
                receptor: "Jesus Bellorin",
                adm_pedidos_id: "",
                adm_tipo_pago_id: "",
                adm_status_id: "",
                monto: "",
                codigo_referencia: "",
                imagen: "",
                usuario_id: "",
            },
        };
    },
    mounted() {
        this.getPedidos();
    },
    head: {
        title() {
            return {
                ...variables,
                loading:false,
                pedidos:[],
                pedidoSelect:{},
                total:0,
            }
        },
    },
    computed: {
        ...mapState(["user", "pedidos", "totalPedidos"]),
    },
    methods: {
        ...mapActions(["setPedidos", "deletePedidoStore"]),
        resetPago(value){
            this.pago = []
        },
       addTipo(value){
           
            if(this.pago.length > 2){
           }
       },
        getPedidos() {
            Usuario()
                .get(`/${this.user.data.id}/pedidos/?rest_estatus_id=1`)
                .then((response) => {
                    if (response.data.data) {
                        this.setPedidos(response.data.data);
                        this.pedido = this.pedidos[0];
                        this.total = accounting.formatMoney(
                            +this.totalPedidos[0],
                            {
                                symbol: "Bs ",
                                thousand: ".",
                                decimal: ",",
                            }
                        );
                    } else {
                        this.pedido = this.pedidos[0];
                        this.pedido.detalles.filter(
                            (a) =>
                                (a.precio = accounting.formatMoney(+a.precio, {
                                    symbol: "Bs ",
                                    thousand: ".",
                                    decimal: ",",
                                }))
                        );
                        this.total = accounting.formatMoney(
                            +this.totalPedidos[0],
                            {
                                symbol: "Bs ",
                                thousand: ".",
                                decimal: ",",
                            }
                        );
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        head: {
            title() {
                return {
                    inner: "Checkout",
                    separator: " ",
                    complement: " ",
                };
            },
        },
        mounted() {
            this.getPedidosUsuario();
        },
        methods: {
            getPedidosUsuario(){
                this.loading = true;
                Usuario().get(`/${this.user.data.id}/pedidos/?rest_estatus_id=1`).then((response) => {
                    this.pedidos = response.data.data;
                    this.pedidos.filter((a,i) => this.getEmpresas(a.adm_empresa_id,i)); 
                }).catch(e => {
                    console.log(e);
                });
            },
            getEmpresas(id,i){
                Empresa().get(`/${id}/?fields=nombre_comercial,imagen,id`).then((response) => {
                    this.pedidos[i].empresa = response.data.data;
                    if(this.pedidos.length -1 == i){
                        this.loading = false;
                        this.pedidoSelect = this.pedidos[0];
                        this.pedidos.filter(a => a.detalles.filter(b => b.precio = accounting.formatMoney(+b.precio,{symbol:"Bs ",thousand:'.',decimal:','})));
                        this.calcularTotal(this.pedidos[0].detalles);
                    }
                }).catch(e => {
                    console.log(e);
                });
            },
            calcularTotal(detalles){
                let suma = 0;
                detalles.filter(a => suma+= +a.precio * a.cantidad);
                this.total = accounting.formatMoney(+suma,{symbol:"Bs ",thousand:'.',decimal:','});
            },
            seleccionarPedido(evt){
                this.pedidoSelect = evt;
                this.calcularTotal(evt.detalles);
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.align {
    align-items: baseline;
}
.center {
    margin-top: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.file {
    &:hover {
        opacity: 0.8;
    }
}
.products {
    &-row {
        p {
            margin: 0;
            //     text-align: center;
        }
        border-bottom: 1px solid rgba(0, 0, 0, 0.116);
    }
    &-text {
        text-align: center;
    }
    .margen-movil{
        margin-top:100px;
    }
    }
</style>