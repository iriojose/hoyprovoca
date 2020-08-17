<template>
    <v-bottom-navigation
        color="#2950c3"
        height="60"
        fixed
    >
        <v-btn to="/" active-class="#2950c3">
            <span>Inicio</span>
            <v-icon>mdi-home</v-icon>
        </v-btn>

        <v-btn to="/account/profile" v-if="user.loggedIn" active-class="#2950c3">
            <span>Perfil</span>
            <v-icon>mdi-account</v-icon>
        </v-btn>
        <v-btn to="/grupos" v-else active-class="#2950c3">
            <span>Categorías</span>
            <v-icon>mdi-clipboard-text-multiple</v-icon>
        </v-btn>

        <v-btn to="/search" active-class="#2950c3">
            <span>Buscar</span>
            <v-icon>mdi-magnify</v-icon>
        </v-btn>
    </v-bottom-navigation>
</template>

<script>
import {mapState} from "vuex";

    export default {
        computed:{
            ...mapState(['user'])
        }
    }
</script>