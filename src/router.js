import Vue from "vue";
import Router from "vue-router";
import store from "./store";

import Home from "./views/home/Home.vue";
import NotFound from "./views/NotFound";

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
import Tipos from "./views/aliados/Tipos";

//rutas de adminitrador
import Admin from './views/admin/Admin'
import Dashboard from './views/admin/Dashboard'
import Usuarios from './views/admin/Usuarios'
import Notificaciones2 from './views/admin/Notificaciones'
import Aliados2 from './views/admin/Aliados'
import Ventas from './views/admin/Ventas'

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/pruebas",
      name: "pruebas",
      component: Pruebas
    },
    {
      path: "/search",
      name: "search",
      component: Search
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
        auth: false
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

      children: [
        {
          path: "profile",
          name: "profile",
          component: Profile
        },
        {
          path: "metodo-de-pago",
          name: "metodos",
          component: MetodoDePago
        },
        {
          path: "notificaciones",
          name: "notificaciones",
          component: Notificaciones
        },
        {
          path: "ayuda",
          name: "ayuda",
          component: Ayuda
        },
        {
          path: "historial",
          name: "historial",
          component: Historial
        }
      ]
    },
    {
      path: "/aliados",
      name: "aliados",
      component: Aliados,

      children:[
        {
          path:"tipo/:text",
          name:"tipo",
          component:Tipos
        },
        {
          path:":local",
          name:"local",
          component:AliadoEspecifico,

          children:[
            {
              path:":categoria",
              name:"nivel1",
              component:AliadoEspecifico,

              children:[
                {
                  path:":especifica",
                  name:"nivel2",
                  component:AliadoEspecifico,
                }
              ]
            },
          ]
        }

      ]
    },
    {
      path: "*",
      name: "notfount",
      component: NotFound
    },
    {
      path:'/admin',
      name:'admin',
      component:Admin , 

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

  base: '/', // The base URL of the app
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

/*router.beforeEach((to, from, next) => {
  const user = store.state.user.loggedIn;
  
  if(
    to.path == '/login' || 
    to.path == '/register' || 
    to.path == '/register/cliente' ||
    to.path == '/register/empresa'
    && user
  ){
    next({name:'home'});
  }else{
    next();
  }

  if(
    to.path == '/account' ||
    to.path == '/account/profile' ||
    to.path == '/account/credit-card' ||
    to.path == '/account/notificaciones' ||
    to.path == '/account/ayuda' ||
    to.path == '/account/historial' 
    && user == false
  ){
    next({name:'home'});
  }else{
    next();
  }


});*/

export default router;
