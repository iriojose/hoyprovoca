<template>
    <div>
        <div class="font-weight-black subtitle-1">Mis últimos pedidos</div>
    </div>
</template>

<script>
//import Usuario from '@/services/Usuario';
import {mapState} from 'vuex';

    export default {
        computed: {
            ...mapState(['user','pedidos'])
        },
        mounted() {
            //this.getPedidos(this.user.data.id);
        },
        methods: {
            /*getPedidos(id){
                Usuario().get(`/${id}/pedidos`).then((response) => {
                    this.pedidos
                }).catch(e => {
                    console.log(e);
                })
            }*/
        },
    }
</script>

<style lang="scss" scoped>

</style>