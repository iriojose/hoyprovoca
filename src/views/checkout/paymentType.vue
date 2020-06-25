<template>

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

        total: { type: String },
        tiposDePago: { type: Array },
        pago: { type: Array },
        metodo: { type: Number },
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
            diferentes:[],
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
                console.log("metodo:", this.metodo, "value", newValue);
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
