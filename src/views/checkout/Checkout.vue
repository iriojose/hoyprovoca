<template>
  <v-card elevation="0" color="#f7f7f7">
     <v-toolbar elevation="2" color="#0f2441">
      <v-toolbar-title>
        <v-img contain height="100" width="150" src="@/assets/logo 6.png"/>
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
      <Init
        :view.sync="view"
        @updatedState="updateState"
        @updatedSubState="updateSubState"
        :total.sync="total"
        :pedidos.sync="pedidos"
        @updateSubStateArray="updateSubStateArray"
        :pedidoSelect.sync="pedidoSelect"
        @updateDetallePedido="updateDetallePedido"
        v-show="view == 1"
      />
    </v-scroll-x-transition>
    <v-scroll-x-transition>
      <v-card
        :class="$vuetify.breakpoint.smAndDown ? 'my-5 mx-2' : 'mx-10 my-5'"
        class="center"
        v-show="view == 2"
      >
        <v-stepper v-model="stepper">
          <v-stepper-header>
            <v-stepper-step color="#0f2441" :complete="stepper > 1" step="1">
              Existencia
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step color="#0f2441" :complete="stepper > 2" step="2">
              tipos de pago
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="stepper > 3" step="3" color="#0f2441">
              Pagar
            </v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1">
              <Existencia
                :total="total"
                :pedidoSelect.sync="pedidoSelect"
                @updatedState="updateState"
                :view.sync="view"
                @setLocal="setLocal"
              />
            </v-stepper-content>
            <v-stepper-content step="2">
              <TipoPago
                :total="total"
                :pedidoSelect="pedidoSelect"
                :stepper="stepper"
                :pago="pago"
                @updatedState="updateState"
                @setLocal="setLocal"
              />
            </v-stepper-content>
            <v-stepper-content step="3">
              <Pagar
                :pedidos.sync="pedidos"
                :pedidoSelect.sync="pedidoSelect"
                @updateArray="updateSubStateArray"
                :stepper="stepper"
                @updatedState="updateState"
                @setLocal="setLocal"
                :pagoId.sync="pagoId"
                :pago.sync="pago"
                :total.sync="total"
                :data="data"
              />
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
        <v-snackbar class="text--pink" v-model="alert">
          {{ alertNotifier }}
          <template v-slot:action="{ attrs }">
            <v-btn color="pink" text v-bind="attrs" @click="alert = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </v-card>
    </v-scroll-x-transition>
    <v-scroll-x-transition>
      <v-dialog v-model="success" width="400" justify="center" class="succes">
        <v-card justify="center">
          <v-card-title>
            <p class="succes-title">Felicidades!</p>
          </v-card-title>
          <v-card-text class="success-img">
            <v-img
              contain
              :height="$vuetify.breakpoint.smAndDown ? 100 : 150"
              :src="require('@/assets/pago terminado.svg')"
              class="pb-3"
            />
          </v-card-text>
          <v-card-subtitle class="containersub">
            <p class="success-description">
              proceso de pago terminado se le notificara por correo electronico
              si su pago fue verificado y como sera el proceso de entrega;
              <strong>
                sera redigido en unos segundos
              </strong>
            </p>
          </v-card-subtitle>
        </v-card>
      </v-dialog>
    </v-scroll-x-transition>
    <v-scroll-x-transition>
      <v-dialog
        v-model="NotVerified"
        width="400"
        justify="center"
        class="succes"
        v-show="view == 3"
      >
        <v-card justify="center">
          <v-card-title>
            <p class="succes-title">
              Oops!, no has verificado tu correo
            </p>
          </v-card-title>
          <v-card-text class="success-img">
            <v-img
              contain
              :height="$vuetify.breakpoint.smAndDown ? 100 : 150"
              :src="require('@/assets/technical-support.svg')"
              class="pb-3"
            />
          </v-card-text>
          <v-card-subtitle class="containersub">
            <p class="success-description">
              {{ verifyMessage }}
            </p>
          </v-card-subtitle>
          <v-card-text justify="center" class="containersub">
            <v-btn
              :disabled="block"
              :loading="loading"
              color="#0f2441"
              @click="sendEmail"
            >
              <span style="color:white">Verificar</span>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-scroll-x-transition>
  </v-card>
</template>
<script>
import variables from "@/services/variables_globales";
//import Pagos from '@/services/Pagos';
import accounting from "accounting";
//servicios
import { mapState, mapActions } from "vuex";
import Auth from "@/services/Auth";

// for alerts snackbar
//const pagoFinalizado = "el proceso de pago ha finalizado exitosamente!";
const maxPago = "Solo puede escojer dos metodos de Pago";
//const empiezaPago = "ingrese el pago";
//const pagoExedido = "se ha excedido del limite";
//const pagoExitoso = "su pago ha sido registtrado exitosamente!";
//const pagoInsuficiente = "el monto ingresado es insuficiente";
// verify email
const notverified =
  "Necesita verificar su correo para poder procesar un pedido";
const verifying = "verificando";
const messageSend =
  "correo enviado, verifique su email para mas instrucciones en cuanto a la verificacion";
// aqui vienen descripciones de tipos de pago

export default {
  components: {
    Existencia:() => import("@/components/checkoutStepps/Existencia"),
    TipoPago:() => import("@/components/checkoutStepps/TipoDePago"),
    Pagar:() => import("@/components/checkoutStepps/Pagar"),
    Init:() => import("@/components/checkoutStepps/Init")
  },
  data() {
    return {
      ...variables,
      view: 1,
      verifyMessage: "",
      bloqueo: true,
      alertNotifier: maxPago,
      alert: false,
      block: true,
      NotVerified: false,
      loading: true,
      total: "0",
      stepper: 1,
      state: {
        stepper: 1,
        total: 0,
        view: 1,
        stock: null,
        diferentes: null,
        restante: null,
        pedidoSelect: null,
        montos: ["0", "0"],
        pago: {},
        pedidos: null,
        data: null,
        pagoId: {}
      },
      file2: {},
      diferentes: false,
      pedidoSelect: {
        id: 1,
        rest_pedidos_id: 1,
        adm_conceptos_id: 2,
        cantidad: "1",
        empresa: { nombre_comercial: "" },
        nombre: "0",
        detalles:[],
        precio: "0",
        imagen: "default.png",
        rest_estatus_id: 1,
        stock: 3,
        estado: "0"
      },
      success: false,
      restante: 0,
      pendiente: false,
      montos: ["0", "0"],
      pago: {},
      pagoId: { 0: 0, 1: 0 },
      pedidos: [
        {
          id: 1,
          adm_clientes_id: 7,
          rest_mesas_id: 0,
          rest_estatus_id: 1,
          estado: "0",
          cant_personas: 1,
          empresa: {
            nombre_comercial: ""
          },
          imagen: "default.png",
          adm_empresa_id: 2,
          detalles: [
            {
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
            }
          ]
        }
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
        adm_clientes_id: ""
      }
    };
  },
  mounted() {
    if (!this.user.data.verificado) {
      this.view = 3;
      this.NotVerified = true;
      this.verifyMessage = notverified;
      this.loading = false;
    }
    //  this.getPedidosUsuario();
    console.log(this.user);
    console.log(this)
  },
  head: {
    title() {
      return {
        inner: "Checkout",
        separator: " ",
        complement: " "
      };
    }
  },
  watch: {
    pedidoSelect() {
      if (this.view === 1) {
        const savedData = localStorage.getItem("state");
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
        }
      }
    },
    view() {
      if (this.view === 2) {
        if (this.pendiente === true) {
          this.setInitView();
          return;
        } else {
          this.data.emisor =
            this.user.data.nombre + " " + this.user.data.apellido;
          this.data.adm_clientes_id = this.user.cliente.id;
          this.data.monto = this.total;
          this.data.adm_clientes_id = this.user.cliente.id;
          this.data.adm_tipo_pago_id = this.pago.id;
          this.data.adm_status_id = 1;
          this.data.adm_pedidos_id = this.pedidoSelect.id;
          this.restante = this.total;
          this.pendiente = true;
          this.setLocal("total", this.total);
          this.setLocal("data", this.data);
        }
      } else if (this.view == 1) {
        this.calcularTotal(this.pedidoSelect.detalles);
      }
    }
  },
  computed: {
    ...mapState(["user", "modalPago"])
  },
  methods: {
    ...mapActions(["setPedidos", "deletePedidoStore", "setModalPago"]),
    sendEmail() {
      this.loading = true;
      this.block = true;
      this.verifyMessage = verifying;
      Auth()
        .post("/verify", { data: { user: this.user.data.email } })
        .then(() => {
          this.verifyMessage = messageSend;
          this.loading = false;
        })
        .catch(e => {
          console.log(e);
          this.email = false;
          this.respuesta2("Error al enviar email", "error");
        });
    },
    setInitView() {
      const savedData = localStorage.getItem("state");
      if (savedData) {
        let toLoad = JSON.parse(savedData);
        this.state = toLoad;
        [
          "total",
          "stepper",
          "monto",
          "restante",
          "pago",
          "pedidos",
          "pedidoSelect",
          "pagoId",
          "data"
        ].forEach(value => {
          if (toLoad[value]) {
            this[value] = toLoad[value];
          }
        });
      }
    },
    calcularTotal(detalles) {
      let suma = 0;
      detalles.map(a => (a.cantidad = Math.floor(a.cantidad)));
      detalles.map(a => (suma += this.checkValue(a.precio) * a.cantidad));
      this.total = accounting.formatMoney(+suma, {
        symbol: "Bs",
        thousand: ".",
        decimal: ","
      });
    },
    seleccionarPedido(evt) {
      this.pedidoSelect = evt;
      console.log(evt);
      this.messagePendiente = "Pagar";
      this.calcularTotal(evt.detalles);
    },
    setLocal(item, value) {
      this.state[item] = value;
      const savedState = JSON.stringify(this.state);
      window.localStorage.setItem(`state`, savedState);
    },
    changeView(model, value) {
      this[model] = value;
      this.setLocal(model, value);
    },
    checkValue(mount) {
      return mount.includes("Bs") ? this.formatToNumber(mount) : +mount;
    },
    //funcion que se utiliza para actualizar el estado desde los componentes hijos
    //gracias a estlo no se violan las normas de vue ya que el estado lo actualiza el mismo padre
    updateState(value) {
      this[value.name] = value.content;
    },
    updateSubState(value) {
      this[value.name][value.x][value.position] = value.content;
    },
    updateSubStateArray(value) {
      this[value.name][value.x] = value.content;
    },
    updateDetallePedido(value){
      this.pedidoSelect.detalles[value.x] = value.content
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
  }
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
  &-progress {
    width: 400px !important;
    height: 50vh;
    .v-card__text {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      margin: 0;
    }
  }
}
.load {
  margin: 0;
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

.succes {
  &-title {
    text-align: center;
    width: 100%;
  }
  &-description {
    width: 50%;
  }
}
.v-dialog {
  width: 50%;
}
</style>
