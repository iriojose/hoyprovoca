<template>
    <div style="width:100%">
        <v-row justify="center" v-if="stepper === 3">
            <v-col cols="12" md="6" sm="12" class="pa-5">
                <div class="font-weight-bold title">
                    Subtotal a pagar
                </div>
                <div class="font-weight-bold subtitle-1">
                    {{ total }}
                </div>

                <div class="text-center font-weight-bold title my-5">
                    Datos de la cuenta
                </div>
                <div>Nombre:{{ pago.propietario }}</div>
                <div>{{ pago.identificacion }}</div>
                <div>{{ pago.cuenta }}</div>
                <div>{{ pago.nombre }}</div>
                <div>
                    <strong>{{ pago.detalle }}</strong>
                </div>

                <v-form v-if="data" v-model="valid" class="my-5">
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
                        :rules="[required('Codigo de referencia')]"
                    ></v-text-field>
                </v-form>
            </v-col>
            <v-dialog v-model="Imagen" width="500" justify="center" persistent>
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
                            :onaddfilestart="initProcess"
                        />
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-row>
        <v-btn
            :disabled="data.codigo_referencia === '' && loading"
            color="#0f2441"
            :loading="loading"
            @click="checkPago"
        >
            <span style="color:white">Enviar</span>
        </v-btn>

        <v-btn text @click="changeView('stepper', 2)">Atras</v-btn>
    </div>
</template>
<script>
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
    props: {},
    data() {
        return {
         montos: ["0", "0"],
          restante: 0,
          success: false,
            file: {},
            loading: true,
        };
    },
    watch: {},
    computed: {
        ...mapState(["user", "modalPago"]),
    Imagen: {
      get() {
        return this.modalPago;
      },
      set(val) {
        this.setModalPago(true);
      },
    },
    },
    methods: {
      ...mapActions(["setPedidos", "deletePedidoStore", "setModalPago"]),
        formatToNumber(mount) {
            return parseFloat(
                mount
                    .split(" ")[1]
                    .split(".")
                    .join("")
                    .replace(",", ".")
            );
        },
        verificarMonto() {
            const aCubrir = parseFloat(
                this.total
                    .split(" ")[1]
                    .split(".")
                    .join("")
                    .replace(",", ".")
            );
            if (+this.montos[0] + +this.montos[1] > aCubrir) {
                this.alertNotifier = pagoExedido;
                this.alert = true;
                return true;
            }
            if (
                this.stepper === 4 &&
                +this.montos[0] + +this.montos[1] < aCubrir
            ) {
                this.alertNotifier = pagoInsuficiente;
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
            this.loading = true;
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
                    this.setLocal("pedidoSelect", this.pedidoSelect);
                    this.setLocal("pedidos", this.pedidos);
                    this.setModalPago(true);
                    this.pagoId[this.stepper - 3] = response.data.data.id;
                    this.setLocal("pagoId", this.pagoId);
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
                    this.loading = false;
                    this.success = true;
                    this.view = 3;
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
                .then((response) => {
                    load("Imagen añadida");
                    this.loading = false;
                    if (this.diferentes === true) {
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
                            const indexPedido = this.pedidos.indexOf(
                                this.pedidoSelect
                            );
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
                        const indexPedido = this.pedidos.indexOf(
                            this.pedidoSelect
                        );
                        this.deletePedidoStore(indexPedido);
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
           changeView(model, value) {
            this.$emit('updatedState',{content:value,name:model})
            this.$emit('setLocal', model, value);
        },
    },
};
</script>
<style lang="sass"></style>
