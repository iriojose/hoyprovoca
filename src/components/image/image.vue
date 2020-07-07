<template>
            <div>
                 <v-img
                    contain
                    :width="$vuetify.breakpoint.smAndDown ? 100 : 200"
                    :height="$vuetify.breakpoint.smAndDown ? 80 : 180"
                    v-show="load"
                    :src="image + imagenViene"
                />         
                <v-progress-circular
                        indeterminate
                    v-show="!load"
                    size="40"
                    class="margen-movil"
                    color="#0f2441"
                >
                </v-progress-circular>
            </div>
             
</template>

<script>
import variables from "@/services/variables_globales";
import router from "@/router";

export default {
    props: {
        imagenViene: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            ...variables,
            load: false,
        };
    },
   async mounted(){
           await this.preload(this.image + this.imagenViene);
    },
    methods: {
         check(event){
            let img = new Image();
            img.src = event.target.responseURL;

           return this.load=true;
        },
        preload(data) {
            return new Promise((done) => {
                try {
                    let load = (url) => {
                        let req = new XMLHttpRequest();
                        req.open("GET", url, true);
                        req.responseType = "blob";
                        req.onload = async (event) => done( this.check(event));
                        req.onerror = (event) => done(this.check(event));
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
