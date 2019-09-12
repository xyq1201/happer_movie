// 定义一个状态
const state = {
    // 初始化状态名字(初始化状态)
    // 或使用本地状态
    nm : window.localStorage.getItem('nowNm') || '北京',
    id : window.localStorage.getItem('nowId') || 1
}
const actions = {

}

// 在mutations下，写方法修改状态(注意名字大写-表其为状态管理的方法)
const mutations = {
    CITY_INFO(state,payload){
        //载荷（Payload）
        // 大多数情况下，载荷应该是一个对象，
        //这样可以包含多个字段并且记录的 mutation 会更易读
        state.nm = payload.nm
        state.id = payload.id
    }
}
//提供对外接口
export default {
    // 定义名字，区分具体为哪个状态管理下的数据
    //通过添加 namespaced: true 的方式使其成为带命名空间的模块
    //当模块被注册后，它的所有 getter、action 及 mutation 
    //都会自动根据模块注册的路径调整命名
    namespaced : true,
    //挂载state
    state,
    actions,
    mutations
}