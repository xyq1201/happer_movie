<template>
  <!-- 需要配置为全局组件 -->
  <!-- 用一个div包裹分发过来的数据 -->
  <div class="wrapper" ref="wrapper">
    <!-- 利用插槽，接收分发的内容 -->
    <slot></slot>
  </div>
</template>

<script>
//引入better-scroll
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  //实现正在加载和加载成功，需要父子通信
  //页面加载和加载成功状态， 在每个页面的回调是不同的
  //因此在这里写为通用的，做父子通信
  props: {
    //自定义函数
    handleToScroll: {
      //类型：函数
      type: Function,
      //默认值，在不写（即不用）的时候，是个空函数
      default: function() {}
    },
    handleToTouchEnd: {
      type: Function,
      default: function() {}
    }
  },
  mounted() {
    //   new
    var scroll = new BScroll(this.$refs.wrapper, {
      // 配置better-scroll
      tap: true, //让tap事件在better-scroll中生效
      probeType: 1
      //当为1的时候，会派发scroll事件，会截流（一段时间只触发一次，快速滑动不会触发）
    });

    //由于目前scroll为局部的对象，将其添加为一个属性
    this.scroll = scroll;
    scroll.on("scroll", pos => {
      // 将方法回调出去
      this.handleToScroll(pos);
    });
    scroll.on("touchEnd", pos => {
      this.handleToTouchEnd(pos);
    });
  },
  methods: {
    ////使用better-scroll提供的方法-scrollTo(),跳到指定位置
    toScrollTop(y){ 
      //参数：X和Y
      this.scroll.scrollTo(0, y);
    }
  }
};
</script>

<style scoped>
.wrapper {
  /* //让其与父容器高度相同 ，*/
  height: 100%;
}
</style>