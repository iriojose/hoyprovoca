import Vue from "vue";
import Router from "vue-router";
import store from "./store";

import Home from "./views/home/Home.vue";
import NotFound from "./views/NotFound";
import s500 from './views/s500';

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

//noautorizado 403
import NotAutorized from "./views/NotAutorized";

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
      path: "/checkout",
      name: "checkout",
      component: Checkout,
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
      path:"/noAutorizado",
      name:"403",
      component:NotAutorized
    },
    {
      path: "/s500",
      name: "errorservidor",
      component: s500
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
  //cada ruta tiene un meta que lo etiqueta
  //si es true es por que requiere estar logueado para entrar a esa ruta
  //si no envia a una vista 403 no autorizado
  //si es false si la ruta sigue normalmente por que no requiere estar logueado

/*router.beforeEach((to, from, next) => {
  let user=store.state.user.loggedIn;
  console.log(store.state.user.loggedIn);

  if (to.meta.auth){
    if (user){
      if(to.meta.mediador){
        next({name:'notfount'});
      }else{
        next();
      }
    } else {
      next({name: '403'});
    }
  }else{
    next();
  }
});*/

export default router;
