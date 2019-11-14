<template>
    <div>
        <AppBar/>
        <v-layout row wrap class="ma-5">
            <v-flex md3 xs12 class="elevation-1">
                <Opciones />
            </v-flex>
            <v-flex md9>
                <v-card elevation="1" class="mx-4 pa-5">
                    <router-view></router-view>
                </v-card>
            </v-flex>
        </v-layout>
        <Footer />
    </div>
</template>

<script>
import Opciones from '@/components/vistaAccount/Opciones';
import AppBar from '@/components/navbar/AppBar';
import Footer from '@/components/footer/Footer';

export default {
    components:{
        Opciones,
        AppBar,
        Footer
    }
}
</script>