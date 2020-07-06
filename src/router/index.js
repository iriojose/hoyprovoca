import Vue from "vue";
import Router from "vue-router";
import store from '@/store';

import Home from "@/views/home/Home";

//errores
import Error404 from "@/views/mistakes/Error404";
import Error403 from "@/views/mistakes/Error403";

//sesiones
import Login from '@/views/auth/Login';
import Register from '@/views/auth/Register';
import Forgot from '@/views/auth/Forgot';
import Reset from '@/views/auth/Reset';
import Verify from '@/views/auth/Verify';

//vistas
import Search from '@/views/search/Search';
import GrupoDetalle from '@/views/grupos/GrupoDetalle';
import Grupos from '@/views/grupos/Grupos';
import AliadoDetalle from '@/views/aliados/AliadoDetalle';
import AliadoGrupo from '@/views/aliados/AliadoGrupo';
import Aliados from '@/views/aliados/Aliados';
import SubgrupoDetalle from '@/views/grupos/SubgrupoDetalle';

//perfil
import Account from '@/views/account/Account';
import Profile from '@/views/account/Profile';
import Ayuda from '@/views/account/Ayuda';
import Notificaciones from '@/views/account/Notificaciones';
import Ordenes from '@/views/account/Ordenes';

//checkout
import Checkout from '@/views/checkout/Checkout';

//terminos y condiciones
import TerminosCondiciones from '@/views/terminos/TerminosCondiciones';
import Privacidad from '@/views/terminos/Privacidad';
import ComoPagar from '@/views/terminos/ComoPagar';

import Pruebas from '@/views/pruebas/Pruebas';

Vue.use(Router);

const router = new Router({
    mode: "history",
    base:'/',
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
            meta:{
                auth:false
            }
        },
        {
            path: "/pruebas",
            name: "pruebas",
            component: Pruebas,
            meta:{
                auth:false
            }
        },
        {
            path: "/login",
            name:"login",
            component:Login,
            meta:{
                auth:false
            }
        },
        {
            path: "/resetpassword/:email/:token",
            name:"reset",
            component:Reset,
            meta:{
                auth:false
            }
        },
        {
            path: "/verify/:email/:token",
            name:"verify",
            component:Verify,
            meta:{
                auth:false
            }
        },
        {
            path: "/register",
            name:"register",
            component:Register,
            meta:{
                auth:false
            }
        },
        {
            path: "/forgot",
            name:"forgot",
            component:Forgot,
            meta:{
                auth:false
            }
        },
        {
            path: "/subgrupo/:text",
            name:"subgrupoDetalle",
            component:SubgrupoDetalle,
            meta:{
                auth:false
            }
        },
        {
            path: "/grupos",
            name:"grupos",
            component:Grupos,
            meta:{
                auth:false
            }
        },
        {
            path: "/grupo/:text",
            name:"grupoDetalle",
            component:GrupoDetalle,
            meta:{
                auth:false
            }
        },
        {
            path: "/aliados",
            name:"aliados",
            component:Aliados,
            meta:{
                auth:false
            },
        },
        {
            path: "/aliados/:text",
            name:"aliadoDetalle",
            component:AliadoDetalle,
            meta:{
                auth:false
            },
            children:[
                {
                    path:':text2',
                    name:"aliadoGrupo",
                    component:AliadoGrupo
                }
            ]
        },
        {
            path:'/search',
            name:'search',
            component:Search,
            meta:{
                auth:false
            },
        },
        {
            path:'/checkout',
            name:'checkout',
            component:Checkout,
            meta:{
                auth:true
            },
        },
        {
            path:'/account',
            name:'account',
            component:Account,
            meta:{
                auth:true
            },

            children:[
                {
                    path: "profile",
                    name: "profile",
                    component: Profile,
                    meta: {
                        auth: true
                    }
                },
                {
                    path: "ayuda",
                    name: "ayuda",
                    component: Ayuda,
                    meta: {
                        auth: true
                    }
                },
                {
                    path: "notificaciones",
                    name: "notificaciones",
                    component: Notificaciones,
                    meta: {
                        auth: true
                    }
                },
                {
                    path: "ordenes",
                    name: "ordenes",
                    component: Ordenes,
                    meta: {
                        auth: true
                    }
                }
            ]
        },
        {
            path: "/terminos-y-condiciones-de-pago-hoyprovoca",
            name: "comopagar",
            component: ComoPagar
        },
        {
            path: "/terminos-y-condiciones-hoyprovoca",
            name: "terminosycondiciones",
            component: TerminosCondiciones
        },
        {
            path: "/politicas-de-privacidad-hoyprovoca",
            name: "privacidad",
            component: Privacidad
        },
        {
            path: "*",
            name: "notfound",
            component: Error404
        },
        {
            path: "/notAuthorized",
            name:"notauthorized",
            component:Error403
        },
        {
            path: "/500",
            name:"serverdown",
            //components:Error500
        }
    ],

    linkActiveClass: 'router-link-active', 
    linkExactActiveClass: 'router-link-exact-active', 
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
    parseQuery: q => q,
    fallback: true,
});

router.beforeEach((to,from,next) => {
    let user = store.state.user.loggedIn;

    if(to.meta.auth){
        if(user){
            next();
        }else{
            next({name: 'notauthorized'});
        }
    }else{
        if(to.name == 'login' && user){
            next({name:'home'});
        }else if(to.name == 'login' && user){
            next({name:'home'});
        }else if(to.name == 'register' && user){
            next({name:'home'});
        }else if(to.name == 'reset' && user){
            next({name:'home'});
        }else if(to.name == 'forgot' && user){
            next({name:'home'});
        }else{
            next();
        }
    }
});
  
export default router;
