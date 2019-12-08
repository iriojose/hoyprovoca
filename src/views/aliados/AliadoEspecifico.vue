<template>
    <div>
        <AppBar />
        <v-row :class="$vuetify.breakpoint.smAndDown ? 'mx-5 mt-12':'mx-5'">
            <v-col cols="12" md="3" lg="3" sm="12">
                <CategoriasConceptos />
            </v-col>
            <v-col cols="12" md="9" lg="9" sm="12">
                <Conceptos />
            </v-col>
        </v-row>
        <Footer />
    </div>
</template>

<script>
import CategoriasConceptos from '@/components/vistaAliados/CategoriasConceptos';
import Conceptos from '@/components/vistaAliados/Conceptos';
import AppBar from '@/components/navbar/AppBar';
import Footer from '@/components/footer/Footer';

    export default {
        components:{
            CategoriasConceptos,
            Conceptos,
            AppBar,
            Footer
        },
    }
</script>

<style lang="scss" scoped>

</style>