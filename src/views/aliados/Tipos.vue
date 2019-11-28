<template>
    <div>
        <AppBar />
            <SubTipos />
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

<style lang="scss" scoped>

</style>