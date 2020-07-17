<template>
  <v-row justify="center" v-if="loading">
    <v-card
      :class="
                $vuetify.breakpoint.smAndDown
                    ? 'my-5 mx-2 center-progress'
                    : 'mx-10 my-5 center-progress'
            "
      justify="center"
    >
      <v-card-text>
        <v-progress-circular indeterminate size="100" class="load" color="#0f2441" :width="4"></v-progress-circular>
      </v-card-text>
    </v-card>
  </v-row>
  <div v-else v-show="view == 1">
    <v-slide-group multiple show-arrows :class="$vuetify.breakpoint.smAndDown ? null : 'mx-10'">
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

    <v-card :class="$vuetify.breakpoint.smAndDown ? 'my-5 mx-2' : 'mx-10 my-5'" v-if="pedidoSelect">
      <v-card-text>
        <v-row class="align" justify="center">
          <v-col cols="12" md="6" sm="12" class="pa-5 products-list">
            <div class="font-weight-bold title">Tus productos</div>
            <div v-if="pedidoSelect.detalles" class="font-weight-bold subtitle-1">
              {{ pedidoSelect.detalles.length + " " }}
              item
            </div>
            <v-list>
              <v-list-item class="products-row">
                <v-list-item-title class="imag">
                  <p>Imagen</p>
                </v-list-item-title>
                <v-list-item-title v-if="!$vuetify.breakpoint.smAndDown">
                  <p>Nombre</p>
                </v-list-item-title>
                <v-list-item-title>
                  <p>Precio</p>
                </v-list-item-title>
                <v-list-item-title>
                  <p>Cantidad</p>
                </v-list-item-title>
                <v-list-item-title>
                  <p style="padding-left:10px">Estado</p>
                </v-list-item-title>
              </v-list-item>
              <v-list-item
                class="products-row"
                v-for="(detalle, i) in pedidoSelect.detalles"
                :key="i"
              >
                <v-list-item-title>
                  <v-list-item-avatar>
                    <v-img :src="image + detalle.imagen"></v-img>
                  </v-list-item-avatar>
                </v-list-item-title>
                <v-list-item-title v-if="!$vuetify.breakpoint.smAndDown" class="product-text">
                  <p>{{ detalle.nombre }}</p>
                </v-list-item-title>
                <v-list-item-title class="product-text">{{ detalle.precio }}</v-list-item-title>
                <v-list-item-title class="product-text">
                  <p style="padding-left:10px">{{ detalle.cantidad }}</p>
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
                <div class="font-weight-bold title">Empresa</div>
                <div
                  v-if="pedidoSelect.empresa"
                  class="font-weight-bold subtitle-1"
                >{{ pedidoSelect.empresa.nombre_comercial }}</div>
              </v-col>
              <v-col cols="12" md="6" sm="12">
                <div class="font-weight-bold title">Subtotal a pagar</div>
                <div class="font-weight-bold subtitle-1">{{ total }}</div>
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
              @click="next"
            >{{ messagePendiente }}</v-btn>
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
import Images from "@/services/Images";
import Conceptos from "@/services/Conceptos";
import { mapState, mapActions } from "vuex";
export default {
  props: {
    view: { type: Number, default: 1 },
    pedidos: {
      type: Array,
      default: function() {
        return [];
      }
    },
    total: { type: Number | String, default: 0 },
    pedidoSelect: {
      type: Object,
      default: function() {
        return {
          id: 1,
          rest_pedidos_id: 1,
          adm_conceptos_id: 2,
          cantidad: "1",
          empresa: { nombre_comercial: "" },
          nombre: "0",
          precio: "0",
          imagen: "default.png",
          rest_estatus_id: 1,
          stock: 3,
          estado: "0"
        };
      }
    }
  },
  data() {
    return {
      ...variables,
      loading: false,
      messagePendiente: "Pagar"
    };
  },
  mounted() {
    this.getPedidosUsuario();
  },
  computed: {
    ...mapState(["user", "modalPago"])
  },
  methods: {
    ...mapActions(["setPedidos", "deletePedidoStore", "setModalPago"]),
    parseExistencia(concepto) {
      return Array.isArray(concepto.existencias)
        ? concepto.existencias.length > 0
          ? concepto.existencias
              .map(a => Math.trunc(+a.existencia))
              .reduce((a, b) => a + b)
          : 0
        : concepto.existencias;
    },
    calcularTotal(detalles) {
      let suma = 0;
      detalles.map(a => (a.cantidad = Math.floor(a.cantidad)));
      detalles.map(a => (suma += this.checkValue(a.precio) * a.cantidad));
      this.$emit("updatedState", {
        content: accounting.formatMoney(+suma, {
          symbol: "Bs ",
          thousand: ".",
          decimal: ","
        }),
        name: "total"
      });
    },
    checkValue(mount) {
      return mount.includes("Bs") ? this.formatToNumber(mount) : +mount;
    },
    getPedidosUsuario() {
      this.loading = true;
      Clientes()
        .get(`/${this.user.cliente.id}/pedidos/?rest_estatus_id=1`)
        .then(response => {
          this.$emit("updatedState", {
            name: "pedidos",
            content: response.data.data
          });
          this.pedidos.filter((a, i) => this.getEmpresas(a.adm_empresa_id, i));
        })
        .catch(e => {
          console.log(e);
        });
    },
    getEmpresas(id, i) {
      Empresa()
        .get(`/${id}/?fields=nombre_comercial,imagen,id`)
        .then(response => {
          this.$emit("updatedSubState", {
            name: "pedidos",
            x: i,
            position: "empresa",
            content: response.data.data
          });
          this.loading = false;
          this.$emit("updatedState", {
            name: "pedidoSelect",
            content: this.pedidos[0]
          });
          this.calcularTotal(this.pedidos[0].detalles);
          this.pedidos.filter(a =>
            a.detalles.filter(
              b =>
                (b.precio = accounting.formatMoney(+b.precio, {
                  symbol: "Bs ",
                  thousand: ".",
                  decimal: ","
                }))
            )
          );
        })
        .catch(e => {
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
    seleccionarPedido(evt) {
      this.$emit("updatedState", { name: "pedidoSelect", content: evt });
      this.messagePendiente = "Pagar";
      this.calcularTotal(evt.detalles);
    },
    next() {
      this.$emit("updatedState", { name: "view", content: 2 });
    }
  },

  solicitarNombres() {
    return Promise.all(done, () => {
      this.pedidoSelect.detalles.map((element, i) => {
          this.reqNombres(element.adm_conceptos_id);
      });
    });
  },
  reqNombres(element) {
    Conceptos().get(`/${element}`, response => {
      console.log(response);
    });
  },
  solicitarNombres() {}
};
</script>
