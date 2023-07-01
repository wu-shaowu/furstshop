import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './router'

Vue.use(VueRouter);

//重写push方法避免多次push失败
let originPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => {}, () => {})
    }
}
let router = new VueRouter({
    routes,
    //滚动行为
    scrollBehavior() {
        // 滚动条置顶
        return {
            y: 0
        };
    }
})

router.beforeEach((to,from,next)=>{
   if(to.path == '/register'){
    next()
   }else{
    if(!localStorage.getItem('TOKEN') && to.path!=='/login'){
      next('/login')
    }else{
        if(localStorage.getItem('admin')=='true' && to.path=='/home'){
            next('/admin/AdminGood')
        }
        if(localStorage.getItem('admin')=='false' && to.path=='/admin'){
            next('/home')
        }
        next()
    }
   }
   
})
 export default router;
 