<template>
  <div id="main">
    <!-- 使用Header组件 -->
    <Header title="嗨片影院" />
    <!-- 导航 -->
    <div id="content">
      <div class="cinema_menu">
        <div class="city_switch">
          全城
          <i class="iconfont icon-lower-triangle"></i>
        </div>
        <div class="brand_swtich">
          品牌
          <i class="iconfont icon-lower-triangle"></i>
        </div>
        <div class="feature_switch">
          特色
          <i class="iconfont icon-lower-triangle"></i>
        </div>
      </div>
      <!-- 使用CinemaList组件 -->
      <CinemaList />
    </div>

    <!-- 使用Footer组件 -->
    <Footer />
  </div>
</template>

<script>
// 引入TabBar组件,Header组件
import Footer from "@/components/Footer";
import Header from "@/components/Header";
// 引入CinemaList组件
import CinemaList from "@/components/CinemaList";
export default {
  name: "Cinema",
  // 映射TabBar,Header,CinemaList组件
  components: {
    Header,
    Footer,
    CinemaList
  }
};
</script>

<style scoped>
#content .cinema_menu{ width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; display: flex; justify-content:space-around; align-items:center; background:white;}

</style>