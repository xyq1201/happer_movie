<template>
  <footer id="footer">
    <ul>
      <!-- 使用路由链接更换li标签，跳转指定页面，并设置tag属性-->
      <!-- to="路径" -->
      <!-- 具有tag属性的router-link会被渲染成相应的标签 -->
      <!-- router-link-active,表示router-link激活选中时的状态 -->
      <router-link to="/movie" tag="li">
        <i class="iconfont icon-dianying"></i>
        <p>电影</p>
      </router-link>
      <router-link to="/cinema" tag="li" >
        <i class="iconfont icon-yingyuan"></i>
        <p>影院</p>
      </router-link>
      <router-link to="/mine" tag="li" >
        <i class="iconfont icon-wode"></i>
        <p>我的</p>
      </router-link>
    </ul>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style scoped>
#footer{ width:100%; height:50px; background: white; border-top:2px #ebe8e3 solid; position: fixed; left: 0; bottom:0;}
#footer ul{ display: flex; text-align: center; height:50px; align-items:center;}
#footer ul li{ flex:1; height:40px;}
#footer ul li.active{ color: #f03d37;}
      /* <!-- router-link-active,表示router-link激活选中时的状态 --> */
#footer ul li.router-link-active{ color: #f03d37;}
#footer ul i{ font-size: 20px;}
#footer ul p{ font-size: 12px; line-height: 18px;}
</style>