//路由配置信息

import Home from '../page/Home/Home.vue' ;
import Login from '../page/Login/Login.vue';
import Register from '../page/Register/Register.vue';
import Search from '../page/Search/Search.vue';
import Detail from '../page/Detail/Detail.vue';
import ShowCars from '@/page/ShowCars/ShowCars';
import Trade from '../page/Trade/Trade.vue';
import Recharge from  '../page/Recharge/Recharge.vue';
import Order from '../page/Order/Order.vue'
import Pay from '../page/pay/pay.vue'
export default [
    {
        path: '/home',
        component:Home,
    },
    {
        path:"/login",
        component:Login,

    },
    {
        path:'/register',
        component:Register,
    },
    {
        path:'/search/:keyword?',
        component:Search,
        name:'search'
    },
    {
        path:'/detail/:skuid?',
        component:Detail,
        name:'detail'
    },
    {
        path:'/showcars',
        component:ShowCars,
    },
    {
        path:'/recharge',
        component:Recharge,
    },
    {
        path:'/order',
        component:Order,
    },
    {
        path:'/trade/:trade_Id?',
        component:Trade,
        name:'trade',

    },
    {
        path:'/pay/:trade_Id?',
                component:Pay,
                name:'pay'
    },
    

    //重定向
    {
        path: '*',
        redirect: '/home'
    }
]