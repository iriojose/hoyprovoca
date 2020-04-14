<template>
    <div>
        <v-btn
            fab :class="$vuetify.breakpoint.smAndDown ? 'mx-1':'mx-3'" 
            small @click="change" v-if="user.loggedIn"
        >
            <v-badge color="#232323" bottom overlap>
                <v-icon dark>shopping_cart</v-icon>
                <template v-slot:badge>
                    {{pedidos.length}}
                </template>
            </v-badge>
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