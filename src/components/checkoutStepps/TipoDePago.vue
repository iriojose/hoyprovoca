<template>
    <div style="width:100%">
        <v-row justify="center" v-if=" pedidoSelect ">
            <v-col cols="12" md="6" sm="12">
                <div class="font-weight-bold title">
                    Tus productos
                </div>
                <div
                    v-if="pedidoSelect.detalles"
                    class="font-weight-bold subtitle-1"
                >
                    {{ pedidoSelect.detalles.length + " " }}
                    item
                </div>
                <div class="font-weight-bold title">
                    Subtotal a pagar
                </div>
                <div class="font-weight-bold subtitle-1">
                    {{ total }}
                </div>
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
        <v-btn
            color="#0f2441"
            :disabled="this.bloqueo"
            @click="
                changeView('stepper', 3);
            "
        >
            <span style="color:white">Continue</span>
        </v-btn>
        <v-btn text @click="changeView('stepper', 1)">Atras</v-btn>
    </div>
</template>
<script>
import variables from "@/services/variables_globales";
// for alerts snackbar
const maxPago = "Solo puede escojer dos metodos de Pago";
const empiezaPago = "ingrese el pago";
const pagoExedido = "se ha excedido del limite";
const pagoExitoso = "su pago ha sido registtrado exitosamente!";
const pagoInsuficiente = "el monto ingresado es insuficiente";
const metodosDePago = [
    {
        id: 0,
        nombre: "Pago Movil : Banesco",
        propietario: "Jesus Bellorin",
        identificacion: "C.I: 17654976",
        cuenta: "movil : 04127955560",
        detalle: "",
        monto: 0,
    },
    {
        id: 1,
        nombre: "Transferencia Banco Nacional: Banplus",
        propietario: "Jesus Bellorin",
        identificacion: "C.I: 17654976",
        cuenta: "Corriente : 01740112201124312701",
        detalle:
            "Recuerde!, Transferencias de diferentes bancos tardan al menos 1 dia en ser confirmadas",
        monto: 0,
    },
    {
        id: 2,
        nombre: "Transferencia Banco Nacional: Banesco",
        propietario: "Jesus Bellorin",
        identificacion: "C.I: 17654976",
        cuenta: "Ahorro : 01340563895633049696",
        detalle:
            "Recuerde!, Transferencias de diferentes bancos tardan al menos 1 dia en ser confirmadas",
        monto: 0,
    },
    {
        id: 3,
        nombre: "Banesco Panama",
        propietario: "Jesus Bellorin",
        identificacion: "C.I: 17654976",
        cuenta: "Cuenta: 201800957218",
        detalle: "",

        monto: 0,
    },
];
export default {
  props:{
    pago: {
      default:{},
      type:Object | Array
    },
    pedidoSelect:{
      default:{},
      type:Object
    },
    total:{
      default:0,
      type:Number | String
    }
  },
  data(){
    return{
      ...variables,
      block: false,
      alertNotifier: maxPago,
      bloqueo:true,
      tiposDePago: metodosDePago,
      select:{}
    }
  },
  mounted(){
    this.select = this.pago
  },
  watch:{
     select(value) {
        if (!value) {
          this.bloqueo = true;
          return;
        }
        if (!this.diferentes && value === []) {
          this.bloqueo = true;
          return;
        }
        if (!this.diferentes) {
          this.$emit('updatedState',{content:value,name:"pago"})
          this.bloqueo = false;
          return;
        }
        if (value.length === 0) {
          this.bloqueo = true;
          return;
        }
        if (value.length > 2) {
          this.alertNotifier = maxPago;
          this.alert = true;
        } //cambia este alert por un $toasted de Vue, investigalo
        if (value.length === 2) {
          this.$emit('updatedState',{content:value,name:"pago"})
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
  },methods:{
     changeView(model, value) {
        this.$emit('updatedState',{content:this.select,name:"pago"})
        this.$emit('updatedState',{content:value,name:model})
        this.$emit('setLocal', model, value);
        this.$emit('setLocal', "pago", this.select);
     },
  }
};
</script>
<style lang="scss" scoped></style>
