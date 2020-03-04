<template>
    <div>
        <AppBar />

        <v-row justify="center" align="center" class="fill-height mx-12" >
            <v-col cols="12" md="3" sm="6" v-for="grupo in grupos" :key="grupo.id">
                <v-card width="100" height="100">
                    <v-img contain width="100" height="100" :src="ruta+grupo.imagen"></v-img>
                </v-card>
            </v-col>
        </v-row>
        <Footer />
    </div>
</template>

<script>
//componentes
import AppBar from "@/components/navbar/AppBar";
import Footer from "@/components/footer/Footer";
import Grupos from '@/services/Grupos';
import url from '@/services/ruta';

    export default {
        components:{
            AppBar,
            Footer,
        },
        data() {
            return {
                ruta:null,
                grupos:[]
            }
        },
        mounted() {
            this.ruta = url;
            this.getGrupos();
        },
        methods: {
            getGrupos(){
                Grupos().get("/").then((response) => {
                    this.grupos = response.data.data;
                }).catch(e => {
                    console.log(e);
                })
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>