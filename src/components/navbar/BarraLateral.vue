<template>
    <v-navigation-drawer 
        app v-model="dialog" temporary hide-overlay width="270" color="#fff" :permanent="dialog"
        :style="$vuetify.breakpoint.smAndDown ? 'margin-top:102px;':'margin-top:63px'"
    >
        <v-list dark>
            <div class="text-center font-weight-bold my-2 black--text">Categorías</div>
            <v-divider dark></v-divider>

            <v-list-item @click="push(item)" class="mx-2 move" v-for="item in grupos" :key="item.id">
                <v-list-item-avatar tile>
                    <v-img :src="image+item.imagen"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title class="text-capitalize font-weight-bold black--text">{{ item.nombre }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import {mapState} from 'vuex';
import router from '@/router';
import variables from '@/services/variables_globales';

    export default {
        props:{
            dialog:{
                type:Boolean,
                default:false
            }
        },
        data() {
            return {
                ...variables
            }
        },
        computed:{
            ...mapState(['grupos']),
        },
        methods: {
            push(item){
                window.localStorage.setItem('grupo',item.id);
                let nombre = item.nombre.toLowerCase(); 
                router.push({name:'grupoDetalle', params:{text:nombre}});
            },
        },
    }
</script>

<style lang="scss" scoped>
    .move{
        transition:all 0.3s;
    }
    .move:hover{
        transform:translateX(20px);
    }
</style>