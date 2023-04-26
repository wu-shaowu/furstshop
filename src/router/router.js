//路由配置信息

export default [
    {
        path: '/home',
        component:()=>import ('../page/Home/Home.vue'),
        meta:{
            name:"张三",
            show:false,
        }
        
    },
    {
        path:"/admin",
        component:()=>import('../page/Admin/Admin.vue'),
        children:[
            {path:"/admin/AdminGood",
             component:()=>import('../page/AdminGood/AdminGood.vue')},
             {path:"/admin/AdminTrade",
             component:()=>import('../page/AdminTrade/AdminTrade.vue')}
        ]
    },
    {
        path:"/login",
        component:()=>import ('../page/Login/Login.vue'),

    },
    {
        path:'/register',
        component:()=>import ('../page/Register/Register.vue'),
    },
    {
        path:'/search/:keyword?',
        component:()=>import ('../page/Search/Search.vue'),
        name:'search'
    },
    {
        path:'/detail/:skuid?',
        component:()=>import ('../page/Detail/Detail.vue'),
        name:'detail'
    },
    {
        path:'/showcars',
        component:()=>import ('../page/ShowCars/ShowCars.vue'),
    },
    {
        path:'/recharge',
        component:()=>import ('../page/Recharge/Recharge.vue'),
    },
    {
        path:'/order',
        component:()=>import ('../page/Order/Order.vue'),
    },
    {
        path:'/trade/:trade_Id?',
        component:()=>import ('../page/Trade/Trade.vue'),
        name:'trade',

    },
    {
        path:'/pay/:trade_Id?',
        component:()=>import ('../page/pay/pay.vue'),
                name:'pay'
    },
    

    //重定向
    {
        path: '*',
        redirect: '/home'
    }
]