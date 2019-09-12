<template>
  <header id="header">
    <!-- 插槽，添加详情页返回小图标 -->
    <slot></slot>
    <h1>{{title}}</h1>
  </header>
</template>

<script>
export default {
  name: "Header",
  // 父子通信，声明接受属性title,该属性会成为子组件的属性
  props:{
    // 定义title
    title:{
      // 带有默认值的字符串
      type:String,
      default:"嗨片"
    }
  }
};
</script>

<style scoped>
#header{width:100%; height:50px; color: #fff; background: #e54847; border-bottom: 1px solid #e54847; position: relative;}
#header h1{ font-size: 18px; text-align: center; line-height: 50px; font-weight: normal; }
#header i{ position: absolute; left: 5px; top: 50%; margin-top: -13px; font-size: 26px;}
</style>