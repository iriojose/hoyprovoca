<template>
    <v-card :color="theme.background.strong" class="fixHeight"  style="border: none;padding:25px;" outlined>
        <div class="font-weight-black title" style="padding-top:10px;text-align:center;">Atención al cliente</div>
        <v-row justify="center" align="center" class="mt-3" style="padding-top:15px;">
            <v-scroll-x-transition>
                <div v-show="!loading" id="chat-talkjs" style="width: 100%;; height: 450px"><i><v-spacer></v-spacer><v-spacer></v-spacer></i></div>
            </v-scroll-x-transition>
            <v-progress-circular
                indeterminate
                color="#0f2441"
                v-if="loading"
                width="5"
                size="100"
            ></v-progress-circular>
        </v-row>
    </v-card>
</template>

<script>
import {mapState,mapActions} from 'vuex';
import Talk from 'talkjs';
import w from '@/services/variables_globales';

export default {
    head: {
        title() { 
            return {
                inner: "Hoyprovoca",
                separator:'|',
                complement:'Atención al cliente'
            };
        }
    },
    data() {
        return {
            ...w,
            me: null,
            other: null,
            loading:true,
        }
    },
    computed:{
        ...mapState(['user',"theme"]),
    },
    methods:{
        ...mapActions(['setSnackbar','setFoto','setFotoChanged', "setChatSession"]),
    },
    mounted() {
        this.setChatSession("chat-talkjs")
        setTimeout(() => this.loading = false,500)
    }
}
</script>

<style lang="scss">
    .slide-left-enter-active,
    .slide-left-leave-active,
    .slide-right-enter-active,
    .slide-right-leave-active {
        transition-duration: .3s;
        transition-property: height, opacity, transform;
        transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
        overflow: hidden;
    }
    
    .slide-left-enter,
    .slide-right-leave-active {
        opacity: 0;
        transform: translate(2em, 0);
    }
    
    .slide-left-leave-active,
    .slide-right-enter {
        opacity: 0;
        transform: translate(-2em, 0);
    }
    .fixHeight{
        @media (max-width:958px){
            margin-top:-25px!important;
            max-height: 100%!important;
        }
    }
</style>