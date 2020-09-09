<template>
  <div class="container">
    <v-row justify="center" v-if="pedidoSelect">
      <v-col cols="12" md="6" sm="12">
        <div class="font-weight-bold pa-2 title">Subtotal a pagar (Bolívares)</div>
        <div class="font-weight-bold px-2 subtitle-1 indigo--text">Bs.{{ total }}</div>
        <div class="font-weight-bold pa-2 title">Subtotal a pagar (Dólares)</div>
        <div class="font-weight-bold px-2 subtitle-1 indigo--text">$.{{ parseFloat(totalUSD).toFixed(2) }}</div>
        <v-select
          :dark="theme.background.dark"
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
        >
         <template slot="item" slot-scope="{ item }">
                    <v-avatar size="20" class="mr-5 mb-1">
                        <v-img :src="item.img"></v-img>
                    </v-avatar>  
                    {{ item.nombre }} 
                </template>
        </v-select>
      </v-col>
    </v-row>
    <div class="stepper-buttons">
      <v-btn :color="theme.buttons.terceary" :style="`color:${theme.buttons.font}`" :disabled="bloqueo" @click="changeView('stepper', 2)">
        <span  >Continuar</span>
      </v-btn>
      <v-btn text @click="changeView('view', 1)">Atras</v-btn>
    </div>
  </div>
</template>
<script>
import variables from "@/services/variables_globales";
import {mapState} from "vuex";
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
    nombre: "Pago Movil Banesco",
    propietario: "Jesus Bellorin",
    identificacion: "17.654.976",
    cuenta: "04127955560 (Móvil)",
    detalle: "",
     to:"https://www.banesco.com/",
    monto: 0,
    img:`@/assets/checkout/banesco.png`,
    acuerdo:false,
  },
  {
    id: 1,
    nombre: "Banplus : Transferencia Banco Nacional",
    propietario: "Jesus Bellorin",
    identificacion: "V-17654976",
     to:"https://www.banplus.com/site/p_contenido.php",
    cuenta: "Corriente : 01740112201124312701",
    detalle:
      "<br>Recuerde!, Transferencias de diferentes bancos tardan al menos 1 dia en ser confirmadas",
    monto: 0,
     img:`@/assets/checkout/banplus.jpg`,
    acuerdo:false,
  },
  {
    id: 2,
    nombre: "Banesco : Transferencia Banco Nacional",
    propietario: "Jesus Bellorin",
    identificacion: "V-17654976",
     to:"https://www.banesco.com/",
      img:`@/assets/checkout/banesco.png`,
    cuenta: "Ahorro : 01340563895633049696",
    detalle:
      "<br>Recuerde!, Transferencias de diferentes bancos tardan al menos 1 dia en ser confirmadas",
    monto: 0,
    acuerdo:false,
  },
  {
    id: 3,
    nombre: "Banesco Panama",
    propietario: "Jesus Bellorin",
    to:"https://www.banesco.com.pa/",
    identificacion: "V-17654976",
    cuenta: "Cuenta: 201800957218",
    detalle: "",
    monto: 0,
     img:`@/assets/checkout/banesco.png`,
     acuerdo:false,
  },
   {
    id: 3,
    nombre: "Acuerdo con El vendedor",
    propietario: "",
    to:"https://www.banesco.com.pa/",
    identificacion: "",
    cuenta: "",
    acuerdo:true,
    detalle: "efectivo en el sitio de entrega y efectivo cuando retiro.",
    monto: 0,
  }
];
export default {
  props: {
    pago: {
      default: function () {
        return {};
      },
      type: Object | Array,
    },
    pedidoSelect: {
      default: function () {
        return {};
      },
      type: Object,
    },
    total: {
      default: 0,
      type: Number | String,
    },
    totalUSD: {
      default: 0,
      type: Number | String,
    },
  },
  data() {
    return {
      ...variables,
      block: true,
      alertNotifier: maxPago,
      bloqueo: true,
      tiposDePago: metodosDePago,
      select: {},
    };
  },
  mounted() {
    if (this.pendiente === true) {
      this.setInitView();
      return;
    } else {
      this.$emit("setUserData");
    }
  },
  computed:{
    ...mapState(['theme'])
  },
  watch: {
    select(value) {
      if (value) {
        this.$emit("updatedState", { content: value, name: "pago" });
        this.bloqueo = false;
        return;
      }
    },
  },
  methods: {
    changeView(model, value) {
      this.$emit("updatedState", { content: this.select, name: "pago" });
      this.$emit("updatedState", { content: value, name: model });
      this.$emit("setLocal", model, value);
      this.$emit("setLocal", "pago", this.select);
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
          "data",
        ].forEach((value) => {
          if (toLoad[value]) {
            this[value] = toLoad[value];
          }
        });
      }
    },
  },
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