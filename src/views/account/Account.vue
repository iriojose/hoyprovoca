<template>
    <div>
        <AppBar/>
        <v-layout row wrap class="ma-5" >
            <v-flex 
                md3 xs12 lg3 
                :class="$vuetify.breakpoint.smAndDown ? 'my-12':null"
            >
                <!-- Componente que contiene el lado izquierdo de la vista -->
                <PanelIzquierdo />
            </v-flex>
            <v-flex md9 xs12 lg9>
                <v-card 
                    elevation="0" 
                    color="#eee" 
                    :class="$vuetify.breakpoint.smAndDown ? null:'mx-4 px-2'"
                >
                    <!--para cambiar la vista segun presionen en Panel izquierdo -->
                    <router-view/>
                </v-card>
            </v-flex>
        </v-layout>
        <Footer />
    </div>
</template>

<script>
import PanelIzquierdo from '@/components/vistaAccount/PanelIzquierdo';
import AppBar from '@/components/navbar/AppBar';
import Footer from '@/components/footer/Footer';

export default {
    components:{
        PanelIzquierdo,
        AppBar,
        Footer
    }
}
</script>