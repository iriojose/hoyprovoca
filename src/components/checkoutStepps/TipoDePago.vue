<template>
  <div class="container">
    <v-row justify="center" v-if="pedidoSelect">
      <v-col cols="12" md="6" sm="12">
        <div class="font-weight-bold title">Tus productos</div>
        <div v-if="pedidoSelect.detalles" class="font-weight-bold subtitle-1">
          {{ pedidoSelect.detalles.length + " " }}
          item
        </div>
        <div class="font-weight-bold pa-2 title">Subtotal a pagar</div>
        <div class="font-weight-bold px-2 subtitle-1">{{ total }}</div>
        <v-select
          :items="tiposDePago"
          dense
          color="#0f2441"
          filled
          item-value="nombre"
          return-object
          item-text="nombre"
          chips
          persistent-hint
          hint="Metodo De Pago"
          label="Seleccione su metodo de pago"
          single-line
          v-model="select"
          class="my-5"
        ></v-select>
      </v-col>
    </v-row>
    <div class="stepper-buttons">
      <v-btn color="#0f2441" :disabled="bloqueo" @click="changeView('stepper', 2)">
        <span style="color:white">Continuar</span>
      </v-btn>
      <v-btn text @click="changeView('view', 1)">Atras</v-btn>
    </div>
  </div>
</template>
<script>
import variables from "@/services/variables_globales";
// for alerts snackbar
//eslint-disable-next-line
const maxPago = "Solo puede escojer dos metodos de Pago";
//eslint-disable-next-line
const empiezaPago = "ingrese el pago";
//eslint-disable-next-line
const pagoExedido = "se ha excedido del limite";
//eslint-disable-next-line
const pagoExitoso = "su pago ha sido registtrado exitosamente!";
//eslint-disable-next-line
const pagoInsuficiente = "el monto ingresado es insuficiente";
//eslint-disable-next-line
const metodosDePago = [
  {
    id: 0,
    nombre: "Pago Movil : Banesco",
    propietario: "Jesus Bellorin",
    identificacion: "V-17654976",
    cuenta: "movil : 04127955560",
    detalle: "",
    monto: 0
  },
  {
    id: 1,
    nombre: "Transferencia Banco Nacional: Banplus",
    propietario: "Jesus Bellorin",
    identificacion: "V-17654976",
    cuenta: "Corriente : 01740112201124312701",
    detalle:
      "Recuerde!, Transferencias de diferentes bancos tardan al menos 1 dia en ser confirmadas",
    monto: 0
  },
  {
    id: 2,
    nombre: "Transferencia Banco Nacional: Banesco",
    propietario: "Jesus Bellorin",
    identificacion: "V-17654976",
    cuenta: "Ahorro : 01340563895633049696",
    detalle:
      "Recuerde!, Transferencias de diferentes bancos tardan al menos 1 dia en ser confirmadas",
    monto: 0
  },
  {
    id: 3,
    nombre: "Banesco Panama",
    propietario: "Jesus Bellorin",
    identificacion: "V-17654976",
    cuenta: "Cuenta: 201800957218",
    detalle: "",
    monto: 0
  }
];
export default {
  props: {
    pago: {
      default: function() {
        return {};
      },
      type: Object | Array
    },
    pedidoSelect: {
      default: function() {
        return {};
      },
      type: Object
    },
    total: {
      default: 0,
      type: Number | String
    }
  },
  data() {
    return {
      ...variables,
      block: true,
      alertNotifier: maxPago,
      bloqueo: true,
      tiposDePago: metodosDePago,
      select: {}
    };
  },
  mounted() {
    //this.select = this.pago;
  },
  watch: {
    select(value) {
      if (value) {
        this.$emit("updatedState", { content: value, name: "pago" });
        this.bloqueo = false;
        return;
      }
    }
  },
  methods: {
    changeView(model, value) {
      this.$emit("updatedState", { content: this.select, name: "pago" });
      this.$emit("updatedState", { content: value, name: model });
      this.$emit("setLocal", model, value);
      this.$emit("setLocal", "pago", this.select);
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.stepper-buttons {
  align-self: flex-end;
}
</style>