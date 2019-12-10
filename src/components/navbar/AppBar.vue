<template>
    <div>
        <BarraLateral />

        <v-app-bar :elevation="$vuetify.breakpoint.smAndDown ? 0:5" app height="65">

            <v-app-bar-nav-icon 
                @click="change()" 
                v-if="drawer==false"
            />
            <v-btn fab v-else  @click="change()" icon depressed>
                <v-icon>
                    close
                </v-icon>
            </v-btn>
               
            <v-toolbar-title :class="$vuetify.breakpoint.smAndDown ? null:'mx-8'">
                <v-btn text to="/" v-if="!$vuetify.breakpoint.smAndDown">
                    <v-img width="120" height="120" src="@/assets/log.png" contain></v-img>
                </v-btn>
                <v-btn to="/" disabled elevation="0" text v-else>
                    <v-img width="40" height="40" src="@/assets/log2.png" contain></v-img>
                </v-btn>
            </v-toolbar-title>

            <v-text-field
                v-model="busquedas"
                label="Buscar producto..."
                prepend-inner-icon="search"
                clearable
                hide-details
                dense 
                outlined
                v-on:keyup.enter="search"
                class="hidden-sm-and-down mx-8"
                background-color="#f7f7f7"
                color="#005598"
                single-line
            />

            <v-spacer/>
            <v-divider vertical class="hidden-sm-and-down"></v-divider>

            <ItemsOnline />
            <Perfil />

             <v-toolbar-items v-if="!user.loggedIn">
                <v-btn text to="/login" >
                    Iniciar sesión
                </v-btn>
            </v-toolbar-items>

            <v-progress-linear
                :active="loading"
                :indeterminate="loading"
                absolute
                bottom
            ></v-progress-linear>
        </v-app-bar>

        <v-toolbar width="100%" class="px-5 fix" v-if="$vuetify.breakpoint.smAndDown">

            <v-text-field
                v-model="busquedas"
                label="Buscar producto..."
                prepend-inner-icon="search"
                clearable
                hide-details
                dense 
                outlined
                v-on:keyup.enter="search"
                background-color="#f7f7f7"
                color="#005598"
                single-line
            />
        </v-toolbar>
    </div>
</template>

<script>
import router from '@/router';
import ItemsOnline from './ItemsOnline';
import Perfil from './Perfil';
import {mapState,mapActions,mapGetters} from  'vuex';
import BarraLateral from './BarraLateral';

    export default {
        components:{
            BarraLateral,
            ItemsOnline,
            Perfil
        },
        data(){
            return {
                busquedas:'',
                loading:false
            }
        },
        computed: {
            ...mapState(['drawer']),
            ...mapGetters({
                user: "user"
            }),
        },
        methods: {
            ...mapActions(['setDrawer']),

            search() {
                this.loading=true;
                setTimeout(() => {
                    this.loading=false;
                    router.push("/search");
                },2000);
            },
            change(){
                if(this.drawer==true){
                    this.setDrawer(false);
                }else{
                    this.setDrawer(true);
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .color{
        color:#005598;
    }
    .fix{
        position:fixed;
        z-index:3;
        top: 65px;
        
    }
    .margen{
        margin-top:65px;
    }
</style>