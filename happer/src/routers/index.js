import Vue from 'vue'
import Router from 'vue-router'

//在主路由中引入movie组件路由,cinema组件路由，mine组件路由

Vue.use(Router)
import Movie from './movie'
import Cinema from './cinema'
import Mine from './mine'

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // 配置Movie组件路由,movie组件路由,cinema组件路由，mine组件路由
    Movie,
    Cinema,
    Mine,
    // 初始加载，使页面重新定向在Movie页面
    {
      path:'/',
      redirect:'/movie'      
    }
  ]
})
