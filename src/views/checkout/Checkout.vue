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

            <v-btn
                elevation="2"
                color="#fff"
                to="/"
                class="text-capitalize body-2 font-weight-bold black--text"
            >
                Seguir comprando
            </v-btn>
        </v-toolbar>
        <div class="text-center my-5 display-1 font-weight-bold">
            Checkout
        </div>
        <v-scroll-x-transition>
            <v-row justify="center" v-show="view == 1" v-if="loading">
                <v-progress-circular
                    indeterminate
                    size="100"
                    class="margen-movil"
                    color="#0f2441"
                    :width="4"
                >
                </v-progress-circular>
            </v-row>
            <div v-else v-show="view == 1">
                <v-slide-group
                    multiple
                    show-arrows
                    :class="$vuetify.breakpoint.smAndDown ? null : 'mx-10'"
                >
                    <v-slide-item v-for="(pedi, i) in pedidos" :key="i">
                        <v-btn
                            :disabled="pedidoSelect.id == pedi.id"
                            class="mx-2"
                            depressed
                            rounded
                            height="50"
                            @click="seleccionarPedido(pedi, i)"
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
                                md="6"
                                sm="12"
                                class="pa-5 products-list"
                            >
                                <div class="font-weight-bold title">
                                    Tus productos
                                </div>
                                <div class="font-weight-bold subtitle-1">
                                    {{ pedidoSelect.detalles.length + " " }}
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
                                        i) in pedidoSelect.detalles"
                                        :key="i"
                                    >
                                        <v-list-item-title>
                                            <v-list-item-avatar>
                                                <v-img
                                                    :src="
                                                        image + detalle.imagen
                                                    "
                                                ></v-img>
                                            </v-list-item-avatar>
                                        </v-list-item-title>
                                        <v-list-item-title class="product-text">
                                            <p>
                                                {{ detalle.nombre }}
                                            </p>
                                        </v-list-item-title>
                                        <v-list-item-title class="product-text">
                                            {{ detalle.precio }}
                                        </v-list-item-title>
                                        <v-list-item-title class="product-text">
                                            <p style="padding-left:10px">
                                                {{ detalle.cantidad }}
                                            </p>
                                        </v-list-item-title>
                                        <v-list-item-title class="product-text">
                                            <v-chip
                                                v-bind:color="
                                                    detalle.estado == 'ACTIVO'
                                                        ? 'green'
                                                        : 'red'
                                                "
                                                class="ma-2"
                                                text-color="white"
                                            >
                                                <v-avatar small center>
                                                    <v-icon>mdi-check</v-icon>
                                                </v-avatar>
                                            </v-chip>
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
                                            {{
                                                pedidoSelect.empresa
                                                    .nombre_comercial
                                            }}
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
                                    {{ pedidoSelect.cant_personas }}
                                </div>
                                <v-btn
                                    block
                                    color="#0f2441"
                                    class="text-capitalize subtitle-2 my-5 white--text font-weight-bold"
                                    @click="changeView('view',2)"
                                    >Pagar</v-btn
                                >
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </div>
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

                        <v-stepper-step
                            :complete="stepper > 3"
                            step="3"
                            color="#0f2441"
                            >Pagar</v-stepper-step
                        >
                        <v-divider v-show="diferentes"></v-divider>
                        <v-stepper-step
                            v-show="diferentes"
                            step="4"
                            color="#0f2441"
                            >Pagar</v-stepper-step
                        >
                    </v-stepper-header>

                    <v-stepper-items>
                        <v-stepper-content step="1">
                            <v-row justify="center">
                                <v-col
                                    cols="12"
                                    md="6"
                                    sm="12"
                                    class="pa-5 products-list"
                                >
                                    <div class="font-weight-bold title">
                                        Tus productos
                                    </div>
                                    <div class="font-weight-bold subtitle-1">
                                        {{ pedidoSelect.detalles.length + " " }}
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
                                            i) in pedidoSelect.detalles"
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
                                                    small
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
                                <v-col cols="10" md="4" sm="12">
                                    <div class="font-weight-bold title">
                                        Subtotal a pagar
                                    </div>
                                    <div class="font-weight-bold subtitle-1">
                                        {{ total }}
                                    </div>
                                    <v-col
                                        cols="12"
                                        md="8"
                                        sm="12"
                                        class="font-weight-bold subtitle-3"
                                    >
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
                                    </v-col>
                                </v-col>
                            </v-row>

                            <v-btn
                                :disabled="this.bloqueo"
                                color="#0f2441"
                                @click="
                                    changeView('stepper', 2);
                                    bloqueo = true;
                                "
                            >
                                <span style="color:white">Continue</span>
                            </v-btn>

                            <v-btn text @click="changeView('view', 1)"
                                >Cancel</v-btn
                            >
                        </v-stepper-content>

                        <v-stepper-content step="2">
                            <v-row justify="center">
                                <v-col cols="12" md="6" sm="12">
                                    <div class="font-weight-bold title">
                                        Tus productos
                                    </div>
                                    <div class="font-weight-bold subtitle-1">
                                        {{ pedidoSelect.detalles.length + " " }}
                                        item
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
                            <v-btn
                                color="#0f2441"
                                :disabled="this.bloqueo"
                                @click="changeView('stepper', 3)"
                            >
                                <span style="color:white">Continue</span>
                            </v-btn>

                            <v-btn text @click="changeView('stepper', 1)"
                                >Atras</v-btn
                            >
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
                                <v-col
                                    cols="6"
                                    md="3"
                                    sm="12"
                                    class="pa-5"
                                    v-if="diferentes"
                                >
                                    <div class="font-weight-bold title">
                                        Monto restante:
                                    </div>
                                    <div class="font-weight-regular title">
                                        {{ restante }}
                                    </div>
                                    <v-text-field
                                        v-model="montos[0]"
                                        filled
                                        type="number"
                                        dense
                                        color="#0f2441"
                                        hint="Monto del pago"
                                        persistent-hint
                                        rounded
                                        single-line
                                        label="Monto"
                                        :rules="[required('Monto')]"
                                    ></v-text-field>
                                </v-col>
                                <v-dialog
                                    v-model="takeFile"
                                    width="500"
                                    justify="center"
                                >
                                    <v-col class="pa-5">
                                        <v-card justify="center">
                                            <v-card-title>
                                                Ingrese Foto de Su pago
                                            </v-card-title>
                                            <v-card-text>
                                                <FilePond
                                                    class="file"
                                                    ref="pond"
                                                    v-model="file"
                                                    label-idle="Arrastrar Aqui..."
                                                    labelFileAdded="Archivo Añadido"
                                                    :server="{ process }"
                                                    :onaddfilestart="
                                                        initProcess
                                                    "
                                                />
                                            </v-card-text>
                                        </v-card>
                                    </v-col>
                                </v-dialog>
                            </v-row>

                            <v-btn
                                :disabled="data.codigo_referencia === ''"
                                color="#0f2441"
                                @click="checkPago"
                            >
                                <span style="color:white">Enviar</span>
                            </v-btn>

                            <v-btn text @click="changeView('stepper', 2)"
                                >Atras</v-btn
                            >
                        </v-stepper-content>

                        <v-stepper-content step="4" v-if="diferentes">
                            <v-row justify="center">
                                <v-col cols="6" md="6" sm="12" class="pa-5">
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
                                <v-col cols="6" md="6" sm="12" class="pa-5">
                                    <div class="font-weight-bold title">
                                        Monto restante:
                                    </div>
                                    <div class="font-weight-regular title">
                                        {{ restante }}
                                    </div>
                                    <v-text-field
                                        v-model="montos[1]"
                                        filled
                                        type="number"
                                        dense
                                        color="#0f2441"
                                        hint="Monto del pago"
                                        persistent-hint
                                        rounded
                                        single-line
                                        label="Monto"
                                        :rules="[required('Monto')]"
                                    ></v-text-field>
                                </v-col>
                                <v-dialog
                                    v-model="takeFile"
                                    width="500"
                                    justify="center"
                                >
                                    <v-col class="pa-5">
                                        <v-card justify="center">
                                            <v-card-title>
                                                Ingrese Foto de Su pago
                                            </v-card-title>
                                            <v-card-text>
                                                <FilePond
                                                    class="file"
                                                    ref="pond"
                                                    v-model="file2"
                                                    label-idle="Arrastrar Aqui..."
                                                    labelFileAdded="Archivo Añadido"
                                                    :server="{ process }"
                                                    :onaddfilestart="
                                                        initProcess
                                                    "
                                                />
                                            </v-card-text>
                                        </v-card>
                                    </v-col>
                                </v-dialog>
                            </v-row>

                            <v-btn
                                :disabled="data.codigo_referencia === ''"
                                color="#0f2441"
                                @click="checkPago"
                            >
                                <span style="color:white">Enviar</span>
                            </v-btn>

                            <v-btn text @click="resetRestante">Atras</v-btn>
                        </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>
                <v-snackbar class="text--pink" v-model="alert">
                    {{ alert_notifier }}

                    <template v-slot:action="{ attrs }">
                        <v-btn
                            color="pink"
                            text
                            v-bind="attrs"
                            @click="alert = false"
                        >
                            Close
                        </v-btn>
                    </template>
                </v-snackbar>
            </v-card>
        </v-scroll-x-transition>
        <v-scroll-x-transition>
            <v-dialog
                v-if="view == 3"
                v-model="success"
                width="800"
                justify="center"
            >
                <v-col class="pa-5">
                    <v-card justify="center">
                        <v-card-title>
                            Felicidades!
                        </v-card-title>
                        <v-card-text>
                            <v-img
                                contain
                                :width="
                                    $vuetify.breakpoint.smAndDown ? 150 : 200
                                "
                                :height="
                                    $vuetify.breakpoint.smAndDown ? 100 : 150
                                "
                                :src="require('@/assets/4591.jpg')"
                                class="pb-3"
                            />
                        </v-card-text>
                        <v-card-subtitle>
                            Su pago ha sido procesado exitosamente puede
                            dirigirse a su perfil para verificar el estado de su
                            pedido
                        </v-card-subtitle>
                    </v-card>
                </v-col>
            </v-dialog>
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
import Images from "@/services/Images";
import Conceptos from "@/services/Conceptos";
import { mapState, mapActions } from "vuex";
import validations from "@/validations/validations";
import vueFilePond from "vue-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.esm.js";
import router from "@/router";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

const FilePond = vueFilePond(FilePondPluginImagePreview);
//for stock notifier
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

// for alerts snackbar
const maxPago = "Solo puede escojer dos metodos de Pago";
const empiezaPago = "ingrese el pago";
const pagoExedido = "se ha excedido del limite";
const pagoExitoso = "su pago ha sido registtrado exitosamente!";
const pagoInsuficiente = "el monto ingresado es insuficiente";
const pagoFinalizado = "el proceso de pago ha finalizado exitosamente!";
export default {
    components: {
        FilePond,
    },
    data() {
        return {
            ...validations,
            ...variables,
            view: 1,
            takeFile: false,
            disponibilidad: 0,
            bloqueo: true,
            alert: false,
            total: 0,
            stepper: 1,
            state:{stepper:1,total: 0,disponibilidad: 0,view: 1,stock: null, diferentes: false,restante:0,montos:["0", "0"], pago: {},pedidos:[],data:{}},
            loading: true,
            file2: {},
            stock: null,
            stock_notifier: checking,
            alert_notifier: maxPago,
            diferentes: false,
            pedidoSelect: {
                
            },
            success: false,
            restante: 0,
            montos: ["0", "0"],
            pago: {},
            pedidos: [
                {
                    id: 1,
                    usuario_id: 7,
                    rest_mesas_id: 0,
                    rest_estatus_id: 1,
                    estado: "0",
                    cant_personas: 1,
                    empresa: { nombre_comercial: "" },
                    imagen: "default.png",
                    adm_empresa_id: 2,
                    detalles: [
                        {
                            id: 1,
                            rest_pedidos_id: 1,
                            adm_conceptos_id: 2,
                            cantidad: "1",
                            nombre: "0",
                            precio: "0",
                            imagen: "default.png",
                            rest_estatus_id: 1,
                            stock: 3,
                            estado: "0",
                        },
                    ],
                },
            ],
            file: {},
            tiposDePago: [
                {
                    id: 1,
                    nombre: "Banesco Panama",
                    monto: 0,
                },
                {
                    id: 2,
                    nombre: "Zelle",
                    monto: 0,
                },
                {
                    id: 3,
                    nombre: "Banco nacional",
                    monto: 0,
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
        this.setInitView();
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
       /* state(){
            console.log("updated");
            localStorage.setItem('state',this.state);
        },*/
        view() {
            if(this.view==1){}
            if (this.view == 2) {
                this.data.emisor =
                    this.user.data.nombre + " " + this.user.data.apellido;
                this.data.usuario_id = this.user.data.id;
                this.data.monto = this.total;
                this.data.adm_tipo_pago_id = this.pago.id;
                this.data.adm_status_id = 1;
                this.data.adm_pedidos_id = this.pedidoSelect.id;
                this.restante = this.total; /* parseFloat(
                    this.total
                        .split(" ")[1]
                        .split(".")
                        .join("")
                        .replace(",", ".")
                );*/
                const toSave = JSON.stringify(this.pedidoSelect);
                const TotalPedidos = JSON.stringify(this.pedidos);
                this.setLocal("pedidos",TotalPedidos);
                this.setLocal("pedido", toSave);

                this.checkExistence();
            }
        },
        pago(value) {
            if (!value) {
                this.bloqueo = true;
                return;
            }
            if (!this.diferentes && value === []) {
                this.bloqueo = true;
                return;
            }
            if (!this.diferentes) {
                this.bloqueo = false;
                return;
            }
            if (value.length === 0) {
                this.bloqueo = true;
                return;
            }
            if (value.length > 2) {
                this.alert_notifier = maxPago;
                this.alert = true;
            } //cambia este alert por un $toasted de Vue, investigalo
            if (value.length === 2) {
                this.bloqueo = false;
                return;
            }
            if (value.length < 2) {
                this.bloqueo = true;
                return;
            }
            this.pago = this.pago.slice(0, 2);
            this.bloqueo = false;
        },
        file(value) {
            console.log(value);
        },
    },
    computed: {
        ...mapState(["user"]),
    },
    methods: {
        ...mapActions(["setPedidos", "deletePedidoStore"]),
        setInitView() {
            let lastView = localStorage.getItem("view");
            let lastStep = localStorage.getItem("stepper");
            let chosedPedido = localStorage.getItem("pedido");
            this.pedidoSelect = chosedPedido ? JSON.parse(chosedPedido) : this.pedidos[0];
            this.view = lastView ? lastView : 1;
            this.stepper = lastStep ? lastStep : 1;
            if(this.view==1){this.getPedidosUsuario()}
        },
        change(){},
        resetPago(value) {
            this.pago = [];
            this.bloqueo = true;
            this.diferentes = !this.diferentes;
        },
        calcRestante(id) {
            this.restante -= this.montos(id);
        },
        getCheck() {
            return Promise.all(
                //devuelve las promesas que se realizan al solicitar la existencia de cada producto
                this.pedidoSelect.detalles.map(async (product, key) => {
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
                            : Object.assign({}, product, { cantidad: stock });
                        //guarda el valor
                    }
                })
            );
        },
        initProcess() {
            this.loading = true;
        },
        async checkExistence() {
            this.loading = true;
            this.disponibilidad = 0;
            this.stock_notifier = checking;
            let newPriceList = [];
            //empieza a cargar las existencias una vez temina la funcion  se modifica el total si faltan productos a la existencia
            this.getCheck().then((checked) => {
                this.loading = false;
                const toSave = JSON.stringify(this.pedidoSelect);
                this.setLocal("pedido", toSave);

                if (this.disponibilidad === this.pedidoSelect.detalles.length) {
                    this.stock_notifier = avaible;
                    this.bloqueo = false;
                } else if (
                    this.disponibilidad > 0 &&
                    this.disponibilidad < this.pedidoSelect.detalles.length
                ) {
                    //en este caso no todos los productos estan disponibles asi que se procede a modificar el total con los disponibles
                    this.stock_notifier = avaible;
                    this.total = accounting.formatMoney(
                        +(checked.reduce(
                            (acumulator, current) =>
                                acumulator + +current.precio
                        ),
                        { symbol: "Bs ", thousand: ".", decimal: "," })
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
        getPedidosUsuario() {
            this.loading = true;
            Usuario()
                .get(`/${this.user.data.id}/pedidos/?rest_estatus_id=1`)
                .then((response) => {
                    this.pedidos = response.data.data;
                    this.pedidos.filter((a, i) =>
                        this.getEmpresas(a.adm_empresa_id, i)
                    );
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        actualizarEstadoPedido() {
            Pedidos()
                .post(`/${this.data.adm_pedidos_id}`, {
                    data: { rest_estatus_id: 2 },
                })
                .then((response) => {
                    console.log("actuaizado", response);
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        getEmpresas(id, i) {
            Empresa()
                .get(`/${id}/?fields=nombre_comercial,imagen,id`)
                .then((response) => {
                    this.pedidos[i].empresa = response.data.data;
                    if (this.pedidos.length - 1 == i) {
                        this.loading = false;
                        this.pedidoSelect = this.pedidos[0];
                        
                        this.calcularTotal(this.pedidos[0].detalles);
                        this.pedidos.filter((a) =>
                            a.detalles.filter(
                                (b) =>
                                    (b.precio = accounting.formatMoney(
                                        +b.precio,
                                        {
                                            symbol: "Bs ",
                                            thousand: ".",
                                            decimal: ",",
                                        }
                                    ))
                            )
                        );
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        verificarMonto() {
            const aCubrir = parseFloat(
                this.total
                    .split(" ")[1]
                    .split(".")
                    .join("")
                    .replace(",", ".")
            );
            const PagoObjetivo = this.stepper - 3;
            if (+this.montos[0] + +this.montos[1] > aCubrir) {
                this.alert_notifier = pagoExedido;
                this.alert = true;
                return true;
            }
            if (
                this.stepper === 4 &&
                +this.montos[0] + +this.montos[1] < aCubrir
            ) {
                this.alert_notifier = pagoInsuficiente;
                this.alert = true;
                return true;
            }
            return false;
        },
        checkPago() {
            if (this.diferentes) {
                const isNotValidMount = this.verificarMonto();
                if (isNotValidMount) return;
            }
            this.data.adm_status_id = 2;
            this.data.adm_tipo_pago_id = this.pago.id;
            const money = this.diferentes
                ? this.montos[this.stepper - 3]
                : parseFloat(
                      this.data.monto
                          .split(" ")[1]
                          .split(".")
                          .join("")
                          .replace(",", ".")
                  );
            this.postPago(money);
        },
        resetRestante() {
            this.restante = this.total;
            this.stepper = 3;
        },
        postPago(money) {
            Pagos()
                .post("/", { data: { ...this.data, monto: money } })
                .then((response) => {
                    this.alert = true;
                    this.alert_notifier = empiezaPago;
                    this.takeFile = true;
                    console.log("pagos response",response)
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
                .post(`/main/pagos/${this.pedidoSelect.id}`, formdata)
                .then((response) => {
                    load("Imagen añadida");
                    if (this.diferentes) {
                        const PagoObjetivo = this.stepper - 3;
                        const inInt = parseFloat(this.montos[PagoObjetivo]);
                        let parSedRestante = parseFloat(
                            this.restante
                                .split(" ")[1]
                                .split(".")
                                .join("")
                                .replace(",", ".")
                        );
                        this.restante = accounting.formatMoney(
                            parSedRestante - inInt,
                            {
                                symbol: "Bs ",
                                thousand: ".",
                                decimal: ",",
                            }
                        );

                        if (this.stepper === 3) {
                            this.alert = true;
                            this.alert_notifier = pagoExitoso;
                            this.stepper = 4;
                            this.takeFile = false;
                            return;
                        }
                        if (this.stepper === 4) {
                            this.takeFile = false;
                            this.actualizarEstadoPedido();
                            this.deletePedidosStore(this.indexPedido);
                        }
                    } else {
                        this.actualizarEstadoPedido();
                        this.indexPedido = this.pedidos.indexOf(
                            this.pedidoSelect
                        );
                        this.deletePedidosStore(this.indexPedido);
                    }
                    // this.alert = true;
                    // this.alert_notifier = pagoFinalizado;
                    this.view = 3;
                    this.success = true;
                    localStorage.clear();
                    setTimeout(() => {
                        router.push("/");
                    }, [3000]);
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        setLocal(item, value) {
            this.state[item] = value;
            window.localStorage.setItem(`state`, state);
        },
        deleteLocal() {},
        changeView(model, value) {
            console.log("paso adelante", model, value);
            this[model] = value;
            this.setLocal(model, value);
        },
        calcularTotal(detalles) {
            let suma = 0;
            detalles.filter((a) => (suma += +a.precio * a.cantidad));
            this.total = accounting.formatMoney(+suma, {
                symbol: "Bs ",
                thousand: ".",
                decimal: ",",
            });
        },
        seleccionarPedido(evt) {
            this.pedidoSelect = evt;
            this.calcularTotal(evt.detalles);
        },
    },
};
</script>

<style lang="scss" scoped>
.bloked {
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
}
.margen-movil {
    margin-top: 100px;
}
</style>
