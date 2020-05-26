<template>
    <v-card color="#f7f7f7" elevation="0" width="100%">
        <v-card-text>
            <v-row justify="center" :class="$vuetify.breakpoint.smAndDown ? 'margen-movil':'margen'">
                <v-col cols="12" md="3" sm="12">
                    <v-card>
                        <v-card-text>

                            <v-list dense nav>
                                <v-list-item two-line>
                                    <v-list-item-avatar size="100">
                                        <v-img :src="image+user.data.imagen"></v-img>
                                    </v-list-item-avatar>
                                    <v-avatar @click="open" class="abs_center" size="40" style="z-index:2;" color="#F5F5F5">
                                        <v-icon>mdi-camera</v-icon>
                                    </v-avatar>

                                    <v-list-item-content class="font-weight-bold">
                                        <v-list-item-title>Mi perfil</v-list-item-title>
                                        <v-list-item-subtitle class="font-weight-bold">{{user.data.nombre +' '+ user.data.apellido}}</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>

                            <v-divider class="mt-5"></v-divider>

                            <v-list dense class="mt-5" flat>
                                <v-list-item v-for="(opcion,i) in opciones" :key="i" :to="opcion.path" active-class="color shadow2 white--text">
                                    <v-list-item-icon>
                                        <v-icon :color="$route.path == opcion.path ? '#fff':'#232323'" small>{{opcion.icon}}</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        {{opcion.text}}
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" md="9" sm="12">
                    <v-card>
                        <v-card-text>
                            <router-view></router-view>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
import variables from '@/services/variables_globales';
import {mapState,mapActions} from 'vuex';

    export default {
        data() {
            return {
                ...variables,
                opciones:[
                    {icon:'mdi-cogs',path:'/account/profile',text:'Ajustes de cuenta'},
                    {icon:'mdi-history',path:'/account/notificaciones',text:'Centro de notificaciones'},
                    {icon:'mdi-alert-circle',path:'/account/ordenes',text:'Últimas ordenes'},
                    {icon:'mdi-help-cicle',path:'/account/ayuda',text:'Centro de ayuda'},
                ]
            }
        },
        head:{
            title(){
                return {
                    inner:'Hoyprovoca',
                    separator:'|',
                    complement: 'Perfil'
                }
            }
        },
        computed:{
            ...mapState(['user'])
        },
        methods: {
            ...mapActions(['setModalImagen']),
            open(){
                this.setModalImagen(true);
            }

        },
    }
</script>

<style lang="scss" scoped>
    .margen{
        margin-top:75px;
    }
    .margen-movil{
        margin-top:100px;
    }
    .sombra{
        -webkit-box-shadow: 0px 5px 6px -5px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 5px 6px -5px rgba(0,0,0,0.75);
        box-shadow: 0px 5px 6px -5px rgba(0,0,0,0.75);
    }
    .abs_center{
        position: absolute;
        top: 80px;
        left: 75px;
    }
    .abs_center:hover{
        cursor: pointer;
        background: #ededed !important;
    }
</style>