<template>
    <div>
        <div class="text-center my-4 black--text headline font-weight-black">
            Categorías
        </div>
        <v-row justify="center">
            <v-card
                :elevation="0"
                class="border mx-2 mb-4"
                color="transparent"
                :width="$vuetify.breakpoint.smAndDown ? 100 : 200"
                :height="$vuetify.breakpoint.smAndDown ? 100 : 200"
                v-for="(grupo, i) in grupos"
                :key="i"
                @click="push(grupo)"
            >
                <loadImage :color="colores[i]" :imagenViene=grupo.imagen />
                <div class="mt-2 text-center subtitle-2 font-weight-black">
                    {{ grupo.nombre }}
                </div>
            </v-card>
        </v-row>
    </div>
</template>

<script>
import variables from "@/services/variables_globales";
import router from "@/router";
import loadImage from "./../loaders/image"
export default {
    props: {
        grupos: {
            type: Array,
            default: () => [],
        },
        title: {
            Type: String,
            default: "",
        },
    },
    components:{
        loadImage
    },
    data() {
        return {
            ...variables,
            loads: [],
            colores:[
                    {color:'#D32F2F'},
                    {color:'#512DA8'},
                    {color:'#0288D1'},
                    {color:'#388E3C'},
                    {color:'#FBC02D'},
                    {color:'#E64A19'},
                    {color:'#5D4037'},
                    {color:'#455A64'},
                    {color:'#00796B'},
                    {color:'#7B1FA2'},
                ]
        };
    },
    watch: {
        grupos() {
        },
    },
    methods: {
        push(item) {
            window.localStorage.setItem("grupo", item.id);
            let nombre = item.nombre.toLowerCase();
            router.push({ name: "grupoDetalle", params: { text: nombre } });
        },
        check(key){
             this.loads[key] = true;
            console.log(this.loads)
        },
        preload(data, key) {
            return new Promise((done) => {
                try {
                    let load = (url) => {
                        let req = new XMLHttpRequest();
                        req.open("GET", url, true);
                        req.responseType = "blob";
                        req.onload = () => this.check(key);
                        req.onerror = () => this.check(key);
                        req.send();
                    };
                    load(data);
                } catch (error) {
                    console.log("error :", error);
                }
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.border {
    border-radius: 30px !important;
}
</style>
