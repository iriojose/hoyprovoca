<template>
    <div>
        reset
        <SubFooter class="mt-5" />
    </div>
</template>

<script>
import Auth from '@/services/Auth';
import SubFooter from "@/components/footer/SubFooter";

    export default {
        components:{
            SubFooter
        },
        head: {
            title() {
                return {
                    inner: "Restablecer contraseña",
                    separator:' ',
                    complement:' '
                };
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>