<template>
    <div>
        <v-btn
            fab class="mx-3" 
            color="#232323"
            small @click="change" v-if="user.loggedIn && !$vuetify.breakpoint.smAndDown"
        >
            <v-badge dot overlap color="#D32F2F" v-if="pedidos.length > 0">
                <v-icon color="#fff">mdi-basket</v-icon>
            </v-badge>

            <v-icon color="#fff" v-else>mdi-basket</v-icon>
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