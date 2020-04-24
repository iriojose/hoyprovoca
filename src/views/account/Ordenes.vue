<template>
    <div>
        <div class="font-weight-black subtitle-1">Mis últimos pedidos</div>

        <div v-if="pedidos == []" class="px-10 font-weight-bold body-2">
            <v-row justify="center" align="center">
                <div class="text-center title"> No tiene pedidos pendientes...</div>
                <v-img contain width="100%" height="300" :src="require('@/assets/empty.svg')" />
            </v-row>
        </div>
        
        <v-card width="100%" elevation="0" v-else>
            <v-alert 
                border="left" colored-border 
                :type="pedido.rest_estatus_id == 2 ? 'info':'success'" 
                elevation="2" v-for="(pedido,i) in pedidos" :key="i"
            >
                <v-expansion-panels flat class="elevation-0">
                    <v-expansion-panel class="elevation-0">
                        <v-expansion-panel-header class="elevation-0">
                            <v-toolbar height="5" elevation="0">
                                <v-avatar size="50" class="elevation-2">
                                    <v-img :src="image+pedido.imagen"></v-img>
                                </v-avatar>

                                <v-spacer></v-spacer>

                                <span v-if="pedido.rest_estatus_id == 2">En espera </span>
                                <span v-else>Completado </span>
                            </v-toolbar>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-slide-group show-arrows class="mx-5">
                                <v-slide-item v-for="(detalle,e) in pedido.detalles" :key="e" class="mx-2 my-2">
                                    <v-avatar size="50" class="elevation-2">
                                        <v-img :src="image+detalle.imagen"></v-img>
                                    </v-avatar>
                                </v-slide-item>
                            </v-slide-group>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-alert>
        </v-card>
    </div>
</template>

<script>
import Usuario from '@/services/Usuario';
import {mapState} from 'vuex';
import variables from '@/services/variables_globales';

    export default {
        data() {
            return {
                pedidos:[],
                ...variables
            }
        },
        computed: {
            ...mapState(['user'])
        },
        mounted() {
            this.getPedidos(this.user.data.id);
        },
        methods: {
            getPedidos(id){
                Usuario().get(`/${id}/pedidos/?rest_estatus_id > 1`).then((response) => {
                    this.pedidos = response.data.data;
                }).catch(e => {
                    console.log(e);
                });
            }
        },
    }
</script>