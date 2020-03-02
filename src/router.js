//dependencias
import Vue from "vue";
import Router from "vue-router";
import store from "./store";

//ruta home
import Home from "./views/home/Home.vue";

//rutas de errores
import NotFound from "./views/NotFound";
import s500 from './views/s500';
import NotAutorized from "./views/NotAutorized";

//auth routes components
import Login from "./views/auth/Login.vue";
import Register from "./views/auth/Register.vue";
import Cliente from "./views/auth/Cliente";
import Empresa from "./views/auth/Empresa";

//pruebas
import Pruebas from './views/pruebas/Pruebas';

//rutas del perfil de usuario
import Account from "./views/account/Account";
import Profile from "./views/account/Profile";
import MetodoDePago from "./views/account/MetodoDePago";
import Notificaciones from "./views/account/Notificaciones";
import Ayuda from "./views/account/Ayuda";
import Historial from "./views/account/Historial";

//ruta de busqueda
import Search from "./views/search/Search";

//ruta de perfil de aliados
import Aliados from "./views/aliados/Aliados";
import AliadoEspecifico from "./views/aliados/AliadoEspecifico";

//rutas de adminitrador
import Admin from './views/admin/Admin';
import Dashboard from './views/admin/Dashboard';
import Usuarios from './views/admin/Usuarios';
import Notificaciones2 from './views/admin/Notificaciones';
import Aliados2 from './views/admin/Aliados';
import Ventas from './views/admin/Ventas';

//ruta checkout de pedidos
import Checkout from './views/pedidos/Checkout';

//ruta detallada del producto
import DetalleProducto from './views/productos/DetalleProducto';

//ruta de grupos y subgrupos 
import Grupos from './views/grupos/Grupos';

Vue.use(Router);

const router = new Router({
    mode: "history",
    base:'/aftim',
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
            meta: {
                auth: false
            }
        },
        {
            path: "/pruebas",
            name: "pruebas",
            component: Pruebas,
            meta: {
                auth: false
            }
        },
        {
            path: "/grupos/:text/:id",
            name: "grupos",
            component: Grupos,
            meta: {
                auth: false
            }
        },
        {
            path: "/checkout",
            name: "checkout",
            component:Checkout,
            meta: {
                auth: true
            }
        },
        {
            path: "/producto/:id",
            name: "detalleproducto",
            component: DetalleProducto,
            meta: {
                auth: false
            }
        },
        {
            path: "/search",
            name: "search",
            component: Search,
            meta: {
                auth: false
            }
        },
        {
            path: "/login",
            name: "login",
            component: Login,
            meta: {
                auth: false
            }
        },
        {
            path: "/register",
            name: "register",
            component: Register,
            meta: {
                auth: false,
                mediador:true
            },

            children: [
                {
                    path: "cliente",
                    name: "cliente",
                    component: Cliente
                },
                {
                    path: "empresa",
                    name: "empresa",
                    component: Empresa
                }
            ]
        },
        {
            path: "/account",
            name: "account",
            component: Account,
            meta: {
                auth: true,
                mediador:true
            },

            children: [
                {
                    path: "profile",
                    name: "profile",
                    component: Profile,
                    meta: {
                        auth: true
                    },
                },
                {
                    path: "metodo-de-pago",
                    name: "metodos",
                    component: MetodoDePago,
                    meta: {
                        auth: true
                    },
                },
                {
                    path: "notificaciones",
                    name: "notificaciones",
                    component: Notificaciones,
                    meta: {
                        auth: true
                    },
                },
                {
                    path: "ayuda",
                    name: "ayuda",
                    component: Ayuda,
                    meta: {
                        auth: true
                    },
                },
                {
                    path: "historial",
                    name: "historial",
                    component: Historial,
                    meta: {
                        auth: true
                    },
                }
            ]
        },
        {
            path: "/aliados",
            name: "aliados",
            component: Aliados,
            meta: {
                auth: false
            },

            children:[
                {
                    path:":text/:id",
                    name:"local",
                    component:AliadoEspecifico,
                }

            ]
        },
        {
            path:"/noAutorizado",
            name:"noautorizado403",
            component:NotAutorized
        },
        {
            path: "/s500",
            name: "errorservidor",
            component: s500
        },
        {
            path: "*",
            name: "notfound",
            component: NotFound
        },
        {
            path:'/admin',
            name:'admin',
            component:Admin , 
            meta: {
                auth: true,
                mediador:true
            },

            children:[
                {
                    path:'dashboard',
                    name:'Dashboard',
                    component:Dashboard
                },
                {
                    path:'usuarios',
                    name:'Usuarios',
                    component:Usuarios,
                },
                {
                    path:'aliados',
                    name:'Aliados',
                    component:Aliados2
                },
                {
                    path:'notificaciones',
                    name:'Notificaciones',
                    component:Notificaciones2
                },
                {
                    path:'ventas',
                    name:'Ventas',
                    component:Ventas
                }
            ]
        }
    ],

    linkActiveClass: 'router-link-active', // <router-link> default active class
    linkExactActiveClass: 'router-link-exact-active', // <router-link> default active class for exact matches
    scrollBehavior (to, from, savedPosition) {
        // native-like behavior when navigating with back/forward buttons
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
    parseQuery: q => q, // custom query string parse
    fallback: true,
});

//proteccion de rutas
  //cada ruta tiene un meta auth que indica si require estar autenticado
  //algunas rutas tiene un meta mediador que indica a una ruta que no devulve nada solo tiene un (router view)
  //se revisa si esta autenticado el usuario y luego si es un mediador
  
router.beforeEach((to, from, next) => {
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
            }else if(to.name == 'empresa'&& user){
                next({name:'home'});
            }else{
                next();
            }
        }
    }
});

export default router;
