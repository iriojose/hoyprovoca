<template>
    <div>
        <v-btn
            fab class="mx-3" 
            small @click="change" v-if="user.loggedIn"
        >
            <v-badge dot overlap color="#D32F2F" v-if="pedidos.length > 0">
                <v-icon dark>shopping_cart</v-icon>
            </v-badge>

            <v-icon dark v-else>shopping_cart</v-icon>
        </v-btn>

        <PanelCarrito />
    </div>
</template>

<script>
import PanelCarrito from './PanelCarrito';
import {mapState,mapActions} from 'vuex';

    export default {
        components:{
            PanelCarrito
        },
        computed: {
            ...mapState(['user','carrito','pedidos']),
        },
        methods: {
            ...mapActions(['setCarrito']),
            change(){
                this.carrito ?  this.setCarrito(false):this.setCarrito(true);
            },
        },
    }
</script>