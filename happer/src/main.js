import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'

// 引入axios
import axios from 'axios'
// 在框架中vue,为一个面型对象的程序
//相当于一个类，可以在其身上添加一些方法(添加在原型上)
Vue.prototype.axios = axios

// 全局过滤器
//参数1.setWh-方法名；2.回调（地址，我们自己指定的参数）
Vue.filter('setWh',(url,arg)=>{
  //通过替换的方式，将我们指定的参数替换掉"w.h"
  return url.replace(/w\.h/,arg)
})

// Scroll做为全局组件
import Scroller from '@/components/Scroller'
Vue.component('Scroller',Scroller)
Vue.config.productionTip = false

// Loading注册为全局组件
import Loading from '@/components/Loading'
Vue.component('Loading',Loading)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
