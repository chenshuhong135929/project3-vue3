import { createRouter ,createWebHistory } from "vue-router";
import store from '../store'

const  User=import("../views/User.vue")
const  Index=import("../views/index.vue")
const  Home=import("../views/Home.vue")
const  Login=import("../views/Login.vue")
const  Goods=import("../views/Goods/index.vue")
const  GoodsList=import("../views/Goods/GoodsList.vue")
const  GoodsCategory=import("../views/Goods/Category.vue")
const router=createRouter({
    history:createWebHistory(),
    routes:[

        {
          name:"Index",
          path:"/index",
          meta:{ isAuth:true, title:'系统',},
          component:Index,
          children:[
            {
              name:"Goods",
              path:"/goods",
              meta:{ title:'登录',},
              component:Goods,
              children:[
                  {
                      path:'list',
                      name:'list',
                      component:GoodsList
                  },
                  {
                    path:'category',
                    name:'category',
                    component:GoodsCategory
                },
                {
                  name:"Home",
                  path:"/home",
                  meta:{ isAuth:true, title:'主页',},
                  component:Home,
                  
                },
              ]
            },
          ]
        },

        {
          name:"User",
          path:"/user",
          meta:{ isAuth:true, title:'用户',},
          component:User
        },
        

        {
          name:'Login',
          path:"/",
          meta:{ title:'登录',},
          component:Login
        },
        {
          name:"Login",
          path:"/login",
          meta:{ title:'登录',},
          component:Login
        },
         
    ]
})

router.beforeEach((to,from,next)=>{
 
      if(to.meta.isAuth){
        let token =store.state.Authorization;
        console.log('前缀路由守卫获取token',token);
        if (token === 'null' || token === '') {
            next('/login');
        } else {
           next();
        }
    }else{
      next()
    }
  
  })

  router.afterEach((to,from)=>{ console.log('后缀路由守卫',to,from); document.title=to.meta.title || '操作系统'

})
   
export default router