<template>
    <div style="width:100%">
        <v-row justify="center">
            <v-col
                cols="12"
                md="6"
                sm="12"
                class="pa-5 products-list"
                v-if="pedido"
            >
                <div class="font-weight-bold title">
                    Tus productos
                </div>
                <div v-if="pedido.detalles" class="font-weight-bold subtitle-1">
                    {{ pedido.detalles.length + " " }} item
                </div>

                <v-list>
                    <v-list-item class="products-row">
                        <v-list-item-title class="imag">
                            <p>Imagen</p>
                        </v-list-item-title>
                        <v-list-item-title
                            v-if="!$vuetify.breakpoint.smAndDown"
                        >
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
                        v-for="(detalle, i) in pedido.detalles"
                        :key="i"
                    >
                        <v-list-item-title>
                            <v-list-item-avatar>
                                <v-img :src="image + detalle.imagen"></v-img>
                            </v-list-item-avatar>
                        </v-list-item-title>
                        <v-list-item-title
                            class="product-text"
                            v-if="!$vuetify.breakpoint.smAndDown"
                        >
                            <p>{{ detalle.nombre }}</p>
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
                            <v-btn
                                class="ma-2 bloked white--text"
                                :loading="loading"
                                :disabled="loading"
                                small
                                v-if="detalle"
                                :color="productsAvaible[i]"
                                @click="loader = 'loading'"
                            >
                                {{ detalle.stock }}
                            </v-btn>
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-col>
            <v-col cols="10" md="4" sm="12">
                <v-card class="no-shadow">
                    <v-card-title class="font-weight-bold title">
                        Subtotal a pagar
                    </v-card-title>
                    <v-card-title class="font-weight-bold subtitle-1">
                        {{ total }}
                    </v-card-title>
                    <v-card-text
                        cols="12"
                        md="8"
                        sm="12"
                        class="font-weight-bold subtitle-3"
                    >
                        <v-subheader v-if="stock == null"
                            ><span :style="'color:' + stockNotifier.color">{{
                                stockNotifier.message
                            }}</span></v-subheader
                        >
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <v-btn
            :disabled="this.loading"
            color="#0f2441"
            @click="
                changeView('stepper', 2);
                bloqueo = true;
            "
        >
            <span style="color:white">Continuar</span>
        </v-btn>
        <v-btn text @click="changeView('view', 1)">Cancelar</v-btn>
    </div>
</template>
<script>
import accounting from "accounting";
import Images from "@/services/Images";
import Conceptos from "@/services/Conceptos";
import variables from "@/services/variables_globales";
//mensajes para el notificador del estado del stock
const avaible = {
    message: "Verificacion Exitosa, los productos se encuentran disponibles",
    color: "green",
};
const isOut = {
    message:
        "Lo sentimos, se acabo la existencia de susproductos se ha agotado",
    color: "red",
};
const notComplete = {
    message:
        "Lo sentimos, se acabo la existencia de algunos de sus Productos, Desea continuar con los disponibles?",
    color: "red",
};
const checking = { message: "Checkeando existencias...", color: "gray" };
export default {
    props: {
        view: { type: Number, default: 1 },
        total: { type: Number | String, default: 0 },
        pedidoSelect: {
            type: Object,
             default:function(){return{}},
        },
    },
    data() {
        return {
            ...variables,

            productsAvaible: ["green"],
            block: false,
            loading: true,
            disponibilidad: 0,
            stockNotifier: checking,
            stock: null,
            pedido: {},
        };
    },
    mounted() {},
    watch: {
        view() {
            if (this.view == 2) {
                this.pedido = this.pedidoSelect;
                this.checkExistence();
            }
        },
    },
    methods: {
        parseExistencia(concepto) {
            return Array.isArray(concepto.existencias)
                ? concepto.existencias.length > 0
                    ? concepto.existencias
                          .map((a) => Math.trunc(+a.existencia))
                          .reduce((a, b) => a + b)
                    : 0
                : concepto.existencias;
        },
        getCheck() {
            return Promise.all(
                //devuelve las promesas que se realizan al solicitar la existencia de cada producto
                this.pedido.detalles.map(async (product, i) => {
                    const stock = await this.getExistencia(
                        product.adm_conceptos_id
                    );
                    product.stock = stock;
                    if (stock > 0) {
                        console.log(this.disponibilidad);
                        this.disponibilidad += product.cantidad < stock ? 1 : 0;
                        this.productsAvaible[i] =
                            product.cantidad < stock ? "green" : "red";
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
        async checkExistence() {
            this.loading = true;
            this.producsAvaible = new Array(this.pedidoSelect);
            this.productsAvaible.fill("green");
            this.disponibilidad = 0;
            this.stockNotifier = checking;
            //empieza a cargar las existencias una vez temina la funcion  se modifica el total si faltan productos a la existencia
            this.getCheck().then((checked) => {
                this.loading = false;
                if (this.disponibilidad === this.pedidoSelect.detalles.length) {
                    this.stockNotifier = avaible;
                    this.bloqueo = false;
                } else if (
                    this.disponibilidad > 0 &&
                    this.disponibilidad < this.pedidoSelect.detalles.length
                ) {
                    //en este caso no todos los productos estan disponibles asi que se procede a modificar el total con los disponibles
                    this.stockNotifier = notComplete;
                    let suma = 0;
                    this.total = 0;
                    this.pedidoSelect.detalles.map((a) => {
                        suma +=
                            a.cantidad < a.stock
                                ? this.checkValue(a.precio) * a.cantidad
                                : this.checkValue(a.precio) * a.stock;
                    });
                    this.total = accounting.formatMoney(suma, {
                        symbol: "Bs ",
                        thousand: ".",
                        decimal: ",",
                    });
                    this.bloqueo = false;
                } else {
                    this.stockNotifier = isOut;
                }
            });
        },
        changeView(model, value) {
            this.$emit("updatedState", { content: value, name: model });
            this.$emit("setLocal", model, value);
        },
    },
};
</script>
<style lang="scss" scoped>
.containersub {
    display: flex;
    justify-content: center;
    align-items: center;
    p {
        width: 50%;
        text-align: center;
    }
}
.no-shadow {
    box-shadow: none !important;
}
</style>
