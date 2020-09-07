<template>
    <v-app-bar 
        v-if="theme"
        app :color="theme.navBar.strong" dark 
        :elevation="$vuetify.breakpoint.smAndDown ? 0:null" 
        :elevate-on-scroll="$vuetify.breakpoint.smAndDown ? false:true"
        :extended="$vuetify.breakpoint.smAndDown && $route.name !== 'home' ? true:false"
    >
        <v-app-bar-nav-icon :color="theme.navBar.font" class="mr-1" @click="change" v-if="drawer==false" />

        <v-btn fab v-else @click="change" icon depressed class="mr-1">
            <v-icon :color="theme.navBar.font">
                mdi-close
            </v-icon>
        </v-btn>

        <v-spacer v-if="$vuetify.breakpoint.smAndDown"></v-spacer>

		<div class="d-flex align-center" v-if="!$vuetify.breakpoint.smAndDown ">
			<v-img v-if="!theme.navBar.navIconDark"
	            alt="Hoyprovoca logo" class="shrink mr-2 cursor" contain
				src='@/assets/logo2.png' transition="scale-transition"
			    width="200" height="100" @click="push2"
			/>
            <v-img v-else
	            alt="Hoyprovoca logo" class="shrink mr-2 cursor" contain
				src='@/assets/logo6.png' transition="scale-transition"
			    width="200" height="100" @click="push2"
			/>
		</div>
        <v-img v-if="$vuetify.breakpoint.smAndDown"
	        alt="Hoyprovoca logo" class="shrink mr-2 cursor" contain
			src='@/assets/2.png' transition="scale-transition"
			width="50" height="50" @click="push2"
		/>

        <v-text-field
            label="¿Qué te provoca?" hide-details
            dense v-on:keyup.enter="push" light
            class="ml-10 hidden-sm-and-down" single-line
            solo v-model="busquedas"
        >
            <v-btn slot="append" tile text small @click="push">
                <v-icon color="#D32F2F">mdi-magnify</v-icon>
            </v-btn>
        </v-text-field>

        <v-spacer></v-spacer>

        <div v-if="!user.loggedIn" class="hidden-sm-and-down">
            <v-btn text to="/login" :style="`color:${theme.navBar.font}!important`" class="mx-1 black--text font-weight-bold text-capitalize">
                Iniciar sesión
            </v-btn>
                
            <v-hover v-slot:default="{hover}">
                <v-btn :elevation="hover ? 10:0" :style="`color:${theme.navBar.font2}`" :color="theme.navBar.secondary" height="30" to="/register" class="mx-1 font-weight-bold text-capitalize">
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
           :style="`color:${theme.navBar.font}!important`"
            label="¿Qué te provoca?" hide-details
            dense v-on:keyup.enter="push" light
            solo single-line v-model="busquedas"
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
            ...mapState(['user','search','bandera','drawer','theme']),

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