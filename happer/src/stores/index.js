import Vue from 'vue'
import Vuex from 'vuex'
// 引入City子状态管理
import city from './city'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  //添加modules
  modules:{
    // 注册City(key:value)
    //(city:city)
    city,
  }
})
