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
                            <v-row class="align" justify="center">
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
                                                {{ pedido.nombre_comercial }}
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
                                        @click="startStepper()"
                                        >Pagar</v-btn
                                    >
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-card-text>
            </v-card>
        </v-scroll-x-transition>
        <v-scroll-x-transition>
            <v-card
                :class="
                    $vuetify.breakpoint.smAndDown ? 'my-5 mx-2' : 'mx-10 my-5'
                "
                class="center"
                v-show="view == 2"
            >
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
                            <v-row class="align" justify="center">
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
                                        {{ pedido.detalles.length + " " }}
                                        item
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
                                                <v-btn
                                                    class="ma-2 bloked white--text"
                                                    :loading="loading"
                                                    :disabled="loading"
                                                    
                                                    :color="
                                                        stock_notifier.color
                                                    "
                                                    @click="loader = 'loading'"
                                                >
                                                    {{ detalle.stock }}
                                                </v-btn>
                                            </v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-col>
                                <v-col cols="6" md="4" sm="12">
                                    <div class="font-weight-bold title">
                                        Subtotal a pagar
                                    </div>
                                    <div class="font-weight-bold subtitle-1">
                                        {{ total }}
                                    </div>
                                    <div class="font-weight-bold subtitle-3">
                                        <v-subheader v-if="stock == null"
                                            ><span
                                                :style="
                                                    'color:' +
                                                        stock_notifier.color
                                                "
                                                >{{
                                                    stock_notifier.message
                                                }}</span
                                            ></v-subheader
                                        >
                                    </div>
                                </v-col>
                            </v-row>

                            <v-btn
                                :disabled="this.bloqueo"
                                color="#0f2441"
                                @click="stepper = 2 ; bloqueo=true"
                            >
                                <span style="color:white">Continue</span>
                            </v-btn>

                            <v-btn text @click="view = 1">Cancel</v-btn>
                        </v-stepper-content>

                        <v-stepper-content step="2">
                            <v-row  justify="center">
                            <v-col cols="12" md="6" sm="12">
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
                                        <v-checkbox
                                            @click="resetPago($event)"
                                            label="diferentes tipos de pago?"
                                            color="#0f2441"
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
                                            v-if="diferentes"
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
                                :disabled="this.bloqueo"
                                @click="stepper = 3"
                            >
                                <span style="color:white">Continue</span>
                            </v-btn>

                            <v-btn text @click="stepper = 1">Atras</v-btn>
                        </v-stepper-content>

                        <v-stepper-content step="3">
                            <v-row justify="center">
                                <v-col cols="12" md="6" sm="12" class="pa-5">
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
                                        v-model="file"
                                        label-idle="Drop image here..."
                                        labelFileAdded="Archivo Añadido"
                                    />
                                </v-col>
                            </v-row>

                            <v-btn :disabled="data.codigo_referencia===''" color="#0f2441" @click="checkPago">
                                <span  style="color:white">Enviar</span>
                            </v-btn>

                            <v-btn text   @click="stepper = 2">Atras</v-btn>
                        </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>
            </v-card>
        </v-scroll-x-transition>
    </v-card>
</template>

<script>
import variables from "@/services/variables_globales";
//import Pagos from '@/services/Pagos';
import Pedidos from "@/services/Pedidos";
import accounting from "accounting";
import Usuario from "@/services/Usuario";
import Empresa from "@/services/Empresa";
import Pagos from "@/services/Pagos";
import Conceptos from "@/services/Conceptos";
import { mapState, mapActions } from "vuex";
import validations from "@/validations/validations";
import vueFilePond from "vue-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.esm.js";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
const FilePond = vueFilePond(FilePondPluginImagePreview);

const avaible = {
    message: "Verificacion Exitosa, los productos se encuentran disponibles",
    color: "green",
};
const isOut = {
    message:
        "Lo sentimos, se acabo la existencia de algunos de sus Productos, Desea continuar con los disponibles?",
    color: "red",
};
const checking = { message: "Checkeando existencias...", color: "gray" };
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
            disponibilidad: 0,
            bloqueo: true,
            total: 0,
            metodo: 1,
            stepper: 1,
            loading: false,
            stock: null,
            stock_notifier: checking,
            diferentes: false,
            pedido: {},
            conceptos: [],
            pago: [],
            file:{},
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
        pago(value) {
            if(!value) {this.bloqueo = true; return;}
            if (!this.diferentes) {this.bloqueo = false; return;}
            if(value.length === 0){this.bloqueo = true;return} 
            if (value.length > 2) alert("sólo se permiten 2 tipos de pago"); //cambia este alert por un $toasted de Vue, investigalo
            if (value.length <= 2){this.bloqueo = false; return;} 
            this.pago = this.pago.slice(0, 2);
            this.bloqueo = false
        },
        file(value){
            console.log(value)
        }
    },
    computed: {
        ...mapState(["user", "pedidos", "totalPedidos"]),
    },
    methods: {
        ...mapActions(["setPedidos", "deletePedidoStore"]),
        resetPago(value) {
            this.pago = [];
            this.bloqueo = true;
            this.diferentes = !this.diferentes;
        },
        addTipo(value) {
            if (this.pago.length > 2) {
            }
        },
        getCheck() {
            return Promise.all(
                //devuelve las promesas que se realizan al solicitar la existencia de cada producto
                this.pedido.detalles.map(async (product, key) => {
                    const stock = await this.getExistencia(
                        product.adm_conceptos_id
                    );
                    product.stock = stock;
                    if (stock > 0) {
                        this.disponibilidad += 1;
                        //checkea si la cantidad solicitada esta disponible en su totalidad
                        //si lo esta mantiene la cantidad solicitada
                        //si no modifica la cantidad solicitada con la disponible en stock
                        return product.cantidad > stock
                            ? product
                            : Object.assign({}, product, {
                                  cantidad: stock,
                              });
                        //guarda el valor
                    }
                })
            );
        },
        async checkExistence() {
            this.loading = true;
            this.disponibilidad = 0;
            this.stock_notifier = checking;
            let newPriceList = [];
            //empieza a cargar las existencias una vez temina la funcion  se modifica el total si faltan productos a la existencia
            this.getCheck().then((checked) => {
                this.loading = false;
                if (this.disponibilidad === this.pedido.detalles.length) {
                    this.stock_notifier = avaible;
                    this.bloqueo = false;
                } else if (
                    this.disponibilidad > 0 &&
                    this.disponibilidad < this.pedido.detalles.length
                ) {
                    //en este caso no todos los productos estan disponibles asi que se procede a modificar el total con los disponibles
                    this.stock_notifier = avaible;
                    this.total = accounting.formatMoney(
                        +checked.reduce(
                            (acumulator, current) =>
                                acumulator + +current.precio
                        ),
                        {
                            symbol: "Bs ",
                            thousand: ".",
                            decimal: ",",
                        }
                    );
                    this.bloqueo = false;
                } else {
                    this.stock_notifier = isOut;
                }
            });
        },
        async getExistencia(item) {
            this.loading = true;
            return await Conceptos()
                .get(`/${item}/depositos`)
                .then((response) => {
                    const toParse = Object.assign({
                        existencias: response.data.data,
                    });
                    const existence = this.parseExistencia(toParse);
                    return existence;
                })
                .catch((e) => {
                    console.log(e);
                    this.error("Error al procesar existencia.");
                });
        },
        parseExistencia(concepto) {
            return Array.isArray(concepto.existencias)
                ? concepto.existencias.length > 0
                    ? concepto.existencias
                          .map((a) => Math.trunc(+a.existencia))
                          .reduce((a, b) => a + b)
                    : 0
                : concepto.existencias;
        },
        startStepper() {
            this.view = 2;
            this.checkExistence();
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
                })
                .catch((e) => {
                    console.log(e);
                });
        },

        checkPago(){
           this.data.adm_status_id = 2;
           this.data.adm_tipo_pago_id = this.pago.id;
           const money = parseFloat(this.data.monto.split(" ")[1].split('.').join('').replace(',','.'));
           console.log(money);
           this.postPago(money)
        },
        postPago(money) {
            Pagos()
                .post("/", { data:{...this.data , monto:money}  })
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
.bloked{
    pointer-events: none;
}
.align {
    align-items: baseline;
}
.notifier {
    font: bold;
    opacity: 0.7;
}
.center {
    margin-top: 10vh;
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
