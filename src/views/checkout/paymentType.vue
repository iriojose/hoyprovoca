<template>
        <v-col cols="12" md="12" sm="12">
            <div class="font-weight-bold title">
                Tus productos
            </div>
            <div class="font-weight-bold subtitle-1">
                {{ pedido.detalles.length + " " }} item
            </div>
            <div class="font-weight-bold title">
                Subtotal a pagar
            </div>
            <div class="font-weight-bold subtitle-1">
                {{ total }}
            </div>
            <v-row>
                <v-col cols="12" md="6" sm="12">
                    <v-select
                        :items="tiposDePago"
                        dense
                        color="#0f2441"
                        filled
                        rounded
                        item-value="nombre"
                        return-object
                        item-text="nombre"
                        persistent-hint
                        hint="Metodo De Pago"
                        label="Seleccione su metodo de pago"
                        single-line
                        v-model="opciones"
                        class="my-5"
                    ></v-select>
                    <v-select
                        :items="numeroDePagos"
                        dense
                        color="#0f2441"
                        filled
                        rounded
                        item-value="value"
                        return-object
                        item-text="value"
                        persistent-hint
                        hint="Diferentes metodos de pago"
                        label="tipos de pago diferentes?"
                        single-line
                        v-model="diferentesPagos"
                        class="my-5"
                    ></v-select>
                </v-col>
                <v-col v-show="(metodo != 1) && (view == 3)" cols="12" md="6" sm="12">
                    <v-select
                        :items="tiposDePago"
                        dense
                        color="#0f2441"
                        filled
                        rounded
                        item-value="nombre"
                        return-object
                        item-text="nombre"
                        persistent-hint
                        hint="Metodo De Pago"
                        label="Seleccione su metodo de pago"
                        single-line
                        v-model="opciones"
                        class="my-5"
                    ></v-select>
                    <v-select
                        :items="numeroDePagos"
                        dense
                        color="#0f2441"
                        filled
                        rounded
                        item-value="value"
                        return-object
                        item-text="value"
                        persistent-hint
                        hint="Diferentes metodos de pago"
                        label="tipos de pago diferentes?"
                        single-line
                        v-model="diferentesPagos"
                        class="my-5"
                    ></v-select>
                </v-col>
            </v-row>
        </v-col>
 
</template>

<script>
import variables from "@/services/variables_globales";
export default {
    props: {
        view: {
            default: 1,
            type: Number,
        },
        setView: {
            type: Function,
        },
        total:{type:String},
        tiposDePago: { type: Array },
        pago: { type: Object },
        metodo:{type:Number},
        numeroDePagos: { type: Array },
        setTipoPago: { type: Function },
        setNumeroPago: { type: Function },
        pedido: {
            default: function() {
                return {};
            },
            type: Object,
        },
    },
    data() {
        return {
            ...variables,
            numeroP,
        };
    },
    head: {},
    watch: {},
    computed: {
        opciones: {
            get: function() {
                return this.pago;
            },
            set: function(newValue) {
                this.setTipoPago(newValue);
            },
        },
        diferentesPagos: {
            get: function() {
                return this.numeroDePagos;
            },
            set: function(newValue) {
                console.log("metodo:",this.metodo, "value",newValue)
                this.setNumeroPago(newValue.value);
            },
        },
    },
    methods: {
        onView(step) {
            this.setView(step);
        },
    },
};
</script>
