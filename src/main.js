import Vue from 'vue'
import App from './App.vue'
//饿了么
import { Button,Input,MessageBox,RadioButton,RadioGroup,Pagination,Select,Table} from 'element-ui';
//自定义颜色
import '../public/element-#FF4400/index.css'
//ElementUI注册组件的时候，还有一种写法，挂在原型上
import '../public/iconfont'
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.use(Button)
Vue.use(Input)
Vue.use(RadioButton)
Vue.use(RadioGroup)
Vue.use(Pagination)
Vue.use(Select)
Vue.use(Table)

import VueLazyload from 'vue-lazyload'
const loadimage = require('./assets/images/lazy.jpg')
const errorimage = require('./assets/images/icons.png')

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: errorimage,
  loading: loadimage,
  attempt: 1
})

// Vue.use(Radio)
// 轮播图
import 'swiper/css/swiper.css'



Vue.config.productionTip = false

import router from './router';
import store from './store/index';
Vue.use(router);
Vue.use(store);
new Vue({
  render: h => h(App),
	beforeCreate() {
		Vue.prototype.$bus = this //安装全局事件总线
	},
  router,
  store,
}).$mount('#app')
