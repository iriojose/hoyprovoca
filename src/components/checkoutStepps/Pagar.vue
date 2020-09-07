<template>
  <div class="list-container" style="width:100%" justify="right">
    <v-row justify="center" v-if="stepper === 2">
      <v-col cols="12" md="6" sm="12" class="pa-5">
        <div class="font-weight-bold title">Subtotal a pagar</div>
        <div v-if="pago.moneda === 'BS'"  class="font-weight-bold subtitle-1">Bs.{{ total }}</div>
        <div v-if="pago.moneda === 'USD'" class="font-weight-bold subtitle-1">USD.{{ parseFloat(totalUSD).toFixed(2) }}</div>
        <div class="text-center font-weight-bold title my-5">Datos de la cuenta</div>
        <div>
          <strong>Nombre :</strong>
          {{ pago.propietario }}
        </div>
        <div>
          <strong>C.I :</strong>
          {{ pago.identificacion }}
        </div>
        <div>
          <strong>Detalles :</strong>
          {{ pago.cuenta }}
        </div>
        <div>
          <strong>Metodo :</strong>
          {{ pago.nombre }}
        </div>
        <div>
          <strong>{{ pago.detalle }}</strong>
        </div>

        <v-form v-if="data" v-model="valid" class="my-5">
          <v-text-field
          :dark="theme.background.dark"
            v-model="data.codigo_referencia"
            filled
            dense
            color="#0f2441"
            hint="Referencia del pago"
            persistent-hint
            rounded
            single-line
            label="Codigo de referencia"
            :rules="[required('Codigo de referencia')]"
          ></v-text-field>
        </v-form>
      </v-col>
      <v-dialog v-model="Imagen" width="500" justify="center" persistent>
        <v-card justify="center">
          <v-card-title>Ingrese Foto de Su pago</v-card-title>
          <v-card-text>
            <FilePond
              class="file"
              ref="pond"
              v-model="file"
              label-idle="Arrastrar Aqui..."
              labelFileAdded="Archivo Añadido"
              :server="{ process }"
              :onaddfilestart="initProcess"
            />
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
    <div class="stepper-buttons">
      <v-btn
        light
        :disabled="data.codigo_referencia === '' && loading"
        :color="theme.buttons.primary"
        class="lod"
        :style="`color:${theme.buttons.font}`"
        :loading="loading"
        @click="checkPago"
      >
        <span >Enviar</span>
      </v-btn>

      <v-btn text @click="changeView('stepper', 1)">Atras</v-btn>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import Pagos from "@/services/Pagos";
import Pedidos from "@/services/Pedidos";
import accounting from "accounting";
import validations from "@/validations/validations";
import router from "@/router";
import Images from "@/services/Images";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import vueFilePond from "vue-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.esm.js";
const FilePond = vueFilePond(FilePondPluginImagePreview);
//
const maxPago = "Solo puede escojer dos metodos de Pago";
const empiezaPago = "ingrese el pago";
const pagoExedido = "se ha excedido del limite";
const pagoExitoso = "su pago ha sido registtrado exitosamente!";
const pagoInsuficiente = "el monto ingresado es insuficiente";
//
const metodosDePago = [
  {
    id: 0,
    nombre: "Pago Movil  Banesco",
    propietario: "Jesus Bellorin",
    identificacion: "17654976",
    cuenta: "movil : 04127955560",
    detalle: "",
    monto: 0,
    moneda: "BS"
  },
  {
    id: 1,
    nombre: "Transferencia Banco Nacional Banplus",
    propietario: "Jesus Bellorin",
    identificacion: " 17654976",
    cuenta: "Corriente 01740112201124312701",
    detalle:
      "<br>Recuerde!, Transferencias de diferentes bancos tardan al menos 1 dia en ser confirmadas",
    monto: 0,
    moneda: "BS"
  },
  {
    id: 2,
    nombre: "Transferencia Banco Nacional Banesco",
    propietario: "Jesus Bellorin",
    identificacion: " 17654976",
    cuenta: "Ahorro 01340563895633049696",
    detalle:
      "<br>Recuerde!, Transferencias de diferentes bancos tardan al menos 1 dia en ser confirmadas",
    monto: 0,
    moneda: "BS"
  },
  {
    id: 3,
    nombre: "Banesco Panama",
    propietario: "Jesus Bellorin",
    identificacion: " 17654976",
    cuenta: "Cuentas 201800957218",
    detalle: "",
    monto: 0,
    moneda: "USD"
  },
];
export default {
  props: {
    data: {
      type: Object,
      default: function () {
        return {};
      },
    },
    totalUSD:{
      type:Number | String,
      default:0
    },
    stepper: { type: Number, default: 0 },
    total: {
      default: 0,
      type: Number | String,
    },
    pagoId: {
      defulta: function () {
        return { 0: 0, 1: 0 };
      },
      type: Object,
    },
    pago: {
      default: function () {
        return metodosDePago[1];
      },
      type: Object,
    },
    pedidoSelect: {
      default: function () {
        return {};
      },
      type: Object,
    },
    pedidos: {
      default: function () {
        return [];
      },
      type: Array,
    },
  },
  components: {
    FilePond,
  },
  data() {
    return {
      ...validations,
      montos: ["0", "0"],
      restante: 0,
      success: false,
      file: {},
      loading: false,
      takeFile: false,
      valid: false,
    };
  },
  watch: {},
  computed: {
    ...mapState(["user", "modalPago",'theme']),
    Imagen: {
      get() {
        return this.modalPago;
      },
      set() {
        this.setModalPago(true);
      },
    },
  },
  methods: {
    ...mapActions(["setPedidos", "deletePedidoStore", "setModalPago"]),
    formatToNumber(mount) {
      return parseFloat(
        mount.split(" ")[1].split(".").join("").replace(",", ".")
      );
    },
    verificarMonto() {
      const aCubrir = parseFloat(
        this.total.split(" ")[1].split(".").join("").replace(",", ".")
      );
      if (+this.montos[0] + +this.montos[1] > aCubrir) {
        this.alertNotifier = pagoExedido;
        this.alert = true;
        return true;
      }
      if (this.stepper === 4 && +this.montos[0] + +this.montos[1] < aCubrir) {
        this.alertNotifier = pagoInsuficiente;
        this.alert = true;
        return true;
      }
      return false;
    },
    checkPago() {
      if (this.data.codigo_referencia === "") return;

      if (this.diferentes) {
        const isNotValidMount = this.verificarMonto();
        if (isNotValidMount) return;
      }
      this.loading = true;
      this.data.adm_status_id = 2;
      this.data.adm_tipo_pago_id = this.pago.id;
      const money = this.diferentes
        ? this.montos[this.stepper - 3]
        : parseFloat(
            this.data.monto.split(".").join("").replace(",", ".")
          );
      this.postPago(money);
    },
    resetRestante() {
      this.restante = this.total;
      this.stepper = 3;
    },
    postPago(money) {
      Pagos()
        .post("/", {
          data: {
            ...this.data,
            adm_clientes_id: this.user.cliente.id,
            monto: money,
          },
        })
        .then((response) => {
          this.alert = true;
          this.alertNotifier = empiezaPago;
          this.$emit("setLocal", "pedidoSelect", this.pedidoSelect);
          this.$emit("setLocal", "pedidos", this.pedidos);
          this.setModalPago(true);
          this.$emit("updateArray", {
            name: "pagoId",
            x: this.stepper - 3,
            content: response.data.data.id,
          });
          this.$emit("setLocal", "pagoId", this.pagoId);
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
        .then(() => {
          this.loading = false;
          this.$emit("updatedState", {
            name: "success",
            content: true,
          });
          this.$emit("updatedState", { name: "view", content: 3 });
          setTimeout(() => {
            router.push("/");
          }, [9000]);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    process(fieldName, file, metadata, load, error, abort) {
      let formdata = new FormData();
      this.loading = true;
      formdata.append("image", file);
      abort();
      Images()
        .post(`/main/pagos/${this.pagoId[this.stepper - 3]}`, formdata)
        .then(() => {
          load("Imagen añadida");
          this.loading = false;
          if (this.diferentes === true) {
            const PagoObjetivo = this.stepper - 3;
            const inInt = parseFloat(this.montos[PagoObjetivo]);
            let parSedRestante = parseFloat(
              this.restante.split(" ")[1].split(".").join("").replace(",", ".")
            );
            this.restante = accounting.formatMoney(parSedRestante - inInt, {
              symbol: "Bs ",
              thousand: ".",
              decimal: ",",
            });
            if (this.stepper === 3) {
              this.setModalPago(false);
              this.setLocal("monto", this.monto);
              this.setLocal("restante", this.restante);
              this.alert = true;
              this.alertNotifier = pagoExitoso;
              this.stepper = 4;
              this.setLocal("stepper", 4);
              return;
            }
            if (this.stepper === 4) {
              const indexPedido = this.pedidos.indexOf(this.pedidoSelect);
              this.setModalPago(false);
              this.actualizarEstadoPedido();
              localStorage.setItem("state", null);
              this.deletePedidosStore(indexPedido);
            }
          } else {
            this.actualizarEstadoPedido();
            this.view = 3;
            localStorage.setItem("state", null);
            this.setModalPago(false);
            console.log(
              this.pedidos,
              this.pedidos.indexOf(this.pedidoSelect),
              "indices"
            );
            const indexPedido = this.pedidos.indexOf(this.pedidoSelect);
            this.deletePedidoStore(indexPedido);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    changeView(model, value) {
      this.$emit("updatedState", { content: value, name: model });
      this.$emit("setLocal", model, value);
    },
    initProcess() {
      this.loading = true;
    },
  },
};
</script>
<style lang="scss">
.list-container {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.stepper-buttons {
  align-self: flex-end;
}
.lod{
  .v-progress-circular {
  color: white !important;
  fill: white;
  svg {
    color: white !important;
    fill: white;
  }
}
}
</style>
