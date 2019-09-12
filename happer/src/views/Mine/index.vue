<template>
  <div id="main">
  <!-- 使用Header组件 -->
  <Header title="个人中心" />
  <!-- 使用Login组件 -->
  <Login />
  <!-- 使用Footer组件 -->
  <Footer />
  </div>
</template>

<script>
// 引入TabBar组件,Header组件
import Footer from "@/components/Footer";
import Header from "@/components/Header";
// 引入Login组件
import Login from "@/components/Login";
export default {
    name:'Mine',
    // 映射TabBar,Header,Login组件 
    components:{
      Header,
      Footer,
      Login
    }
}
</script>

<style>

</style>