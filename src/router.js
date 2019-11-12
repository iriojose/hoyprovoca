import Vue from "vue";
import Router from "vue-router";
import store from './store';


import Home from "./views/home/Home.vue";
import NotFound from './views/NotFound';

//auth routes components
import Login from './views/auth/Login.vue'
import Register from './views/auth/Register.vue'
import Cliente from './views/auth/Cliente'
import Empresa from './views/auth/Empresa'
 
//rutas del perfil de usuario
import Account from './views/account/Account'
import Profile from './views/account/Profile'
import CreditCard from './views/account/CreditCard'
import Notificaciones from './views/account/Notificaciones'
import Ayuda from './views/account/Ayuda'
import Historial from './views/account/Historial'

//ruta de busqueda
import Search from './views/search/Search'

//ruta de perfil de aliados
import Aliados from './views/aliados/Aliados'

Vue.use(Router);

const router = new Router({
  mode: 'history', 
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path:'/search',
      name:'search',
      component:Search
    },
    {
      path:'/login',
      name:'login',
      component:Login,
    },
    {
      path:'/register',
      name:'register',
      component:Register,

      beforeEnter:(to,from,next) => {
        try{
          let isLogged = store.state.user.loggedIn;
          if(isLogged){
            next({path:'/'});
          }else{
            next();
          }
        }catch(error){
          console.log(error);
        }
      },

      children:[
        {
          path:'cliente',
          name:'cliente',
          component:Cliente
        },
        {
          path:'empresa',
          name:'empresa',
          component:Empresa
        }
      ]
    },
    {
      path:'/account',
      name:'account',
      component:Account,

      children:[
        {
          path:'profile',
          name:'profile',
          component:Profile
        },
        {
          path:'credit-card',
          name:'credit',
          component:CreditCard
        },
        {
          path:'notificaciones',
          name:'notificaciones',
          component:Notificaciones
        },
        {
          path:'ayuda',
          name:'ayuda',
          component:Ayuda
        },
        {
          path:'historial',
          name:'historial',
          component:Historial
        }
      ]
    },
    { 
      path:'/aliados/:id',
      name:'aliados',
      component:Aliados
    },
    {
      path:'*',
      name:'notfount',
      component:NotFound
    }
  ],
});

router.beforeEach((to, from, next) => {
  let isLogged = store.state.user.loggedIn;

  if(isLogged && to.path == '/login'){
    router.push('/');
  }else if(isLogged && to.path== '/register/cliente'){
    router.push('/');
  }else{
    next();
  }
});

router.beforeResolve((to, from, next) => {
  let isLogged = store.state.user.loggedIn;

  if(isLogged && to.path == '/login'){
    router.push('/');
  }else if(isLogged && to.path== '/register/cliente'){
    router.push('/');
  }else{
    next();
  }
});

export default router;