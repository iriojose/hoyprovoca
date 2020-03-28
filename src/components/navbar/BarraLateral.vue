<template>
    <v-navigation-drawer 
        app v-model="drawers" temporary hide-overlay width="270"
        :style="$vuetify.breakpoint.smAndDown ? 'margin-top:106px;':'margin-top:64px'"
    >
        <LoaderRect v-if="loading" />

        <v-list v-else>
            <div class="text-center font-weight-bold my-2">Categorías</div>
            <v-divider></v-divider>
            <v-list-item 
                link 
                v-for="item in grupos" 
                :key="item.id"
                @click="push(item)"
            >
                <v-list-item-content>
                    <v-list-item-title class="text-center text-lowercase">{{ item.nombre }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import {mapState,mapActions} from 'vuex';
import Grupos from '@/services/Grupos';
import router from '@/router';
import LoaderRect from '@/components/loaders/LoaderRect';

    export default {
        components:{
            LoaderRect
        },
        data() {
            return {
                grupos:[],
                loading:true
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
                var re = / /gi; 
                const nombre = item.nombre.replace(re,'-');//remplaza los espacios por guiones
                router.push({name:'grupoDetalle', params:{text:nombre,id:item.id}});
            },
            getGrupos(){
                Grupos().get("/?limit=50").then((response) => {
                    this.grupos = response.data.data;
                    this.loading = false;
                }).catch(e => {
                    console.log(e);
                });
            },
        },
    }
</script>