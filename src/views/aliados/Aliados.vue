<template>
    <div>
        <AppBar />
        <v-layout row wrap class="mb-5">
            <v-flex md12 lg12 xs12 sm12>
                <CategoriasProductos />
            </v-flex>
        </v-layout>
        <Footer />
    </div>
</template>

<script>
import CategoriasProductos from '@/components/vistaAliados/CategoriasProductos';
import Productos from '@/components/vistaAliados/Productos';
import AppBar from '@/components/navbar/AppBar';
import Footer from '@/components/footer/Footer';

    export default {
        components:{
            CategoriasProductos,
            Productos,
            AppBar,
            Footer
        }
    }
</script>