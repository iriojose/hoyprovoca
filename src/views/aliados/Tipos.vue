<template>
    <div>
        <AppBar />
            <SubTipos :class="$vuetify.breakpoint.smAndDown ? 'mt-12':null"/>
        <Footer />
    </div>
</template>

<script>
import AppBar from '@/components/navbar/AppBar';
import Footer from '@/components/footer/Footer';
import SubTipos from '@/components/vistaAliados/SubTipos'

    export default {
        components:{
            AppBar,
            Footer,
            SubTipos
        }
    }
</script>