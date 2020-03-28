<template>
    <div>
        <v-btn v-if="user.loggedIn" icon class="mx-2" @click="change">
            <v-badge transition="fade-transition" color="#232323" left overlap>
                <v-icon size="25" color="#fff">shopping_cart</v-icon>
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