<template>
    <v-sheet class="mt-4">
        <v-slide-group
            show-arrows
        >
            <v-slide-item v-for="(empresa,i) in empresas" :key="i" class="my-3">
                <v-hover v-slot:default="{hover}">
                    <v-avatar 
                        @click="push(empresa.razon_social,empresa.id)"
                        :class="hover ? 'mx-4 elevation-4':'mx-4 elevation-2'" 
                        size="80">
                        <v-img src="@/assets/noimage.png" contain></v-img>
                    </v-avatar>
                </v-hover>
            </v-slide-item>
        </v-slide-group>
    </v-sheet>
</template>

<script>
import router from '@/router';

    export default {
        props:{
            empresas:{
                type:Array,
                default:() => []
            }
        },
        methods: {
            push(nombre,id){
                router.push('/aliados/'+nombre+'/'+id);
            }
        },
    }
</script>