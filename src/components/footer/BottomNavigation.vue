<template>
    <v-bottom-navigation
        :value="activeBtn"
        color="#2950c3"
        horizontal
        fixed
    >
        <v-btn to="/">
            <span>Inicio</span>
            <v-icon>mdi-home</v-icon>
        </v-btn>

        <v-btn to="/account/profile" v-if="user.loggedIn">
            <span>Perfil</span>
            <v-icon>mdi-account</v-icon>
        </v-btn>
        <v-btn to="/grupos" v-else>
            <span>Categorías</span>
            <v-icon>mdi-clipboard-text-multiple</v-icon>
        </v-btn>

        <v-btn to="/search">
            <span>Buscar</span>
            <v-icon>mdi-magnify</v-icon>
        </v-btn>
    </v-bottom-navigation>
</template>

<script>
import {mapState} from "vuex";

    export default {
        data () {
            return {
                activeBtn: 1,
            }
        },
        computed:{
            ...mapState(['user'])
        }
    }
</script>