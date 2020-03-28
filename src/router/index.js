import Vue from "vue";
import Router from "vue-router";
import store from '@/store';

import Home from "@/views/home/Home";

import Error404 from "@/views/mistakes/Error404";
import Error403 from "@/views/mistakes/Error403";

import Login from '@/views/auth/Login';
import Register from '@/views/auth/Register';
import Forgot from '@/views/auth/Forgot';
import ResetPassword from '@/views/auth/ResetPassword';

import Search from '@/views/search/Search';
import GrupoDetalle from '@/views/grupos/GrupoDetalle';
import AliadoDetalle from '@/views/aliados/AliadoDetalle';
import AliadoGrupo from '@/views/aliados/AliadoGrupo';

Vue.use(Router);

const router = new Router({
    mode: "history",
    base:'/',
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
            menta:{
                auth:false
            }
        },
        {
            path: "/login",
            name:"login",
            component:Login,
            menta:{
                auth:false
            }
        },
        {
            path: "/register",
            name:"register",
            component:Register,
            menta:{
                auth:false
            }
        },
        {
            path: "/forgot",
            name:"forgot",
            component:Forgot,
            menta:{
                auth:false
            }
        },
        {
            path: "/reset",
            name:"resetPassword",
            component:ResetPassword,
            menta:{
                auth:false
            }
        },
        {
            path: "/grupo/:text/:id",
            name:"grupoDetalle",
            component:GrupoDetalle,
            menta:{
                auth:false
            }
        },
        {
            path: "/aliados/:text",
            name:"aliadoDetalle",
            component:AliadoDetalle,
            menta:{
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
            component:Search
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
        }else if(to.name == 'resetPassword' && user){
            next({name:'home'});
        }else if(to.name == 'forgot' && user){
            next({name:'home'});
        }else{
            next();
        }
    }
});
  
/*router.beforeEach((to, from, next) => {
  let user=store.state.user.loggedIn;

    if (to.meta.auth){
        if(user){
            if(to.meta.mediador){
                next({name: 'notfound'});
            }else{
                next();
            }   
        } else {
            if(to.meta.mediador){
                next({name: 'notfound'});
            }else{
                next({name: 'noautorizado403'});
            }
        }
    }else{
        if(to.meta.mediador){
            next({name: 'notfound'});
        }else{
            if(to.name == 'login' && user){
                next({name:'home'});
            }else if(to.name == 'cliente' && user){
                next({name:'home'});
            }else if(to.name == 'empresa' && user){
                next({name:'home'});
            }else if(to.name == 'forgot' && user){
                next({name:'home'});
            }else{
                next();
            }
        }
    }
});*/

export default router;
