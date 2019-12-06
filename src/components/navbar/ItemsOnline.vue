<template>
    <v-toolbar-items v-if="user.loggedIn">
        <v-btn icon class="mx-3"  @click="change()">
            <v-badge 
                color="teal"
                left
                overlap
            >
                <template v-slot:badge>1</template>
                <v-icon size="35">shopping_cart</v-icon>
            </v-badge>
        </v-btn>

        <v-btn icon class="mx-3" to="/account/notificaciones">
            <v-badge
                color="teal"
                left
                overlap
            >
                <template v-slot:badge><div></div></template>
                <v-icon size="35">notifications</v-icon>
            </v-badge>
        </v-btn>
        <PanelCarrito />
    </v-toolbar-items>
</template>

<script>
import PanelCarrito from './PanelCarrito';
import {mapState,mapActions,mapGetters} from 'vuex';

    export default {
        components:{
            PanelCarrito
        },
        computed: {
            ...mapGetters({
                user: "user"
            }),
            
            ...mapState(['panel'])
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
