<template>
    <div>
        <v-toolbar color="#f7f7f7" elevation="0" width="100%" class="mt-12">
            <v-toolbar-title class="font-weight-black headline">
                {{title}}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn 
                :fab="$vuetify.breakpoint.smAndDown"
                :tile="!$vuetify.breakpoint.smAndDown" 
                color="#232323" to="/grupos" 
                class="text-capitalize" dark
            >
                <div v-if="!$vuetify.breakpoint.smAndDown">Ver todas</div>
                <v-icon 
                    :class="$vuetify.breakpoint.smAndDown ? null:'mx-2'" 
                    dark
                >
                    mdi-chevron-right
                </v-icon>
            </v-btn>
        </v-toolbar>

        <v-slide-group :show-arrows="$vuetify.breakpoint.smAndDown ? false:true" :class="$vuetify.breakpoint.smAndDown ? 'my-4':'my-4 mx-10'">
            <v-slide-item v-for="grupo in  grupos" :key="grupo.id" class="mx-2 mb-8">
                <v-hover v-slot:default="{hover}">
                    <v-card 
                        :width="200"
                        :height="200"  
                        :elevation="hover ? 3:3" @click="push(grupo)"
                        class="pa-5"
                    >
                        <v-card elevation="0" class="pa-5">
                            <v-row justify="center">
                                <v-img 
                                    contain 
                                    :width="100"
                                    :height="100" 
                                    :src="image+grupo.imagen" 
                                /> 
                            </v-row>
                        </v-card>    
                        <div class="mt-2 px-5 subtitle-1 font-weight-black">{{grupo.nombre}}</div>
                    </v-card>
                </v-hover>
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
            },
            title:{
                Type:String,
                default:''
            }
        },
        data(){
            return {
                ...variables
            }
        },
        methods:{
            push(item){
                window.localStorage.setItem('grupo',item.id);
                let nombre = item.nombre.toLowerCase(); 
                router.push({name:'grupoDetalle', params:{text:nombre}});
            }
        }
    }
</script>
