<template>
    <div>
        <v-navigation-drawer 
            app v-model="drawers" temporary hide-overlay width="270"
            :style="$vuetify.breakpoint.smAndDown ? 'margin-top:106px;':'margin-top:64px'"
        >
            <LoaderRect v-if="loading" />

            <v-list v-else >
                <div class="text-center font-weight-bold my-2">Categorías</div>
                <v-divider></v-divider>
                <div v-for="item in grupos" :key="item.id" class="mx-2">
                    <v-hover v-slot:default="{hover}">
                        <v-list-item @click="push(item)" :class="hover ? 'sombra':null">
                            <v-list-item-avatar>
                                <v-img :src="image+item.imagen"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title class="text-capitalize font-weight-bold">{{ item.nombre }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-hover>
                </div>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex';
import Grupos from '@/services/Grupos';
import router from '@/router';
import LoaderRect from '@/components/loaders/LoaderRect';
import variables from '@/services/variables_globales';

    export default {
        components:{
            LoaderRect
        },
        data() {
            return {
                grupos:[],
                loading:true,
                ...variables
            }
        },
        mounted() {
            this.getGrupos();
        },
        computed:{
            ...mapState(['drawer']),

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
            getGrupos(){
                Grupos().get("/mostsold").then((response) => {
                    this.grupos = response.data.data;
                    this.loading = false;
                }).catch(e => {
                    console.log(e);
                });
            },
        },
    }
</script>

<style lang="css" scope>
    .sombra{
        -webkit-box-shadow: 0px 5px 6px -5px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 5px 6px -5px rgba(0,0,0,0.75);
        box-shadow: 0px 5px 6px -5px rgba(0,0,0,0.75);
    }
</style>