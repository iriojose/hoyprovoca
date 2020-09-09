<template>
    <v-row justify="center" v-if="loading" >
        <v-card
            :class="
                $vuetify.breakpoint.smAndDown
                    ? 'my-5 mx-2 center-progress'
                    : 'mx-10 my-5 center-progress'
            "
            :color="theme.background.light_2"
            justify="center"
        >
            <v-card-text>
                <v-progress-circular
                    indeterminate
                    size="100"
                    class="load"
                    color="#0f2441"
                    :width="4"
                ></v-progress-circular>
            </v-card-text>
        </v-card>
    </v-row>
    <div v-else v-show="view == 1" >
        <v-slide-group
            v-if="pedidos"
            multiple
            show-arrows
            :class="$vuetify.breakpoint.smAndDown ? null : 'mx-10'"
        >
            <v-slide-item v-for="(pedi, i) in pedidos" :key="i + 'a'">
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
        :color="theme.background.light_2"
            :class="$vuetify.breakpoint.smAndDown ? 'my-5 mx-2' : 'mx-10 my-5'"
            v-if="pedidoSelect"
        >
            <v-card-text>
                <v-row class="align" justify="center">
                    <v-col
                        cols="8"
                        md="7"
                        sm="12"
                        :class="
                            $vuetify.breakpoint.smAndDown
                                ? 'products'
                                : 'pa-5 products'
                        "
                    >
                        <div class="font-weight-bold title titles" :style="` color:${theme.background.font}`">
                            Tus productos
                        </div>
                        <div
                        :style="` color:${theme.background.font}`"
                            v-if="detalles"
                            class="font-weight-bold titles subtitle-1"
                        >
                            {{ detalles.length + " " }}
                            item
                        </div>
                        <v-list :style="`background-color:${theme.background.light_2}; color:${theme.background.font}`">
                            <v-list-item class="products-row products line">
                                <v-list-item-title :style="` color:${theme.background.font}`"  class="imag">
                                    <p class="center-text">Imagen</p>
                                </v-list-item-title>
                                <v-list-item-title :style="` color:${theme.background.font}`"
                                    v-if="!$vuetify.breakpoint.smAndDown"
                                >
                                    <p class="center-text">Nombre</p>
                                </v-list-item-title>
                                <v-list-item-title :style="` color:${theme.background.font}`">
                                    <p class="center-text">Precio</p>
                                </v-list-item-title>
                                <v-list-item-title :style="` color:${theme.background.font}`">
                                    <p class="center-text">Cantidad</p>
                                </v-list-item-title>
                              <!--  <v-list-item-title :style="` color:${theme.background.font}`">
                                    <p class="center-text">En Stock</p>
                                </v-list-item-title>-->
                            </v-list-item>
                            <v-list-item
                                class="products-row products line"
                                v-for="(detalle, i) in detalles"
                                :key="i"
                            >
                                <v-list-item-title :style="` color:${theme.background.font}`" class="center">
                                    <v-list-item-avatar>
                                        <v-img
                                            :src="image + detalle.imagen"
                                        ></v-img>
                                    </v-list-item-avatar>
                                </v-list-item-title>
                                <v-list-item-title :style="` color:${theme.background.font}`"
                                    v-if="!$vuetify.breakpoint.smAndDown"
                                    class="product-text"
                                >
                                    <p
                                        class="caption font-weight-medium center-text"
                                    >
                                        {{
                                            pedidoSelect.conceptos[i]
                                                .descripcion
                                        }}
                                    </p>
                                </v-list-item-title>
                                <v-list-item-title :style="` color:${theme.background.font}`"
                                    class="product-text caption font-weight-medium"
                                >
                                    <span class="price center center-text">
                                        {{
                                           pedidoSelect.conceptos[i]
                                                .descuento ?pedidoSelect.conceptos[i]
                                                .precio_dolar - (pedidoSelect.conceptos[i]
                                                .precio_dolar * pedidoSelect.conceptos[i]
                                                .decuento ) : pedidoSelect.conceptos[i]
                                                .precio_dolar
                                        }}
                                        $
                                    </span>
                                </v-list-item-title>
                                <v-list-item-title :style="` color:${theme.background.font}`" class="product-text center">
                                    <v-btn
                                        class=" onlyShow white--text"
                                        small
                                        v-if="detalle"
                                        :color="'green'"
                                        :style="` color:${theme.background.font}`"
                                        >{{ parseInt(detalle.cantidad) }}</v-btn
                                    >
                                </v-list-item-title>
                              <!--  <v-list-item-title :style="` color:${theme.background.font}`" class="product-text center">
                                    <v-btn
                                        class="onlyShow white--text"
                                        :loading="loadingExistence"
                                        small
                                        v-if="detalle"
                                        :color="
                                            detalle.stock >= detalle.cantidad
                                                ? 'green'
                                                : 'red'
                                        "
                                        >{{ detalle.stock }}</v-btn
                                    >
                                </v-list-item-title>-->
                            </v-list-item>
                        </v-list>
                    </v-col>
                    <v-col cols="6" md="4" sm="12">
                        <v-row sm="12">
                            <v-col cols="12" md="6" sm="12">
                                <div class="font-weight-bold title" :style="` color:${theme.background.font}`">
                                    Subtotal a pagar
                                </div>
                            </v-col>
                            <v-col cols="12" md="6" sm="12">
                                <div class="font-weight-bold title" :style="` color:${theme.background.font}`">
                                    Empresa
                                </div>
                                <div
                                :style="` color:${theme.background.font}`"
                                    v-if="pedidoSelect.empresa"
                                    class="font-weight-bold subtitle-1"
                                >
                                    {{ pedidoSelect.empresa.nombre_comercial }}
                                </div>
                            </v-col>
                        </v-row>
                        <div class="font-weight-bold subtitle-1" :style="` color:${theme.background.font}`">BS:</div>
                        <v-btn
                            :loading="dolar ? false : true"
                            color="secondary"
                            
                            class="font-weight-bold subtitle-1 onlyShow"
                            ><span>{{ total }}</span></v-btn
                        >
                        <div  :style="` color:${theme.background.font}`" class="font-weight-bold subtitle-1">USD :</div>
                        <v-btn
                            :loading="dolar ? false : true"
                            color="secondary"
                            class="my-2 font-weight-bold subtitle-1 onlyShow"
                            ><span>${{ parseFloat(totalUSD).toFixed(2) }}</span></v-btn
                        >
                        <div :style="` color:${theme.background.font}`" class="font-weight-bold subtitle-2">
                            Cantidad de Personas :
                            {{ pedidoSelect.cant_personas }}
                        </div>
                        <v-btn
                            block
                            :color="theme.buttons.terceary"
                            class="text-capitalize subtitle-2 my-5 font-weight-bold"
                            @click="next"
                            :style="` color:${theme.buttons.font}!important`"
                            :disabled="!priced"
                            >{{ messagePendiente }}</v-btn
                        >
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>
<script>
import variables from "@/services/variables_globales";
import Pedidos from "@/services/Pedidos";
import accounting from "accounting";
import Clientes from "@/services/Clientes";
import Empresa from "@/services/Empresa";
import Dolar from "@/services/Dolar";
import Cripto from "@/services/Cripto";
import Images from "@/services/Images";
import Conceptos from "@/services/Conceptos";
import { mapState, mapActions } from "vuex";

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
        pedidosLoads: {
            type: Array,
            default: function() {
                return [];
            },
        },
        view: { type: Number, default: 1 },
        total: { type: Number | String, default: 0 },
        totalUSD: { type: Number | String, default: 0 },
        pedidoSelect: {
            type: Object,
            default: function() {
                return {};
            },
        },
    },
    data() {
        return {
            ...variables,
            loading: false,
            detalles: [],
            arrived: 0,
            dolarAux: 0,
            dolar: 0,
            loadingExistince: false,
            productsAvaible: ["green"],
            disponibilidad: 0,
            stockNotifier: checking,
            stock: null,
            pedido: {},
            priced:false,
            promedio: 0,
            solicitado:false,
            messagePendiente: "Pagar",
        };
    },
    mounted() {
        this.loading = true;
        if(this.pedidos){
          console.log(this.pedidos)
          this.checkStorage();
          this.getPedidosUsuario();
          this.solicitado = true;
        }
    },
    watch: {
        pedidos() {
            if (this.pedidos) {
                this.getPedidosUsuario();
                if (this.view === 1 && !this.solicitado) {
                    this.checkStorage();
                }
            }
        },
        pedidoSelect() {
          
            if (!this.pedidoSelect.detalles[0].stock) {
                this.checkExistence();
            }else{
               
            }
        },
        arrived() {
          console.log(this.arrived);
            if (this.arrived >= 2) {
                let dolar = +this.promedio / +this.cripto.BTC.USD;
                this.dolarAux = dolar;
                this.dolar = dolar;
                this.priced = false;
                this.calcularTotal(
                    this.pedidos[0].conceptos,
                    this.pedidos[0].detalles
                );
                this.priced = true
            }
        },
    },
    computed: {
        ...mapState(["user", "modalPago", "pedidos",'theme']),
    },
    methods: {
        ...mapActions(["setPedidos", "deletePedidoStore", "setModalPago"]),
        parseExistencia(concepto) {
            return Array.isArray(concepto.existencias)
                ? concepto.existencias.length > 0
                    ? concepto.existencias
                          .map((a) => Math.trunc(+a.existencia))
                          .reduce((a, b) => a + b)
                    : 0
                : concepto.existencias;
        },
        checkStorage(){
    /*      const savedData = localStorage.getItem("state");
                    if (savedData) {
                        let toLoad = JSON.parse(savedData);
                        if (toLoad.pedidoSelect == null) return;
                        if (this.pedidoSelect.id === toLoad.pedidoSelect.id) {
                            this.pendiente = true;
                            this.messagePendiente = "Continuar Pago...";
                            return;
                        }
                        this.pendiente = false;
                    } else {
                        return (this.pendiente = false);
                    }*/
        },
        calcularTotal(concepto, detalles) {
            let suma = 0;
            let totalUSD = 0;
            console.log(concepto,"concepto");
            detalles.map((a) => (a.cantidad = Math.floor(a.cantidad)));
            detalles.map((a, i) => {
              let costo = concepto[i].precio_dolar;
              let precio = concepto[i].descuento ? costo - (costo *+concepto[i].descuento)  : costo;
                suma +=
                    this.checkValue(concepto[i].precio_dolar) *
                    a.cantidad *
                    +this.dolar;
                totalUSD += (precio) * a.cantidad;
            });
            this.priced = true;
            this.$emit("updatedState", {
                content: accounting.formatMoney(+suma, {
                    symbol: "",
                    thousand: ".",
                    decimal: ",",
                }),
                name: "total",
            });
            this.$emit("updatedState", {
                content: totalUSD,
                name: "totalUSD",
            });
        },
        checkValue(mount) {
            return mount.includes("Bs") ? this.formatToNumber(mount) : +mount;
        },
        getPedidosUsuario() {
            let pedidos;
            if (!this.pedidos) {
                pedidos = JSON.parse(localStorage.getItem("pedidos"));
                this.setPedidos(pedidos);
            }
            this.getCripto();
            this.getDolar();
           // this.checkExistence();
            this.$emit("updatedState", {
                name: "pedidos",
                content: this.pedidos,
            });
            this.pedidos.filter((a, i) =>
                this.getEmpresas(a.adm_empresa_id, i)
            );
        },
        getEmpresas(id, i) {
            Empresa()
                .get(`/${id}/?fields=nombre_comercial,imagen,id`)
                .then((response) => {
                    this.$emit("updatedSubState", {
                        name: "pedidos",
                        x: i,
                        position: "empresa",
                        content: response.data.data,
                    });
                    this.loading = false;
                    this.$emit("updatedState", {
                        name: "pedidoSelect",
                        content: this.pedidos[0],
                    });
                    this.detalles = this.pedidos[0].detalles;
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        formatToNumber(mount) {
            return parseFloat(
                mount
                    .split(" ")[1]
                    .split(".")
                    .join("")
                    .replace(",", ".")
            );
        },
        seleccionarPedido(evt, i) {
            this.$emit("updatedState", { name: "pedidoSelect", content: evt });
        //    this.checkStock(evt);
            this.messagePendiente = "Pagar";
            this.detalles = evt.detalles;
      //      this.dolar && (this.arrived = (!evt.detalles?.stock) ? 1 : 2);
            this.calcularTotal(this.pedidos[i].conceptos, evt.detalles);
        },

        checkStock(pedido){

          pedido.detalles.map(element =>{
            console.log(element.cantidad > element?.stock,element.cantidad,element.stock,this.priced)
             this.bloqueo = element.cantidad > element?.stock
          })
        },
        next() {
            this.$emit("updatedState", { name: "view", content: 2 });
             this.$emit("updatedState", { name: "stepper", content: 1 });
        },
        async getCripto() {
            return Cripto()
                .get("/pricemulti?fsyms=BTC,ETH&tsyms=USD")
                .then((response) => {
                    this.cripto = response.data;
                    this.arrived = ++this.arrived;
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        async getDolar() {
            let prom = 0;
            return Dolar()
                .get("/ve/venezuela/transfers-with-specific-bank/.json")
                .then((response) => {
                    let devider = 0;
                    for (let i = 0; i < response.data.data.ad_count; i++) {
                        if (
                            response.data.data.ad_list[i].data.currency ===
                            "VES"
                        ) {
                            prom += parseFloat(
                                response.data.data.ad_list[i].data.temp_price
                            );
                            devider++;
                        }
                    }
                    this.promedio = (prom / devider).toFixed(2);
                    this.bolivar = this.promedio;
                    this.arrived = ++this.arrived;
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        getCheck() {
            return Promise.all(
                //devuelve las promesas que se realizan al solicitar la existencia de cada producto
                this.pedidoSelect.detalles.map(async (product, i) => {
                    const stock = await this.getExistencia(
                        product.adm_conceptos_id
                    );
                    product.stock = stock;
                    if (stock > 0) {
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
            this.loadingExistence = true;
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
            this.loadingExistencia = true;
            this.bloqueo = true;
            this.disponibilidad = 0;
            this.stockNotifier = checking;
            //empieza a cargar las existencias una vez temina la funcion  se modifica el total si faltan productos a la existencia
            this.getCheck().then((checked) => {
                this.loadingExistence = false;
                
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
                    console.log("pasa")
                    this.total = 0;
                    this.boqueo = true;
                    this.pedidoSelect.detalles.map((a) => {
                        suma +=
                            a.cantidad < a.stock
                                ? this.checkValue(a.precio) * a.cantidad
                                : this.checkValue(a.precio) * a.stock;
                    });
                    this.$emit("updatedState", {
                        content: accounting.formatMoney(+suma, {
                            symbol: "Bs ",
                            thousand: ".",
                            decimal: ",",
                        }),
                        name: "total",
                    });
                    
                } else {
                  this.bloqueo = true;
                    this.stockNotifier = isOut;
                }
            });
        },
        
    },
};
</script>

<style lang="scss" scoped>
.titles {
    padding-top: 12px;
    padding-left: 12px;
}
.center {
    align-items: center;
    justify-content: center;
    display: flex;
}
.line {
    position: relative;
    display: flex;
}
.onlyShow {
    pointer-events: none !important;
}
.line:before {
    position: absolute;
    content: "";
    height: 1px;
    opacity: 0.6;
    bottom: 0;
    background-color: gray;
    width: 100%;
}
.center-text {
    margin: 0;
    text-align: center;
}
@media only screen and (max-width: 600px) {
    body {
        background-color: lightblue;
    }
    .price {
        position: absolute;
        top: 40%;
    }
    .products {
        padding: 0 !important;
    }
}
</style>
