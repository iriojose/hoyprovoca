<template>
    <v-dialog v-model="block" close-delay width="500" transition="dialog-bottom-transition">
        <v-card height="500" class="pa-5">
            <v-card-text>
                usuario baneado
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import {mapState,mapActions} from 'vuex';

    export default {    
        computed:{
            ...mapState(['bloqueado']),

            block:{
                get(){ return this.bloqueado },
                set(val){ this.setModalBloqueado(val)},
            }
        },
        methods: {
            ...mapActions(['setModalBloqueado']),

            close(){
                this.setModalBloqueado(false);
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>