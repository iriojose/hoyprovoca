<template>
    <div>
        <div 
            :class="$vuetify.breakpoint.smAndDown ? 'font-weight-black text-center headline mt-12':'headline ml-12 mt-12 font-weight-black'"
        >{{title}}</div>

        <v-slide-group show-arrows :class="$vuetify.breakpoint.smAndDown ? 'my-4':'my-4 mx-10'">
            <v-slide-item v-for="empresa in  empresas" :key="empresa.id" class="mx-2 mb-8">
                <v-hover v-slot:default="{hover}">
                    <v-card 
                        :height="$vuetify.breakpoint.smAndDown ? 200:200" 
                        :width="$vuetify.breakpoint.smAndDown ? 200:300" 
                        :elevation="hover ? 0:4" @click="push(empresa)"
                    >
                        <v-img 
                            :height="$vuetify.breakpoint.smAndDown ? 160:160" 
                            :width="$vuetify.breakpoint.smAndDown ? 200:300"  
                            contain :src="image+empresa.logo" 
                        />
                        <div class="mt-2 px-5">{{empresa.nombre_comercial}}</div>
                    </v-card>
                </v-hover>
            </v-slide-item>

            <v-slide-item>
                <v-card 
                    :height="$vuetify.breakpoint.smAndDown ? 150:200" 
                    :width="$vuetify.breakpoint.smAndDown ? 200:300" 
                    elevation="0" color="#f7f7f7"
                    class="px-10"
                >
                    <v-row justify="center" align="center" class="fill-height">
                        <v-hover v-slot:default="{hover}">
                            <v-btn 
                                color="#005598"
                                depressed 
                                block
                                dark
                                class="caption text-capitalize"
                                :elevation="hover ? 2:0"
                            >
                                Ver todas 
                            </v-btn>
                        </v-hover>
                    </v-row>
                </v-card>
            </v-slide-item>
        </v-slide-group>
    </div>
</template>

<script>
import variables from '@/services/variables_globales';
import router from '@/router';

    export default {
        props:{
            empresas:{
                Type:Array,
                default:() => ([])
            },
            title:{
                Type:String,
                default:''
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