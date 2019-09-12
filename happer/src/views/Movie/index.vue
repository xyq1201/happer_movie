<template>
  <div id="main">
    <!-- 使用Header组件 -->
    <Header title="嗨片电影" />
    <!-- 组件导航 -->
    <div id="content">
      <div class="movie_menu">
        <!-- 导航路由链接 -->
        <router-link to="/movie/city" tag="div" class="city_name">
        <!-- 状态管理城市 -->
        <!-- city.nm表city状态管理下的nm -->
          <span>{{$store.state.city.nm}}</span>
          <!-- <span>北京</span> -->
          <i class="iconfont icon-lower-triangle"></i>
        </router-link>
        <div class="hot_swtich">
          <router-link to="/movie/nowPlaying" tag="div" class="hot_item">正在热映</router-link>
          <router-link to="/movie/coming" tag="div" class="hot_item">即将上映</router-link>
        </div>
        <router-link to="/movie/search" tag="div" class="search_entry">
          <i class="iconfont icon-sousuo"></i>
        </router-link>
      </div>
      <!-- 界面渲染，切换显示二级路由组件界面 -->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <!-- 使用Footer组件 -->
    <Footer />
    <!-- 详情页 -->
    <router-view name="detail"></router-view>
  </div>
</template>

<script>
// 引入TabBar组件,Header组件
import Footer from "@/components/Footer";
import Header from "@/components/Header";
// 引入弹窗组件(注意引入方式)
import { messageBox } from '@/components/JS'
export default {
  name: "Movie",
  // 映射TabBar,Header,CinemaList组件
  components: {
    Header,
    Footer
  },
  mounted(){
    setTimeout(()=>{
      //获取城市定位后，出现弹窗
      this.axios.get('/api/getLocation').then((res)=>{
      var msg = res.data.msg
      if(msg === 'ok'){
        var nm = res.data.data.nm
        var id = res.data.data.id
        console.log(nm)
        // 判断城市id是否与当前城市id一致
        //注意，this.$store.state.city.id获取的是状态管理内的id,在本地存储内为字符串形式
        if(this.$store.state.city.id == id){
          return
        }

        //数据加载后调用
        //调用弹窗，参数赋值，定义想要的内容（当前城市）
        messageBox({
          title : "定位",
          content:nm,
          cancel:"取消",
          ok: "切换定位",
          handleToOk(){
            // 更改状态管理或更改本地存储，并渲染页面
            window.localStorage.setItem('nowNm',nm)
            window.localStorage.setItem('nowId',id)
            //使用location.reload实现页面刷新
            window.location.reload()
          }
        })
      }
    })
    },1500)
  }
};
</script>

<style scoped>
#content .movie_menu {
  width: 100%;
  height: 45px;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  z-index: 10;
}
.movie_menu .city_name {
  margin-left: 20px;
  height: 100%;
  line-height: 45px;
}
.movie_menu .city_name.active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .city_name.router-link-active{
    color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .hot_swtich {
  display: flex;
  height: 100%;
  line-height: 45px;
}
.movie_menu .hot_item {
  font-size: 15px;
  color: #666;
  width: 80px;
  text-align: center;
  margin: 0 12px;
  font-weight: 700;
}
.movie_menu .hot_item.active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
/* 设置切换样式 */
.movie_menu .hot_item.router-link-active{
    color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .search_entry {
  margin-right: 20px;
  height: 100%;
  line-height: 45px;
}
.movie_menu .search_entry.active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .search_entry.router-link-active{
    color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .search_entry i {
  font-size: 24px;
  color: red;
}
</style>