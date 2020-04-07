<template>
    <div>
        <div 
            :class="$vuetify.breakpoint.smAndDown ? 'font-weight-black text-center headline mt-12':'headline ml-12 mt-12 font-weight-black'"
        >Visita nuestras tiendas</div>

        <v-slide-group show-arrows :class="$vuetify.breakpoint.smAndDown ? 'my-4':'my-4 mx-10'">
            <v-slide-item v-for="grupo in  grupos" :key="grupo.id" class="mx-2 mb-8">
                <v-hover v-slot:default="{hover}">
                    <v-card 
                        :height="$vuetify.breakpoint.smAndDown ? 150:200" 
                        :width="$vuetify.breakpoint.smAndDown ? 200:300" 
                        :elevation="hover ? 5:1" @click="push(grupo)">
                        <v-img 
                            contain 
                            :width="$vuetify.breakpoint.smAndDown ? 200:300" 
                            :height="$vuetify.breakpoint.smAndDown ? 150:200" 
                            :src="image+grupo.imagen" 
                        /> 
                        <div class="mt-2 px-5">{{grupo.nombre}}</div>
                    </v-card>
                </v-hover>
            </v-slide-item>

            <v-slide-item>
                <v-card 
                    :height="$vuetify.breakpoint.smAndDown ? 150:200" 
                    :width="$vuetify.breakpoint.smAndDown ? 200:300" 
                    color="#f7f7f7" elevation="0"
                >
                    <v-row justify="center" align="center" class="fill-height">
                        <v-hover v-slot:default="{hover}">
                            <v-btn 
                                to="/grupos"
                                color="#005598"
                                depressed 
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
            grupos:{
                type:Array,
                default:() => ([])
            }
        },
        data(){
            return {
                ...variables
            }
        },
        methods:{
            push(grupo){
                var re = / /gi; 
                const nombre = grupo.nombre.replace(re,'-');//remplaza los espacios por guiones
                router.push({name:'grupoDetalle', params:{text:nombre,id:grupo.id}});
            }
        }
    }
</script>
