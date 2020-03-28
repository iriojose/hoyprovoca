<template>
    <v-container>
        <v-divider class="my-12"></v-divider>
        <v-card-actions>
            <div class="headline ml-12 mt-12 font-weight-black">Visita nuestras tiendas</div>
            <v-spacer></v-spacer>
            <v-hover v-slot:default="{hover}">
                <v-btn to="/aliados" width="100" text depressed class="caption text-capitalize mt-10">
                    Ver todas 
                    <v-slide-x-transition>
                        <v-icon v-show="hover">keyboard_arrow_right</v-icon>
                    </v-slide-x-transition>
                </v-btn>
            </v-hover>
        </v-card-actions>

        <v-slide-group show-arrows class="my-5 py-5">
            <v-slide-item v-for="empresa in  empresas" :key="empresa.id" class="mx-4 mb-8">
                <v-hover v-slot:default="{hover}">
                    <v-card height="200" width="300" :elevation="hover ? 5:0" @click="push(empresa)">
                        <v-img contain width="300" height="200" :src="image+empresa.logo" /> 
                        <div class="mt-2 px-5">{{empresa.nombre_comercial}}</div>
                    </v-card>
                </v-hover>
            </v-slide-item>
        </v-slide-group>
    </v-container>
</template>

<script>
import variables from '@/services/variables_globales';
import router from '@/router';

    export default {
        props:{
            empresas:{
                Type:Array,
                default:() => ([])
            }
        },
        data() {
            return {
                ...variables
            }
        },
        methods: {
            push(empresa){
                //var re = / /gi; 
                //const nombre = empresa.nombre_comercial.replace(re,'-');//remplaza los espacios por guiones
                router.push({name:'aliadoDetalle', params:{text:empresa.nombre_comercial}});
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>