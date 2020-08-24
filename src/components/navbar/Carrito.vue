<template>
    <div>
        <v-btn
            fab class="mx-3" 
            color="transparent"
            elevation="0"
            small @click="change" v-if="user.loggedIn && !$vuetify.breakpoint.smAndDown"
        >
            <v-badge dot overlap color="#D32F2F" v-if="pedidos.length > 0">
                <v-icon :color="theme.background.font">mdi-basket</v-icon>
            </v-badge>

            <v-icon :color="theme.background.font" v-else>mdi-basket</v-icon>
        </v-btn>

        <PanelCarrito />
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex';

    export default {
        components:{
            PanelCarrito:() => import('./PanelCarrito')
        },
        computed: {
            ...mapState(['user','carrito','pedidos','theme']),
        },
        methods: {
            ...mapActions(['setCarrito']),
            change(){
                this.carrito ?  this.setCarrito(false):this.setCarrito(true);
            },
        },
    }
</script>