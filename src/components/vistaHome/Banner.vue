<template>
    <v-img 
        :height="500" width="100%" 
        :src="require('@/assets/index2.jpg')"
        v-if="!$vuetify.breakpoint.smAndDown"
    >
        <v-row justify="center">
            <v-col cols="12" md="5">
                <div :style="`color:${theme.background.font2}`" class="text-center display-1 my-12 ">
                    Te llevamos el <span class="font-weight-black">Mercado</span> o lo que te <span class="font-weight-black">provoque</span> a la puerta de tu <span class="font-weight-black">casa</span>...
                </div>
            </v-col>
        </v-row>
    </v-img>
    <v-img 
        :height="500" width="100%" 
        :src="require('@/assets/index_movil.jpg')"
        v-else
    >
        <v-row justify="start">
            <v-col cols="12" sm="4" offset-sm="4" style="padding-right:180px">
                <div :style="`color:${theme.background.font2};padding-top:26px`" class="text-center title my-12">
                    Te llevamos el <span class="font-weight-black">Mercado</span> o lo que te <span class="font-weight-black">provoque</span> a la puerta de tu <span class="font-weight-black">casa</span>...
                </div>
            </v-col>
        </v-row>
    </v-img>
</template>

<script>
import {mapState} from 'vuex';
export default {
  computed:{
    ...mapState(["theme"])
  }
}
</script>
