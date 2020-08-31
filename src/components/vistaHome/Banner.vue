<template>
    <v-row class="content-movil" justify="center" v-if="!$vuetify.breakpoint.smAndDown" style="height:90vh">
        <v-col cols="12" md="12" style="position:relative;">
            <v-img
                class="absolute a-center movement"
                style="top: 60px;margin-left:-20px"
                :width="100"
                :contain="true"
                :src="require('@/assets/avocado.png')"
            ></v-img>
            <v-img
                class="absolute movement"
                :width="130"
                style="top: 100px;left: 140px;"
                :contain="true"
                :src="require('@/assets/burguer.png')"
            ></v-img>
            <v-img 
                class="absolute movement"
                style="bottom: 70px;left: 150px;"
                :width="130"
                :contain="true"
                :src="require('@/assets/medicine.png')"
            ></v-img>
            <v-img
                class="absolute h-center movement"
                style="bottom: 40px;;margin-left:-40px"
                :width="130"
                :contain="true"
                :src="require('@/assets/dessert.png')"
            ></v-img>
            <v-img
                class="absolute movement"
                style="bottom: 80px; right: 140px"
                :width="120"
                :contain="true"
                :src="require('@/assets/gamepad.png')"
            ></v-img>
            <v-img
                class="absolute movement"
                style="top: 110px; right: 140px"
                :width="140"
                :contain="true"
                :src="require('@/assets/phones.png')"
            ></v-img>
            <div
                :style="`color:${theme.background.font};margin: 0 auto; display:block;`"
                class=" display-1"
            >
                <p class="slogan absolute a-center">
                    <span class="line-1" style="text-align:center;"> Lo que te provoca justo al 
                        <span class="line-3" style="text-align:center;"
                        ><strong> alcance de tus manos.</strong></span
                    >
                    </span>
                   <span style="position:relative;width:100%;padding: 0 50px">
                        <v-text-field
                            style="display:block;"
                            label="¿Qué te provoca?" hide-details
                            v-on:keyup.enter="push" light
                            class=" ml-10 my-6 hidden-sm-and-down" single-line
                            solo v-model="busquedas"
                        >
                            <v-btn slot="append" tile text small @click="push">
                                <v-icon color="#D32F2F">mdi-magnify</v-icon>
                            </v-btn>
                        </v-text-field>
                   </span>
                </p>
            </div>
        </v-col>
    </v-row>
    <v-row justify="start" v-else>
        <v-col
            class="content-movil"
            cols="12"
            sm="4"
            offset-sm="4"
        >
            <p class="slogan-movil">
                <span class="line-1"> Te llevamos el</span>
                <span class="line-1">Mercado o </span>
                <span class="line-2">lo que te</span>
                <span class="line-2"> provoque...a </span>
                <span class="line-3"><strong> la puerta de </strong></span>
                <span class="line-3"><strong>tu casa.</strong></span>
            </p>
            <v-img
                class="imagens"
                width="100%"
                :src="require('@/assets/bannerMovil1.png')"
            >
            </v-img>
            <v-img
                class="App"
                :width="170"
                :height="30"
                :contain="true"
                :src="require('@/assets/Googleplay.jpeg')"
            ></v-img>
        </v-col>
    </v-row>
</template>
<script>
import router from '@/router';

import {mapState, mapActions} from 'vuex';
export default {
    computed:{
            ...mapState(['theme', 'user','search','bandera','drawer','theme']),

            busquedas:{
                get(){ return this.search},
                set(val){ this.setBuscar(val)}
            },
    },
    methods:{
            ...mapActions(['setBuscar','setBandera','setDrawer']),
            
            change(){
                this.drawer ? this.setDrawer(false):this.setDrawer(true);
            },
            push(){ 
                if(this.bandera){
                    this.setBandera(false);
                }else{
                    this.setBandera(true);
                }
                if (this.$route.name !== 'search') router.push("/search");
            },
            push2(){ router.push('/')}
        }
};
</script>

<style lang="scss" scoped>
.no-margin {
    margin: 0 !important;
    height: 100%;
}
.content-movil {
    position: relative !important;
}
.imagen {
    z-index: 1;
}
.App{
  position: absolute;
  bottom: 0;
  left:0;
  padding-left: 5vh;
  margin-bottom: 3vh;
  cursor: pointer;
}
.slogan {
    display: flex;
    margin: 0;
    height: 100%;
    justify-content: center;
    flex-direction: column;
    align-items: flex-start;
    text-align: center;
    .line {
        &-2 {
            font-size: 2.925rem !important;
        }
        &-3 {
            font-size: 2.3rem !important;
            line-height: 1;
        }
    }

    &-movil {
        position: absolute!important;
        top: 0;
        right: 0;
        display: flex;
        padding-top:5vw;
        padding-right: 10vw;
        font-size:1.2rem;
        font-weight: 900;
        justify-content: flex-start;
        flex-direction: column;
        align-items: flex-end;
        z-index: 2;
    }
}

@keyframes move {
    0% {
        transform: translateY(-10%)
    }

    50% {
        transform: translateY(10%)
    }

    100% {
        transform: translateY(-10%)
    }
}

.movement {
    animation: move 10s ease-in-out infinite;

}

.absolute {
    position: absolute;
}

.h-center {
    left: 50%;
    transform: translateX(-50%);
}

.a-center {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
