<template>
    <div>
        <v-btn v-if="user.loggedIn" icon class="mx-2" @click="change()">
            <v-badge transition="fade-transition" color="teal" left overlap>
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
import {mapState,mapActions,mapGetters} from 'vuex';

    export default {
        components:{
            PanelCarrito
        },
        computed: {
            ...mapGetters(['user']),
            ...mapState(['panel','pedidos']),
        },
        methods: {
            ...mapActions(['setPanel']),

            change(){
                if(this.panel==true){
                    this.setPanel(false);
                }else{
                    this.setPanel(true);
                }
            },
        },
    }
</script>
