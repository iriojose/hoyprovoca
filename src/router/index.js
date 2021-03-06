import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'

Vue.use(VueRouter)

const routes = [
	//home
	{
        path: "/",
        name: "home",
        component: Home,
        meta:{
            auth:false
        }
	},
	//rutas auth
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
	//rutas groups
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
        path: "/subgrupo/:text",
        name:"subgrupoDetalle",
        component:() => import('@/views/grupos/SubgrupoDetalle'),
        meta:{
            auth:false
        }
	},
	//rutas empresas
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
	},
	//ruta mas vendidos
	{
		path:"/mostsold",
		name:"mostsold",
		component:() => import("@/views/mostsold/MostSold"),
		meta:{
			auth:false
		}
	},
	//ruta Ofertas
	{
		path:"/offers",
		name:"offers",
		component:() => import("@/views/offers/Offers"),
		meta:{
			auth:false
		}
	},
	//ruta search
	{
		path: "/search",
		name:"search",
		component:() => import('@/views/search/Search'),
		meta:{
			auth:false
		},
	},
	//rutas checkout
	{
		path: "/checkout",
		name:"checkout",
		component:() => import('@/views/checkout/Checkout'),
		meta:{
			auth:true
		},
	},
	//rutas account
	{
		path:'/account',
		name:'account',
		component:() => import('@/views/account/Account'),
		meta:{
			auth:true
		},
		//rutas child account
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
	//vistas informativas
	{
		path: "/trabajar",
		name: "trabajar",
		component: () => import("@/views/trabajaConNosotros/TrabajaConNosotros"),
		meta: {
		  auth: false,
		}
	},
	{
		path: "/terminos-y-condiciones-de-pago-hoyprovoca",
		name: "comopagar",
		component: () => import("@/views/terminos/ComoPagar"),
		meta: {
			auth: false,
		}
	},
	{
		path: "/terminos-y-condiciones-hoyprovoca",
		name: "terminosycondiciones",
		component: () => import("@/views/terminos/TerminosCondiciones"),
		meta: {
			auth: false,
		}
	},
	{
		path: "/politicas-de-privacidad-hoyprovoca",
		name: "privacidad",
		component: () => import("@/views/terminos/Privacidad"),
		meta: {
			auth: false,
		}
	},
	//rutas mistakes
	{
		path: "*",
		name: "notfound",
		component:() => import("@/views/mistakes/404"),
		meta: {
			auth: false,
		}
	},
	{
		path: "/notAuthorized",
		name:"notauthorized",
		component:() => import("@/views/mistakes/403"),
		meta: {
			auth: false,
		}
	},
]

const router = new VueRouter({
	mode: 'history',
	base: "/",
	routes,
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
	let user =  window.sessionStorage.getItem('token_client');//store.state.user.loggedIn;

	if(to.meta.auth){
		if(user !== null){
			next();
		}else{
			next({name: 'notauthorized'});
		}
	}else{
		if(to.name == 'login' && user !== null){
			next({name:'home'});
		}else if(to.name == 'login' && user !== null){
			next({name:'home'});
		}else if(to.name == 'register' && user !== null){
			next({name:'home'});
		}else if(to.name == 'reset' && user !== null){
			next({name:'home'});
		}else if(to.name == 'forgot' && user !== null){
			next({name:'home'});
		}else{
			next();
		}
	}
});
  
export default router;
