<template>
    <v-app-bar color="#232323" app height="50">
        <v-hover v-slot:default="{hover}">
            <v-btn class="white--text text-capitalize" elevation="0" to="/" text>
                Inicio
                <v-slide-y-transition>
                    <v-icon large color="#fff" v-show="hover">mdi-home</v-icon>
                </v-slide-y-transition>
            </v-btn>
        </v-hover>
       
        <v-spacer></v-spacer>

        <v-hover v-slot:default="{hover}">
            <v-btn width="200" elevation="0" :to="path" text>
                <span class="white--text text-capitalize">{{name}}</span>
                <v-slide-x-transition>
                    <v-icon color="#fff" x-large v-show="hover">mdi-chevron-right</v-icon>
                </v-slide-x-transition>
            </v-btn>
        </v-hover>
    </v-app-bar>
</template>

<script>
    export default {
        data(){
            return {
                name:'',
                path:''
            }
        },
        mounted() {
            if(this.$route.name == "login"){
                this.name = "Registrate";
                this.path ="/register";
            }else{
                this.name = "Login";
                this.path ="/login";
            }
        },
        watch: {
            '$route'(val){
                if(val.name == "login"){
                    this.name = "Registrate";
                    this.path ="/register";
                }else{
                    this.name = "Login";
                    this.path ="/login";
                }
            }
        },
    }
</script>