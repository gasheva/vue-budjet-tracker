import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    meta: {layout:"main", auth:true},
    component: ()=>import('../views/Home')
  },
  {
    path: "/login",
    name: "Login",
    meta: {layout:"empty"},   // для хранения каких-либо свойств 
    component: ()=>import('../views/Login')
  },
  {
    path: '/register',
    name: "Register",
    meta: {layout:"empty"},
    component: ()=>import('../views/Register')
  },
  {
    path: "/categories",
    name: "Categories",
    meta: {layout:"main", auth:true},
    component: ()=>import('../views/Categories')
  },
  {
    path: '/record',
    name: "Record",
    meta: {layout:"main", auth:true},
    component: ()=>import('../views/Record')
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {layout:"main", auth:true},
    component: ()=> import('../views/Profile')
  },
  {
    path: '/planning',
    name: 'Planning',
    meta: {layout:"main", auth:true},
    component: ()=> import('../views/Planning')
  },
  {
    path: '/history',
    name: 'History',
    meta: {layout:"main", auth:true},
    component: ()=> import('../views/History')
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    meta: {layout:"main", auth:true},
    component: ()=>import('../views/Detail')
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// защита рутов от неавторизированного входа
router.beforeEach((to, from, next)=>{
  const curUser = localStorage.getItem('id');
  const requireAuth = to.matched.some(record=>record.meta.auth);
  if(requireAuth && !curUser){
    next("/login?message=login");
  }else{
    next();
  }
});
export default router;
