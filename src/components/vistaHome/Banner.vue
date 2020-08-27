<template>
    <v-row class="content-movil" justify="center" v-if="!$vuetify.breakpoint.smAndDown">
        <v-col cols="6" md="6">
            <div
                :style="`color:${theme.background.font}`"
                class="no-margin display-1 my-12 "
            >
                <p class="slogan">
                    <span class="line-1"> Te llevamos el Mercado o </span>
                    <span class="line-2">lo que te provoque... </span>
                    <span class="line-3"
                        ><strong> a la puerta de tu casa.</strong></span
                    >
                </p>
            </div>
        </v-col>
        <v-col cols="12" md="5">
            <v-img :src="require('@/assets/bannerweb1.png')"> </v-img>
        </v-col>
         <v-img
                class="App"
                :width="200"
                :height="50"
                contain="true"
                :src="require('@/assets/Googleplay.jpeg')"
            ></v-img>
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
                contain="true"
                :src="require('@/assets/Googleplay.jpeg')"
            ></v-img>
        </v-col>
    </v-row>
</template>

<script>
import { mapState } from "vuex";
export default {
    computed: {
        ...mapState(["theme"]),
    },
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
            font-size: 2.8rem !important;
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
</style>
