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

            <v-hover v-slot:default="{ hover }">
                <v-btn
                    :elevation="hover ? 2 : 0"
                    color="#fff"
                    class="text-capitalize body-2 font-weight-bold black--text"
                    to="/"
                    >Seguir comprando</v-btn
                >
            </v-hover>
        </v-toolbar>
        <v-scroll-x-transition>
            <v-card elevation="0" color="#f7f7f7" v-show="view == 1">
                <v-card-text>
                    <div class="text-center my-5 display-1 font-weight-bold">
                        Checkout
                    </div>

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
                            <Details
                                :setView="setView"
                                :total="total"
                                :view="view"
                                :pedido="pedido"
                            ></Details>
                        </v-card-text>
                    </v-card>
                </v-card-text>
            </v-card>
        </v-scroll-x-transition>
        <v-scroll-x-transition>
            <div class="center" v-show="view == 2">
            <v-stepper v-model="stepper" >
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
                            <Stock
                                :setView="setView"
                                :stock="stock"
                                :stock_message="stock_message"
                                :total="total"
                                :view="view"
                                :pedido="pedido"
                            />
                        </v-card>

                        <v-btn color="#0f2441" @click="stepper = 2">
                            <span style="color:white">Continue</span>
                        </v-btn>

                        <v-btn text @click="view = 1">Cancel</v-btn>
                    </v-stepper-content>

                    <v-stepper-content step="2">
                        
                            <PaymentType
                                :metodo="metodo"
                                :setNumeroPago="setNumeroPago"
                                :setTipoPago="setTipoPago"
                                :pago="pago"
                                :numeroDePagos="numeroDePagos"
                                :tiposDePago="tiposDePago"
                                :setView="setView"
                                :total="total"
                                :view="view"
                                :pedido="pedido"
                            />
                       

                        <v-btn color="#0f2441"  :disabled="pago ? false : true"  @click="stepper = 3">
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
import Details from "./details";
import Stock from "./stock";
import PaymentType from "./paymentType";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
const FilePond = vueFilePond(FilePondPluginImagePreview);

const avaible = "En Hora Buena! la cantidad solicitada se encuentra disponible";
const isOut = "Lo sentimos, se acabo la existencia de algunos de sus Productos";
const checking = "Checkeando existencias...";

export default {
    components: {
        FilePond,
        Details,
        Stock,
        PaymentType,
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
            pedido: {},
            conceptos: [],
            pago: null,
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
                inner: "Checkout",
                separator: " ",
                complement: " ",
            };
        },
    },
    watch: {
        view() {
            if (this.view == 2) {
                this.data.emisor =
                    this.user.data.nombre + " " + this.user.data.apellido;
                this.data.usuario_id = this.user.data.id;
                this.data.monto = this.total;
                this.data.adm_tipo_pago_id = this.pago.id;
                this.dataadm_status_id = 1;
                this.data.adm_pedidos_id = this.pedido.id;
            }
        },
    },
    computed: {
        ...mapState(["user", "pedidos", "totalPedidos"]),
    },
    methods: {
        ...mapActions(["setPedidos", "deletePedidoStore"]),
        setTipoPago(value) {
            this.pago = value;
        },
        setNumeroPago(value) {
            this.metodo = value;
        },
        setView(step) {
            this.view = step;
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
                .cathc((e) => {
                    console.log(e);
                });
        },
        selectPedido(pedido, i) {
            this.view = 1;
            this.pedido = pedido;
            this.pedido.detalles.filter(
                (a) =>
                    (a.precio = accounting.formatMoney(+a.precio, {
                        symbol: "Bs ",
                        thousand: ".",
                        decimal: ",",
                    }))
            );
            this.total = accounting.formatMoney(+this.totalPedidos[i], {
                symbol: "Bs ",
                thousand: ".",
                decimal: ",",
            });
        },
        getConceptos(id) {
            Pedidos()
                .get(`/${id}/conceptos`)
                .then((response) => {
                    this.conceptos = response.data.data;
                    console.log(response);
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        postPago() {
            Pagos()
                .post("/", { data: this.data })
                .then((response) => {
                    this.process();
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        process(fieldName, file, metadata, load, error, abort) {
            let formdata = new FormData();
            formdata.append("image", file);
            abort();

            Images()
                .post(`/main/pagos/${this.pedido.id}`, formdata)
                .then((response) => {
                    load("Imagen añadida");
                })
                .catch((e) => {
                    console.log(e);
                    error("Erro al subir la imagen");
                });
        },
    },
};

//adm_tipo_pago_id = 1 (Banesco panama)
//adm_tipo_pago_id = 2 (Zelle)
//adm_tipo_pago_id = 3 (Bancos nacionales)
</script>

<style lang="scss" scoped>
.align {
    align-items: baseline;
}
.center{
    display: flex;
    justify-content: center;
    align-items: center;
}
.file{
    &:hover{
        opacity:0.8,
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
    &-list {
        position: relative;
        &:after {
            content: "";
            position: absolute;
            right: 0;
            top: 30%;
            width: 1px;
            height: 40%;
            background-color: rgba(0, 0, 0, 0.123);
        }
    }
}
</style>
