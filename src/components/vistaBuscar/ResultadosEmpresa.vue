<template>
    <div>
        <h3 class="headline text-center mb-3">Resultados:</h3>
        <v-slide-group show-arrows class="space">
            <v-slide-item
                v-for="resultado in resultados" 
                :key="resultado.local" 
            >
                <v-hover v-slot:default="{hover}">
                    <v-avatar v-ripple @click="push(resultado.local,resultado.id)" :class="hover ? 'mx-4 elevation-4':'mx-4 elevation-2'" size="80">
                        <v-img :src="resultado.img" />
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
            resultados:{
                type:Array,
                default: () => ([])
            }
        },methods: {
             push(text,id){
                router.push('/aliados/'+text+'/'+id);
            },
        },
    }
</script>

<style lang="scss" scoped>

</style>