// 向外暴露Cinema路由
export default {
    // 访问路径
    path:"/mine",
    // 按需加载，映射到Cinema组件
    component:()=>import('@/views/Mine')
}