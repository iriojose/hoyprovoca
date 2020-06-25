<template>
    <v-row class="align" justify="center" v-show="view == 1">
        <v-col cols="12" md="8" sm="12" class="pa-5 products-list">
            <div class="font-weight-bold title">
                Tus productos
            </div>
            <div class="font-weight-bold subtitle-1">
                {{ pedido.detalles.length + " " }} item
            </div>
            <v-list>
                <v-list-item class="products-row">
                    <v-list-item-title class="imag">
                        <p>Imagen</p>
                    </v-list-item-title>
                       <v-list-item-title>
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
                    v-for="(detalle, i) in pedido.detalles"
                    :key="i"
                >
                    <v-list-item-title>
                        <v-list-item-avatar>
                            <v-img :src="image + detalle.imagen"></v-img>
                        </v-list-item-avatar>
                    </v-list-item-title>
                     <v-list-item-title class="product-text">
                        <p>
                            {{ detalle.nombre }}
                        </p>
                    </v-list-item-title>
                    <v-list-item-title class="product-text">
                        {{ detalle.precio }}
                    </v-list-item-title>
                    <v-list-item-title class="product-text">
                        <p style="padding-left:10px">
                            {{ detalle.cantidad }}
                        </p>
                    </v-list-item-title>
                    <v-list-item-title class="product-text">
                        <v-chip
                            class="ma-2"
                            v-bind:color="
                                detalle.estado == 'ACTIVO' ? 'green' : 'red'
                            "
                            text-color="white"
                            >{{ detalle.estado }}</v-chip
                        >
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-col>
        <v-col cols="6" md="4" sm="12">
            <v-row>
                <v-col cols="12" md="6" sm="12">
                    <div class="font-weight-bold title">
                        Empresa
                    </div>
                    <div class="font-weight-bold subtitle-1">
                        {{ pedido.nom_empresa }}
                    </div>
                </v-col>
                <v-col cols="12" md="6" sm="12">
                    <div class="font-weight-bold title">
                        Subtotal a pagar
                    </div>
                    <div class="font-weight-bold subtitle-1">
                        {{ total }}
                    </div>
                </v-col>
            </v-row>

            <div class="font-weight-bold subtitle-2">
                Cantidad de Personas :
                {{ pedido.cant_personas }}
            </div>
            <v-btn
                block
                color="#0f2441"
                class="text-capitalize subtitle-2 my-5 white--text font-weight-bold"
                @click="onView(2)"
                >Pagar</v-btn
            >
        </v-col>
    </v-row>
</template>
<script>
import variables from "@/services/variables_globales";

export default {
    props: {
        view: {
            default: 1,
            type: Number,
        },
        setView:{
            type:Function
        },
        total:{type:String},
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
        };
    },
    head: {},
    watch: {},
    computed: {
       
    },
    methods: {
        onView(step){
            this.setView(step)
        }
    },
};
</script>

<style lang="scss" scoped>
.align {
    align-items: baseline;
}
.products {
    &-row {
        p {
            margin: 0;
            //     text-align: center;
        }
        border-bottom: 1px solid rgba(0, 0, 0, 0.116);
    }
    &-text {
        text-align: center;
    }
    &-list {
        position: relative;
        &:after {
            content: "";
            position: absolute;
            right: 0;
            top: 30%;
            width: 1px;
            height: 40%;
            background-color: rgba(0, 0, 0, 0.123);
        }
    }
}
</style>
