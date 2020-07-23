import Vue from "vue";
import Router from "vue-router";
import store from '@/store';

import Home from "@/views/home/Home";

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
            path: "/login",
            name:"login",
            component:() => import('@/views/auth/Login'),
            meta:{
                auth:false
            }
        },
        {
            path: "/resetpassword/:email/:token",
            name:"reset",
            component:() => import('@/views/auth/Reset'),
            meta:{
                auth:false
            }
        },
        {
            path: "/verify/:email/:token",
            name:"verify",
            component:() => import('@/views/auth/Verify'),
            meta:{
                auth:false
            }
        },
        {
            path: "/register",
            name:"register",
            component:() => import('@/views/auth/Register'),
            meta:{
                auth:false
            }
        },
        {
            path: "/forgot",
            name:"forgot",
            component:() => import('@/views/auth/Forgot'),
            meta:{
                auth:false
            }
        },
        {
            path: "/subgrupo/:text",
            name:"subgrupoDetalle",
            component:() => import('@/views/grupos/SubgrupoDetalle'),
            meta:{
                auth:false
            }
        },
        {
            path: "/grupos",
            name:"grupos",
            component:() => import('@/views/grupos/Grupos'),
            meta:{
                auth:false
            }
        },
        {
            path: "/grupo/:text",
            name:"grupoDetalle",
            component:() => import('@/views/grupos/GrupoDetalle'),
            meta:{
                auth:false
            }
        },
        {
            path: "/aliados",
            name:"aliados",
            component:() => import('@/views/aliados/Aliados'),
            meta:{
                auth:false
            },
        },
        {
            path: "/aliados/:text",
            name:"aliadoDetalle",
            component:() => import('@/views/aliados/AliadoDetalle'),
            meta:{
                auth:false
            },
            children:[
                {
                    path:':text2',
                    name:"aliadoGrupo",
                    component:() => import('@/views/aliados/AliadoGrupo'),
                }
            ]
        },
        {
            path:'/search',
            name:'search',
            component:() => import('@/views/search/Search'),
            meta:{
                auth:false
            },
        },
        {
            path:'/checkout',
            name:'checkout',
            component:() => import('@/views/checkout/Checkout'),
            meta:{
                auth:true
            },
        },
        {
            path:'/account',
            name:'account',
            component:() => import('@/views/account/Account'),
            meta:{
                auth:true
            },

            children:[
                {
                    path: "profile",
                    name: "profile",
                    component:() => import('@/views/account/Profile'),
                    meta: {
                        auth: true
                    }
                },
                {
                    path: "ayuda",
                    name: "ayuda",
                    component:() => import('@/views/account/Ayuda'),
                    meta: {
                        auth: true
                    }
                },
                {
                    path: "notificaciones",
                    name: "notificaciones",
                    component: () => import('@/views/account/Notificaciones'),
                    meta: {
                        auth: true
                    }
                },
                {
                    path: "ordenes",
                    name: "ordenes",
                    component:() => import('@/views/account/Ordenes'),
                    meta: {
                        auth: true
                    }
                }
            ]
        },
        {
            path: "/terminos-y-condiciones-de-pago-hoyprovoca",
            name: "comopagar",
            component:() => import('@/views/terminos/ComoPagar') 
        },
        {
            path: "/terminos-y-condiciones-hoyprovoca",
            name: "terminosycondiciones",
            component:() => import('@/views/terminos/TerminosCondiciones') 
        },
        {
            path: "/politicas-de-privacidad-hoyprovoca",
            name: "privacidad",
            component: () => import('@/views/terminos/Privacidad')
        },
        {
            path: "*",
            name: "notfound",
            component:() => import("@/views/mistakes/Error404"),
        },
        {
            path: "/notAuthorized",
            name:"notauthorized",
            component:() => import("@/views/mistakes/Error403"),
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
