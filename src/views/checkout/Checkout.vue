<template>
  <v-card elevation="0" :color="theme.background.light">
    <v-toolbar elevation="2" :color="theme.background.strong">
      <v-toolbar-title class="cursor" @click="push2">
        <v-img v-if="!theme.navBar.navIconDark"
	            alt="Hoyprovoca logo" class="shrink mr-2 cursor" contain
				src='@/assets/logo2.png' transition="scale-transition"
			    width="200" height="100" @click="push2"
			/>
      <v-img v-else
	            alt="Hoyprovoca logo" class="shrink mr-2 cursor" contain
				src='@/assets/logo6.png' transition="scale-transition"
			    width="200" height="100" @click="push2"
			/>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        elevation="2"
        :color="theme.buttons.primary"
        to="/"
        :style="`color:${theme.buttons.font}`"
        class="text-capitalize body-2 font-weight-bold"
      >Seguir comprando</v-btn>
    </v-toolbar>
    <div :style="` color:${theme.background.font}`" class="text-center my-5 display-1 font-weight-bold">Pagar</div>
    <v-scroll-x-transition>
      <Init
      v-if="view==1"
        :view.sync="view"
        @updatedState="updateState"
        @updatedSubState="updateSubState"
        :total.sync="total"
        :totalUSD.sync="totalUSD"
        @updateSubStateArray="updateSubStateArray"
        :pedidoSelect.sync="pedidoSelect"
        @updateDetallePedido="updateDetallePedido"
      />
    </v-scroll-x-transition>

    <v-scroll-x-transition>
      <v-card
        :color="theme.background.light_2"
        :class="$vuetify.breakpoint.smAndDown ? 'my-5 mx-2' : 'mx-10 my-5'"
        class="center"
        :style="`color:${theme.background.font2}!important`"
        v-show="view == 2"
      >
        <v-stepper :style="` background-color:${theme.background.light_2}`" :color="theme.background.light" v-model="stepper">
          <v-stepper-header >
            <v-stepper-step :color="theme.buttons.terceary" :style="`color:${theme.background.font2}!important`"  :complete="stepper > 1" step="1"><span :style="`color:${theme.background.font2}`">tipos de pago</span></v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :color="theme.buttons.terceary" :style="`color:${theme.background.font2}!important`" :complete="stepper > 2" step="2"  ><span :style="`color:${theme.background}`">Pagar</span></v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content  step="1">
              <TipoPago
                v-if="stepper == 1"
                :total="total"
                :pedidoSelect="pedidoSelect"
                :stepper="stepper"
                :pago="pago"
                :totalUSD.sync="totalUSD"
                @updatedState="updateState"
                @setLocal="setLocal"
                @setUserData="setUserData"
              />
            </v-stepper-content>
            <v-stepper-content  step="2">
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
                :totalUSD.sync="totalUSD"
              />
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>

        <v-snackbar class="text--pink" v-model="alert">
          {{ alertNotifier }}
          <template v-slot:action="{ attrs }">
            <v-btn color="pink" text v-bind="attrs" @click="alert = false">Close</v-btn>
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
              Proceso de pago finalizado. 
              <br> <br>  
              Recibirá una notificación por correo cuando su pago sea aprobado.
              <strong>Será redigido en unos segundos...</strong>
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
            <p class="succes-title">Oops!, no has verificado tu correo</p>
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
            <p class="success-description">{{ verifyMessage }}</p>
          </v-card-subtitle>
          <v-card-text justify="center" class="containersub">
            <v-btn :disabled="block" :loading="loading" color="#0f2441" @click="sendEmail">
              <span style="color:white">Verificar</span>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-scroll-x-transition>
  </v-card>
</template>
<script>
import router from "@/router";
import variables from "@/services/variables_globales";
//import Pagos from '@/services/Pagos';
import accounting from "accounting";
//servicios
import { mapState, mapActions } from "vuex";
import Auth from "@/services/Auth";
import defaultVar from "@/store/default"
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
    Existencia: () => import("@/components/checkoutStepps/Existencia"),
    TipoPago: () => import("@/components/checkoutStepps/TipoDePago"),
    Pagar: () => import("@/components/checkoutStepps/Pagar"),
    Init: () => import("@/components/checkoutStepps/Init"),
  },
  data() {
    return {
      ...defaultVar,
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
      stepper: 0,
      totalUSD: 0,
      file2: {},
      diferentes: false,
      success: false,
      bloqueo:true,
      restante: 0,
      pendiente: false,
      montos: ["0", "0"],
      pago: {},
      pagoId: { 0: 0, 1: 0 },
       data: defaultVar.checkdata
    };
  },
  head: {
    title() {
      return {
        inner: "Hoyprovoca",
        separator: "|",
        complement: "Pagar",
      };
    },
  },
  watch: {
    user() {
      if (!this.user.data.verificado) {
        this.view = 3;
        this.NotVerified = true;
        this.verifyMessage = notverified;
        this.loading = false;
      }
    },
    view() {
      if (this.view === 2) {
      }
    },
  },
  computed: {
    ...mapState(["user", "modalPago", "pedidos",'theme']),
  },
  methods: {
    ...mapActions(["setPedidos", "deletePedidoStore", "setModalPago"]),
    push2(){
      router.push("/");
    },
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
        .catch((e) => {
          console.log(e);
          this.email = false;
          this.respuesta2("Error al enviar email", "error");
        });
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
    setUserData() {
      this.data.emisor = this.user.data.nombre + " " + this.user.data.apellido;
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
    updateDetallePedido(value) {
      this.pedidoSelect.detalles[value.x] = value.content;
    },
    formatToNumber(mount) {
      return parseFloat(
        mount.split(" ")[1].split(".").join("").replace(",", ".")
      );
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
.cursor{
  cursor:pointer;
}
</style>