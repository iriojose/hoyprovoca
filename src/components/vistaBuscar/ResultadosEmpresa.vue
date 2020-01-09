<template>
    <div>
        <h3 class="headline text-center mb-3">Resultados:</h3>
        <v-slide-group show-arrows class="space">
            <v-slide-item
                v-for="empresa in empresas" 
                :key="empresa.id" 
            >
                <v-hover v-slot:default="{hover}">
                    <v-avatar v-ripple @click="push(empresa.razon_social,empresa.id)" :class="hover ? 'mx-4 elevation-4':'mx-4 elevation-2'" size="80">
                        <v-img :src="empresa.imagen" />
                    </v-avatar>
                </v-hover>
            </v-slide-item>
        </v-slide-group>
    </div>
</template>

<script>
//router
import router from '@/router';

    export default {
        props:{
            empresas:{
                type:Array,
                default: () => []
            }
        },methods: {
             push(text,id){
                router.push('/aliados/'+text+'/'+id);
            },
        },
    }
</script>