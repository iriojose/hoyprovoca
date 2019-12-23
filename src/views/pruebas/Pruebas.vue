<template>
    <div>
        <SkeletonCategorias />
    </div>
</template>

<script>
import SkeletonCategorias from '@/components/layouts/SkeletonCategorias';

    export default {
        inject: ['theme'],
        components:{
            SkeletonCategorias
        },
        data() {
            return {
               
            }
        },
    }
</script>