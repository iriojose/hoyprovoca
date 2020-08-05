<template>
    <v-app-bar 
        app color="#EBDED1" dark 
        :elevation="$vuetify.breakpoint.smAndDown ? 0:null" 
        :elevate-on-scroll="$vuetify.breakpoint.smAndDown ? false:true"
        :extended="$vuetify.breakpoint.smAndDown && $route.name !== 'home' ? true:false"
    >
        <v-app-bar-nav-icon  color="#000" class="mr-1" @click="change" v-if="dialog==false" />

        <v-btn fab v-else  @click="change" icon depressed class="mr-1">
            <v-icon color="#000">
                mdi-close
            </v-icon>
        </v-btn>

        <v-spacer v-if="$vuetify.breakpoint.smAndDown"></v-spacer>

		<div class="d-flex align-center">
			<v-img
	            alt="Hoyprovoca logo" class="shrink mr-2 cursor" contain
				src="@/assets/logo2.png" transition="scale-transition"
			    width="200" height="100" @click="push2"
			/>
		</div>

        <v-text-field
            label="¿Que te provoca?..." hide-details
            dense v-on:keyup.enter="push" light
            class="ml-10 hidden-sm-and-down" single-line
            solo
        >
            <v-btn slot="append" tile text small @click="push">
                <v-icon color="#D32F2F">mdi-magnify</v-icon>
            </v-btn>
        </v-text-field>

        <v-spacer></v-spacer>

        <div v-if="!user.loggedIn" class="hidden-sm-and-down">
            <v-btn text to="/login" class="mx-1 black--text font-weight-bold text-capitalize">
                Iniciar sesión
            </v-btn>
                
            <v-hover v-slot:default="{hover}">
                <v-btn :elevation="hover ? 10:0" color="#fff" height="30" to="/register" class="mx-1 font-weight-bold black--text text-capitalize">
                    Registrate
                </v-btn>
            </v-hover>
        </div>

		<Notificaciones />
        <Carrito /> 
        <Perfil />
        <MovilOpciones />

        <v-text-field 
            v-if="$vuetify.breakpoint.smAndDown"
            class="mx-5 search" slot="extension"
            label="¿Que te provoca?..." hide-details
            dense v-on:keyup.enter="push" light
            solo single-line
        >
            <v-btn slot="append" tile @click="push" text small>
                <v-icon color="#D32F2F">mdi-magnify</v-icon>
            </v-btn>
        </v-text-field>

        <BarraLateral />
    </v-app-bar>
</template>

<script>
import router from '@/router';
import {mapState, mapActions} from 'vuex';

    export default {
        components:{
            BarraLateral:() => import("@/components/navbar/BarraLateral"),
            Carrito:() => import("./Carrito"),
            Perfil:() => import("./Perfil"),
            MovilOpciones:() => import("./MovilOpciones"),
            Notificaciones:() => import("./Notificaciones")
        },
        data() {
            return {
                dialog:false,
            }
        },
        computed:{
            ...mapState(['user','search','bandera','drawer']),

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
    }
</script>

<style lang="scss">
    .cursor{
        cursor:pointer;
    }
    .v-toolbar__content, .v-toolbar__extension{
        z-index:unset!important;
    }
</style>