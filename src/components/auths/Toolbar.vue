<template>
    <v-toolbar color="#232323" width="100%">
        <v-toolbar-items>
            <v-hover v-slot:default="{hover}">
                <v-btn class="white--text text-capitalize" elevation="0" to="/" text>
                    Inicio
                    <v-slide-y-transition>
                        <v-icon large color="#fff" v-show="hover">home</v-icon>
                    </v-slide-y-transition>
                </v-btn>
            </v-hover>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <v-toolbar-items>
            <v-hover v-slot:default="{hover}">
                <v-btn width="200" elevation="0" :to="path" text>
                    <span class="white--text text-capitalize">{{name}}</span>
                    <v-slide-x-transition>
                        <v-icon color="#fff" x-large v-show="hover">keyboard_arrow_right</v-icon>
                    </v-slide-x-transition>
                </v-btn>
            </v-hover>
        </v-toolbar-items>
    </v-toolbar>
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
    }
</script>