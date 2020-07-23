<template>
    <div>
        <v-navigation-drawer 
            app v-model="drawers" temporary hide-overlay width="270"
            :style="$vuetify.breakpoint.smAndDown ? 'margin-top:106px;':'margin-top:60px'"
        >
            <v-list>
                <div class="text-center font-weight-bold my-2">Categorías</div>
                <v-divider></v-divider>

                <v-list-item @click="push(item)" class="mx-2 move" v-for="item in grupos" :key="item.id">
                    <v-list-item-avatar tile>
                        <v-img :src="image+item.imagen"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title class="text-capitalize font-weight-bold">{{ item.nombre }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex';
import router from '@/router';
import LoaderRect from '@/components/loaders/LoaderRect';
import variables from '@/services/variables_globales';

    export default {
        components:{
            LoaderRect
        },
        data() {
            return {
                ...variables
            }
        },
        computed:{
            ...mapState(['drawer','grupos']),

            drawers:{
                get(){
                    return this.drawer;
                },
                set(val){
                    this.setDrawer(val);
                }
            }
        },
        methods: {
            ...mapActions(['setDrawer']),

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