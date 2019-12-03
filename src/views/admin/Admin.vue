<template>
    <div>
        <BarraLateralAdmin />
        <NavbarAdmin />
        
        <transition>
            <router-view />
        </transition>   
    </div>
</template>

<script>
import NavbarAdmin from '@/components/vistaAdmin/NavbarAdmin';
import BarraLateralAdmin from '@/components/vistaAdmin/BarraLateralAdmin';

    export default {
        components:{
            NavbarAdmin,
            BarraLateralAdmin
        }
    }
</script>

<style scoped>

</style>